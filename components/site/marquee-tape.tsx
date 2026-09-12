import { marqueeItems } from "@/lib/home-content";
import { cn } from "@/lib/utils";

export function MarqueeTape({
  variant = "rouge",
}: {
  variant?: "rouge" | "rose";
}) {
  const isRose = variant === "rose";
  const sequence = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div
      className={cn(
        "w-full overflow-hidden py-5",
        isRose
          ? "border-y border-brand/30 bg-bg-pink-muted"
          : "bg-brand-primary",
      )}
    >
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <p
            key={copy}
            className="flex items-center px-4 type-tag"
          >
            {sequence.map((item, index) => (
              <span key={`${copy}-${item}-${index}`} className="flex items-center">
                <span
                  className={isRose ? "px-4 text-brand/50" : "px-4 text-text-on-dark"}
                >
                  {item}
                </span>
                <span className="px-4 text-brand-secondary">✦</span>
              </span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
}
