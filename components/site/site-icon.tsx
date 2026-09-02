import { cn } from "@/lib/utils";

export function SiteIcon({
  src,
  alt = "",
  size,
  width,
  height,
  className,
}: {
  src: string;
  alt?: string;
  size?: number;
  width?: number;
  height?: number;
  className?: string;
}) {
  const w = width ?? size ?? 20;
  const h = height ?? size ?? 20;

  return (
    <span
      className={cn("relative inline-block shrink-0 overflow-clip", className)}
      style={{ width: w, height: h }}
    >
      <img src={src} alt={alt} width={w} height={h} className="size-full" />
    </span>
  );
}
