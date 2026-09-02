import { ContentForm } from "@/components/admin/content-form";
import { listContentEntries } from "@/lib/data/content";

const GROUPS = [
  {
    title: "Coordonnées du site",
    description: "Nom affiché, e-mail et réseaux, repris dans le pied de page.",
    prefix: "site.",
  },
  {
    title: "Page d'accueil",
    description: "Titres et textes d'introduction de chaque section.",
    prefix: "home.",
  },
  {
    title: "Page contact",
    description:
      "Texte d'introduction du formulaire et message affiché après envoi.",
    prefix: "contact.",
  },
  {
    title: "Pied de page",
    description: "Accroche affichée en bas de chaque page.",
    prefix: "footer.",
  },
] as const;

export default async function AdminContentPage() {
  const entries = await listContentEntries();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Contenus</h1>
        <p className="text-sm text-muted-foreground">
          Chaque texte s&apos;enregistre séparément et apparaît immédiatement sur
          le site.
        </p>
      </div>

      {GROUPS.map((group) => {
        const groupEntries = entries.filter((entry) =>
          entry.key.startsWith(group.prefix),
        );

        if (groupEntries.length === 0) {
          return null;
        }

        return (
          <section key={group.prefix} className="rounded-md border p-6">
            <h2 className="text-base font-medium">{group.title}</h2>
            <p className="text-sm text-muted-foreground">
              {group.description}
            </p>
            <div className="mt-4">
              {groupEntries.map((entry) => (
                <ContentForm key={entry.key} entry={entry} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
