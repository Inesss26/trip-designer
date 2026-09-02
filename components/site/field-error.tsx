import type { FieldErrors } from "@/lib/validation/schemas";

export function FieldError({
  errors,
  name,
}: {
  errors: FieldErrors;
  name: string;
}) {
  const messages = errors[name];

  if (!messages || messages.length === 0) {
    return null;
  }

  return (
    <p id={`${name}-error`} className="text-sm text-destructive">
      {messages.join(" ")}
    </p>
  );
}
