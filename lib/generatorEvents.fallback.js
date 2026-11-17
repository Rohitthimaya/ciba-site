/**
 * TRU Generator events shown on the calendar when the CMS has none — edit this list to update it.
 *
 *   date         "YYYY-MM-DD"
 *   time         start time, "HH:MM" on the 24-hour clock, Kamloops time. Leave it out until the
 *                time is confirmed: the event then shows on its day without a time.
 *   hours        length in hours (default 1.5); only used together with `time`
 *   description  optional
 *   location     optional
 *   registerUrl  optional sign-up link; adds a "Register" button to the event in the day view
 */
const SCHEDULE = [
  { id: "workshop-1", title: "Workshop #1", tag: "Workshop", date: "2026-10-21" },
  { id: "workshop-2", title: "Workshop #2", tag: "Workshop", date: "2026-10-28" },
  { id: "workshop-3", title: "Workshop #3", tag: "Workshop", date: "2026-11-04" },
  {
    id: "workshop-4",
    title: "Know the Numbers",
    tag: "Workshop",
    date: "2026-11-18",
    time: "17:30",
    hours: 1,
    description:
      "Pricing, costs and whether an idea can work — workshop 4 of the Fall Business Essentials Series, with John Zubak, CIBA's Lead Mentor and Entrepreneur-in-Residence. Estimate your costs and compare pricing options, calculate how many sales you need to break even, and use AI to explore changes in costs, price or sales. Free pizza after the workshop! Open to all TRU students, faculty and staff. No business idea or finance or AI experience needed.",
    location: "HL 269, HOL, Thompson Rivers University",
    registerUrl: "https://forms.cloud.microsoft/r/Bx1SJYnJ6P",
  },
  { id: "workshop-5", title: "Workshop #5", tag: "Workshop", date: "2026-11-25" },
  { id: "workshop-6", title: "Workshop #6", tag: "Workshop", date: "2026-12-02" },
];

/** UTC offset in Kamloops on the given day: "-07:00" in summer, "-08:00" in winter. */
function kamloopsOffset(date) {
  const zone = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Vancouver",
    timeZoneName: "longOffset",
  })
    .formatToParts(new Date(`${date}T12:00:00Z`))
    .find((part) => part.type === "timeZoneName").value; // e.g. "GMT-08:00"
  return zone.slice(3) || "+00:00";
}

export const GENERATOR_EVENTS = SCHEDULE.map(({ date, time, hours = 1.5, ...event }) => {
  const offset = kamloopsOffset(date);
  if (!time) {
    // No confirmed time: the event covers its whole day
    return {
      ...event,
      allDay: true,
      start: new Date(`${date}T00:00:00${offset}`).toISOString(),
      end: new Date(`${date}T23:59:59${offset}`).toISOString(),
    };
  }
  const start = new Date(`${date}T${time}:00${offset}`);
  return {
    ...event,
    start: start.toISOString(),
    end: new Date(start.getTime() + hours * 3600 * 1000).toISOString(),
  };
});

const KAMLOOPS_CLOCK = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Vancouver",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/**
 * The date and time in Kamloops at the given instant, as a Date whose own fields (getDate(),
 * getHours(), ...) hold it. The events happen on campus, so the calendar runs on Kamloops time
 * for every visitor — and the server and the browser lay it out identically.
 */
export function kamloopsTime(instant = new Date()) {
  const at = {};
  for (const { type, value } of KAMLOOPS_CLOCK.formatToParts(new Date(instant))) {
    at[type] = Number(value);
  }
  return new Date(at.year, at.month - 1, at.day, at.hour, at.minute);
}

/** When an event starts and ends on the Kamloops clock (see kamloopsTime). */
export function eventStart(event) {
  return kamloopsTime(event.start);
}

export function eventEnd(event) {
  return kamloopsTime(event.end);
}

export function getUpcomingEvents(limit = 8, from = new Date()) {
  return GENERATOR_EVENTS.filter((e) => new Date(e.end) >= from)
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, limit);
}

export function eventsOnDay(day, events = GENERATOR_EVENTS) {
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  return events.filter((e) => {
    const s = eventStart(e);
    return s.getFullYear() === y && s.getMonth() === m && s.getDate() === d;
  });
}

export function eventsInRange(start, end, events = GENERATOR_EVENTS) {
  const a = start.getTime();
  const b = end.getTime();
  return events
    .filter((e) => {
      const s = eventStart(e).getTime();
      return s >= a && s <= b;
    })
    .sort((x, y) => eventStart(x) - eventStart(y));
}
