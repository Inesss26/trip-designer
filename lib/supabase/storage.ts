import { DataError } from "@/lib/data/utils";
import { storageBucket } from "@/lib/env";
import { getWriteClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/validation/schemas";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
] as const;

/**
 * Envoie une image dans le bucket public `media` et renvoie son URL.
 *
 * L'upload nécessite Supabase : en mode démo, coller une URL d'image dans le
 * champ correspondant reste possible.
 */
export async function uploadMedia(file: File): Promise<string> {
  const client = getWriteClient();

  if (!client) {
    throw new DataError(
      "L'envoi d'images nécessite Supabase. En mode démo, collez directement l'URL d'une image.",
    );
  }

  if (!ALLOWED_TYPES.includes(file.type as (typeof ALLOWED_TYPES)[number])) {
    throw new DataError("Formats acceptés : JPEG, PNG, WebP ou AVIF.");
  }

  if (file.size > MAX_BYTES) {
    throw new DataError("L'image ne doit pas dépasser 8 Mo.");
  }

  const extension = file.name.includes(".")
    ? file.name.split(".").pop()!.toLowerCase()
    : "jpg";
  const baseName = slugify(file.name.replace(/\.[^.]+$/, "")) || "image";
  const path = `trips/${Date.now()}-${baseName}.${extension}`;

  const { error } = await client.storage
    .from(storageBucket)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) {
    throw new DataError(`Envoi de l'image impossible : ${error.message}`);
  }

  const { data } = client.storage.from(storageBucket).getPublicUrl(path);
  return data.publicUrl;
}
