import Image from "next/image";

import { cn } from "@/lib/utils";

type TripCoverProps = {
  src: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Visuel de voyage avec repli lisible quand aucune photo n'est renseignée.
 */
export function TripCover({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
}: TripCoverProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-muted",
        className ?? "aspect-[3/2]",
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center px-4 text-center text-sm text-muted-foreground">
          Photo à venir
        </span>
      )}
    </div>
  );
}
