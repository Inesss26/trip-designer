import { Badge } from "@/components/ui/badge";
import type {
  LeadStatus,
  PublicationStatus,
  ReviewStatus,
} from "@/lib/validation/schemas";

const PUBLICATION_LABELS: Record<PublicationStatus, string> = {
  draft: "Brouillon",
  published: "Publié",
};

const REVIEW_LABELS: Record<ReviewStatus, string> = {
  pending: "À valider",
  published: "Publié",
};

export const LEAD_LABELS: Record<LeadStatus, string> = {
  new: "Nouvelle",
  in_progress: "En cours",
  answered: "Répondue",
  archived: "Archivée",
};

export function PublicationBadge({ status }: { status: PublicationStatus }) {
  return (
    <Badge variant={status === "published" ? "default" : "secondary"}>
      {PUBLICATION_LABELS[status]}
    </Badge>
  );
}

export function ReviewBadge({ status }: { status: ReviewStatus }) {
  return (
    <Badge variant={status === "published" ? "default" : "secondary"}>
      {REVIEW_LABELS[status]}
    </Badge>
  );
}

export function LeadBadge({ status }: { status: LeadStatus }) {
  const variant =
    status === "new" ? "default" : status === "archived" ? "outline" : "secondary";

  return <Badge variant={variant}>{LEAD_LABELS[status]}</Badge>;
}
