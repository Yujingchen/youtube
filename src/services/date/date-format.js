export function getPublishedAtDateString(iso8601DateString) {
  if (!iso8601DateString) {
    return "";
  }
  const date = new Date(Date.parse(iso8601DateString));
  return date.toDateString();
}
