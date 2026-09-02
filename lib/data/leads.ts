import { demoId, demoStore, demoTimestamp } from "@/lib/data/demo-store";
import type { Lead } from "@/lib/data/types";
import {
  adminReadClient,
  DataError,
  isSchemaMissingError,
  requireWriteClient,
  toNumber,
  writeErrorMessage,
} from "@/lib/data/utils";
import { getReadClient } from "@/lib/supabase/client";
import type {
  LeadInput,
  LeadStatus,
  LeadUpdateInput,
} from "@/lib/validation/schemas";

type LeadRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  destination: string | null;
  travel_period: string | null;
  party_size: number | null;
  budget_range: string | null;
  message: string;
  status: LeadStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

const COLUMNS =
  "id, name, email, phone, destination, travel_period, party_size, budget_range, message, status, admin_notes, created_at, updated_at";

function mapLead(row: LeadRow): Lead {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    destination: row.destination,
    travelPeriod: row.travel_period,
    partySize: toNumber(row.party_size),
    budgetRange: row.budget_range,
    message: row.message,
    status: row.status,
    adminNotes: row.admin_notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Enregistre une demande envoyée depuis le formulaire public.
 *
 * Utilise la clé `anon` : la politique RLS `leads_public_insert` autorise
 * l'insertion sans jamais permettre la relecture côté navigateur.
 */
export async function createLead(input: LeadInput): Promise<void> {
  const client = getReadClient();

  const storeInMemory = () => {
    const timestamp = demoTimestamp();
    demoStore().leads.unshift({
      id: demoId(),
      ...input,
      status: "new",
      adminNotes: null,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  };

  if (!client) {
    storeInMemory();
    return;
  }

  const { error } = await client.from("leads").insert({
    name: input.name,
    email: input.email,
    phone: input.phone,
    destination: input.destination,
    travel_period: input.travelPeriod,
    party_size: input.partySize,
    budget_range: input.budgetRange,
    message: input.message,
  });

  if (error) {
    // Tant que la migration n'est pas appliquée, la demande est conservée en
    // mémoire plutôt que perdue : elle reste visible dans l'administration.
    if (isSchemaMissingError(error)) {
      storeInMemory();
      return;
    }

    throw new DataError(
      `Votre demande n'a pas pu être enregistrée : ${error.message}`,
    );
  }
}

function demoLeadsByDate(): Lead[] {
  return [...demoStore().leads].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}

export async function listLeads(): Promise<Lead[]> {
  const client = adminReadClient();

  if (!client) {
    return demoLeadsByDate();
  }

  const { data, error } = await client
    .from("leads")
    .select(COLUMNS)
    .order("created_at", { ascending: false });

  if (error) {
    if (isSchemaMissingError(error)) {
      return demoLeadsByDate();
    }

    throw new DataError(`Lecture des demandes impossible : ${error.message}`);
  }

  return (data as LeadRow[]).map(mapLead);
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const client = adminReadClient();
  const fromDemo = () =>
    demoStore().leads.find((lead) => lead.id === id) ?? null;

  if (!client) {
    return fromDemo();
  }

  const { data, error } = await client
    .from("leads")
    .select(COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    if (isSchemaMissingError(error)) {
      return fromDemo();
    }

    throw new DataError(`Lecture de la demande impossible : ${error.message}`);
  }

  return data ? mapLead(data as LeadRow) : null;
}

export async function updateLead(
  id: string,
  input: LeadUpdateInput,
): Promise<void> {
  const client = requireWriteClient();

  if (!client) {
    const store = demoStore();
    const index = store.leads.findIndex((lead) => lead.id === id);

    if (index === -1) {
      throw new DataError("Cette demande n'existe plus.");
    }

    store.leads[index] = {
      ...store.leads[index],
      status: input.status,
      adminNotes: input.adminNotes,
      updatedAt: demoTimestamp(),
    };
    return;
  }

  const { error } = await client
    .from("leads")
    .update({ status: input.status, admin_notes: input.adminNotes })
    .eq("id", id);

  if (error) {
    throw new DataError(writeErrorMessage(error, "Mise à jour impossible"));
  }
}

export async function deleteLead(id: string): Promise<void> {
  const client = requireWriteClient();

  if (!client) {
    const store = demoStore();
    store.leads = store.leads.filter((lead) => lead.id !== id);
    return;
  }

  const { error } = await client.from("leads").delete().eq("id", id);

  if (error) {
    throw new DataError(writeErrorMessage(error, "Suppression impossible"));
  }
}
