import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import type { SiteContentMap } from "@/lib/data/types";

export function SiteShell({
  children,
  content,
}: {
  children: React.ReactNode;
  content: SiteContentMap;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-bg-main font-body text-text-brand">
      <SiteHeader />
      <div className="flex min-h-0 flex-1 flex-col overflow-x-clip">
        {children}
        <SiteFooter content={content} />
      </div>
    </div>
  );
}
