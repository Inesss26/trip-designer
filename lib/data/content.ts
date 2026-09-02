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

/**
 * Liste des blocs éditables.
 *
 * Le catalogue des clés, de leurs libellés et de leur type est porté par le
 * code (`demoContent`) : la base ne stocke que les valeurs. L'administration
 * reste donc utilisable même si le seed SQL n'a pas été appliqué, et l'ajout
 * d'un nouveau bloc ne demande pas de migration.
 */
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

  const stored = new Map(
    (data as ContentRow[]).map((row) => [row.key, mapEntry(row)]),
  );

  const entries = demoContent.map((fallback) => {
    const row = stored.get(fallback.key);
    stored.delete(fallback.key);

    return row ? { ...fallback, ...row, label: fallback.label } : fallback;
  });

  // Clés présentes en base mais absentes du catalogue : on les garde visibles
  // plutôt que de les rendre inéditables.
  return [...entries, ...stored.values()].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );
}

/**
 * Contenus sous forme de dictionnaire `clé -> texte`, tel que consommé par les
 * pages publiques. Un texte vidé volontairement depuis l'administration reste
 * vide : c'est la valeur enregistrée qui fait foi, pas le texte par défaut.
 */
export async function getContentMap(): Promise<SiteContentMap> {
  const entries = await listContentEntries();
  const map: SiteContentMap = {};

  for (const entry of entries) {
    map[entry.key] = entry.value;
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

  const definition = demoContent.find((entry) => entry.key === key);

  if (!definition) {
    throw new DataError("Ce contenu n'existe pas.");
  }

  // Upsert plutôt qu'update : la ligne peut ne pas exister si le seed n'a pas
  // été appliqué ou si le bloc a été ajouté après la mise en place de la base.
  const { error } = await client.from("site_content").upsert(
    {
      key,
      label: definition.label,
      kind: definition.kind,
      sort_order: definition.sortOrder,
      value,
    },
    { onConflict: "key" },
  );

  if (error) {
    throw new DataError(`Enregistrement impossible : ${error.message}`);
  }
}
