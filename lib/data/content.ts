import { demoContent } from "@/lib/data/demo";
import { demoStore, demoTimestamp } from "@/lib/data/demo-store";
import type { SiteContentEntry, SiteContentMap } from "@/lib/data/types";
import { DataError, requireWriteClient } from "@/lib/data/utils";
import { getReadClient } from "@/lib/supabase/client";
import type { ContentKind } from "@/lib/validation/schemas";

type ContentRow = {
  key: string;
  label: string;
  kind: ContentKind;
  value: string;
  sort_order: number;
  updated_at: string;
};

const COLUMNS = "key, label, kind, value, sort_order, updated_at";

function mapEntry(row: ContentRow): SiteContentEntry {
  return {
    key: row.key,
    label: row.label,
    kind: row.kind,
    value: row.value,
    sortOrder: row.sort_order,
    updatedAt: row.updated_at,
  };
}

export async function listContentEntries(): Promise<SiteContentEntry[]> {
  const client = getReadClient();

  if (!client) {
    return [...demoStore().content].sort((a, b) => a.sortOrder - b.sortOrder);
  }

  const { data, error } = await client
    .from("site_content")
    .select(COLUMNS)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new DataError(`Lecture des contenus impossible : ${error.message}`);
  }

  return (data as ContentRow[]).map(mapEntry);
}

/**
 * Contenus sous forme de dictionnaire, avec repli sur les valeurs de
 * démonstration : une clé absente en base n'efface jamais un texte à l'écran.
 */
export async function getContentMap(): Promise<SiteContentMap> {
  const entries = await listContentEntries();
  const map: SiteContentMap = {};

  for (const entry of demoContent) {
    map[entry.key] = entry.value;
  }

  for (const entry of entries) {
    if (entry.value.trim().length > 0) {
      map[entry.key] = entry.value;
    }
  }

  return map;
}

export async function updateContentValue(
  key: string,
  value: string,
): Promise<void> {
  const client = requireWriteClient();

  if (!client) {
    const store = demoStore();
    const index = store.content.findIndex((entry) => entry.key === key);

    if (index === -1) {
      throw new DataError("Ce contenu n'existe pas.");
    }

    store.content[index] = {
      ...store.content[index],
      value,
      updatedAt: demoTimestamp(),
    };
    return;
  }

  const { error } = await client
    .from("site_content")
    .update({ value })
    .eq("key", key);

  if (error) {
    throw new DataError(`Enregistrement impossible : ${error.message}`);
  }
}
