/** Event helpers — pass events from CMS or fallback. */
export {
  GENERATOR_EVENTS,
  getUpcomingEvents as getUpcomingEventsFallback,
  eventsOnDay,
  eventsInRange,
} from "@/lib/generatorEvents.fallback";

export function getUpcomingEvents(events, limit = 8, from = new Date()) {
  return (events || [])
    .filter((e) => new Date(e.end) >= from)
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, limit);
}
