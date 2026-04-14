/** WAT (Lagos) — retirement celebration */
export const EVENT_START_ISO = "2026-05-30T12:00:00+01:00";
export const EVENT_END_ISO = "2026-05-30T17:30:00+01:00";

export function getEventStartDate(): Date {
  return new Date(EVENT_START_ISO);
}

export function formatEventDateLine(): string {
  return getEventStartDate().toLocaleDateString("en-GB", {
    timeZone: "Africa/Lagos",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatEventTimeLine(): string {
  return getEventStartDate().toLocaleTimeString("en-GB", {
    timeZone: "Africa/Lagos",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatGoogleCalendarUtc(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  const h = String(d.getUTCHours()).padStart(2, "0");
  const min = String(d.getUTCMinutes()).padStart(2, "0");
  const s = String(d.getUTCSeconds()).padStart(2, "0");
  return `${y}${m}${day}T${h}${min}${s}Z`;
}

/** Google Calendar `dates` query value (UTC). */
export function googleCalendarDateRangeParam(): string {
  return `${formatGoogleCalendarUtc(new Date(EVENT_START_ISO))}/${formatGoogleCalendarUtc(new Date(EVENT_END_ISO))}`;
}
