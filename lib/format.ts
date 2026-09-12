const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function formatCurrency(value: number, formatter: Intl.NumberFormat): string {
  // Node and browsers disagree on the space before € (nbsp vs nnbsp vs space).
  return formatter.format(value).replace(/[\u00a0\u202f]/g, " ");
}

export function formatPrice(value: number | null): string | null {
  return value === null ? null : formatCurrency(value, priceFormatter);
}

export function formatDate(value: string | null): string | null {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : dateFormatter.format(date);
}

export function formatDateTime(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : dateTimeFormatter.format(date);
}

export function formatDuration(days: number | null): string | null {
  if (days === null) {
    return null;
  }

  return days === 1 ? "1 jour" : `${days} jours`;
}
