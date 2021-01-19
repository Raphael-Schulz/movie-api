export function formatDate(date: Date): string {
  let parsedDate = new Date(date);
  return parsedDate.toLocaleDateString();
}

export function parseDateForInput(date: Date): string {
  return date.toString().substring(0, 10);
}
