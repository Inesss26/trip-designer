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

  return (
    <span
      className={cn("relative inline-block shrink-0 overflow-visible", className)}
      style={{ width: w, height: h }}
    >
      <img
        src={src}
        alt={alt}
        width={w}
        height={h}
        className={cn(hoverSrc && "group-hover:opacity-0")}
      />
      {hoverSrc ? (
        <img
          src={hoverSrc}
          alt=""
          width={w}
          height={h}
          className="absolute inset-0 size-full opacity-0 group-hover:opacity-100"
        />
      ) : null}
    </span>
  );
}
