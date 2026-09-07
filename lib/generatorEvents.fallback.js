/** TRU Generator events — edit this list to update the calendar. */

function at(daysFromToday, hour = 12, minute = 0) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + daysFromToday);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

function endOf(startIso, hours = 1.5) {
  const d = new Date(startIso);
  d.setMinutes(d.getMinutes() + hours * 60);
  return d.toISOString();
}

const raw = [
  {
    id: "startup-coffee",
    title: "Startup Coffee",
    description: "Casual drop-in for student founders — share ideas over coffee.",
    location: "TRU Generator, Brown Family House of Learning",
    days: 2,
    hour: 10,
    duration: 1,
    tag: "Meetup",
  },
  {
    id: "lean-workshop",
    title: "Lean Startup Workshop",
    description: "Learn Lean Startup principles and map your first experiments.",
    location: "TRU Generator",
    days: 5,
    hour: 13,
    duration: 2,
    tag: "Workshop",
  },
  {
    id: "mentor-hours",
    title: "Open Mentorship Hours",
    description: "Book time with a business mentor to pressure-test your idea.",
    location: "TRU Generator",
    days: 9,
    hour: 14,
    duration: 2,
    tag: "Mentorship",
  },
  {
    id: "pitch-practice",
    title: "Pitch Practice Night",
    description: "Practice your pitch and get feedback from peers and mentors.",
    location: "TRU Generator",
    days: 14,
    hour: 17,
    duration: 2,
    tag: "Workshop",
  },
  {
    id: "speaker-series",
    title: "Founder Speaker Series",
    description: "Hear from a local founder on building in the Interior.",
    location: "Brown Family House of Learning",
    days: 21,
    hour: 18,
    duration: 1.5,
    tag: "Speaker",
  },
  {
    id: "bmc-lab",
    title: "Business Model Canvas Lab",
    description: "Hands-on session to fill out and refine your canvas.",
    location: "TRU Generator",
    days: 28,
    hour: 12,
    duration: 2,
    tag: "Workshop",
  },
  {
    id: "alumni-mixer",
    title: "Alumni Founder Mixer",
    description: "Connect with TRU alumni who have launched ventures.",
    location: "TRU Generator",
    days: 35,
    hour: 17,
    duration: 2,
    tag: "Meetup",
  },
  {
    id: "grant-info",
    title: "Grant & Funding Info Session",
    description: "Overview of grants and seed support pathways for students.",
    location: "Online + Generator",
    days: 42,
    hour: 11,
    duration: 1,
    tag: "Info",
  },
  {
    id: "ideation-sprint",
    title: "Ideation Sprint",
    description: "Half-day sprint to turn rough ideas into next steps.",
    location: "TRU Generator",
    days: 56,
    hour: 9,
    duration: 4,
    tag: "Workshop",
  },
  {
    id: "year-end-showcase",
    title: "Generator Showcase",
    description: "Celebrate student ventures and wrap the term.",
    location: "Brown Family House of Learning",
    days: 80,
    hour: 16,
    duration: 2.5,
    tag: "Showcase",
  },
];

export const GENERATOR_EVENTS = raw.map((e) => {
  const start = at(e.days, e.hour);
  return {
    id: e.id,
    title: e.title,
    description: e.description,
    location: e.location,
    tag: e.tag,
    start,
    end: endOf(start, e.duration),
  };
});

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
    const s = new Date(e.start);
    return s.getFullYear() === y && s.getMonth() === m && s.getDate() === d;
  });
}

export function eventsInRange(start, end, events = GENERATOR_EVENTS) {
  const a = start.getTime();
  const b = end.getTime();
  return events
    .filter((e) => {
      const s = new Date(e.start).getTime();
      return s >= a && s <= b;
    })
    .sort((x, y) => new Date(x.start) - new Date(y.start));
}
