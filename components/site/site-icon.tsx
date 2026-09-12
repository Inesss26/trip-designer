import { cn } from "@/lib/utils";

export function SiteIcon({
  src,
  hoverSrc,
  alt = "",
  size,
  width,
  height,
  className,
}: {
  src: string;
  hoverSrc?: string;
  alt?: string;
  size?: number;
  width?: number;
  height?: number;
  className?: string;
}) {
  const w = width ?? size ?? 20;
  const h = height ?? size ?? 20;
  const attrW = Math.round(w);
  const attrH = Math.round(h);

  return (
    <span
      className={cn("relative inline-block shrink-0 overflow-visible", className)}
      style={{ width: w, height: h }}
    >
      <img
        src={src}
        alt={alt}
        width={attrW}
        height={attrH}
        className={cn("size-full", hoverSrc && "group-hover:opacity-0")}
      />
      {hoverSrc ? (
        <img
          src={hoverSrc}
          alt=""
          width={attrW}
          height={attrH}
          className="absolute inset-0 size-full opacity-0 group-hover:opacity-100"
        />
      ) : null}
    </span>
  );
}
