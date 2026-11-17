"use client";

import { useEffect, useMemo, useState } from "react";
import {
  eventEnd,
  eventStart,
  eventsInRange,
  eventsOnDay,
  getUpcomingEvents,
  kamloopsTime,
} from "@/lib/generatorEvents";
import TruIcon from "@/components/tru/TruIcon";
import { GENERATOR_CONTACT_FORM } from "@/components/tru/truLinks";

/*
 * Events calendar for the TRU Generator page (month / week / day / year views plus an
 * "upcoming" sidebar). It renders inside the TRU page shell, so it is styled by the
 * "Events calendar" section of app/tru-generator/tru.css and uses TRU's button classes.
 *
 * Events are { id, title, tag, start, end, description?, location?, registerUrl?, allDay? }.
 * An `allDay` event has no confirmed time: it is listed on its day without one. Days and times
 * are always Kamloops time, whatever the visitor's time zone.
 */

const VIEWS = [
  { id: "month", label: "Month" },
  { id: "week", label: "Week" },
  { id: "day", label: "Day" },
  { id: "year", label: "Year" },
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function addDays(d, n) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function startOfWeek(d) {
  const x = startOfDay(d);
  x.setDate(x.getDate() - x.getDay());
  return x;
}

/* Times and dates are written out by hand rather than with toLocale...(): the server and the
   browser can disagree on the locale's wording ("5:30 PM" vs "5:30 p.m."), which breaks hydration. */
function formatTime(date) {
  const hour = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hour % 12 || 12}:${minutes} ${hour < 12 ? "a.m." : "p.m."}`;
}

function formatShortDate(date) {
  return `${MONTHS[date.getMonth()].slice(0, 3)} ${date.getDate()}`;
}

function formatRangeLabel(view, cursor) {
  if (view === "year") return String(cursor.getFullYear());
  if (view === "month") return `${MONTHS[cursor.getMonth()]} ${cursor.getFullYear()}`;
  if (view === "week") {
    const start = startOfWeek(cursor);
    const end = addDays(start, 6);
    if (start.getMonth() === end.getMonth()) {
      return `${MONTHS[start.getMonth()]} ${start.getDate()}–${end.getDate()}, ${start.getFullYear()}`;
    }
    return `${MONTHS[start.getMonth()]} ${start.getDate()} – ${MONTHS[end.getMonth()]} ${end.getDate()}, ${end.getFullYear()}`;
  }
  return cursor.toLocaleDateString("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function shiftCursor(view, cursor, dir) {
  const next = new Date(cursor);
  if (view === "year") next.setFullYear(next.getFullYear() + dir);
  else if (view === "month") next.setMonth(next.getMonth() + dir);
  else if (view === "week") next.setDate(next.getDate() + 7 * dir);
  else next.setDate(next.getDate() + dir);
  return next;
}

function EventChip({ event, compact = false }) {
  return (
    <div className={`gcal-chip${compact ? " gcal-chip--compact" : ""}`} title={event.title}>
      {!compact && !event.allDay && (
        <span className="gcal-chip__time">{formatTime(eventStart(event))}</span>
      )}
      <span className="gcal-chip__title">{event.title}</span>
    </div>
  );
}

function MonthGrid({ cursor, today, onSelectDay, events }) {
  const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const start = startOfWeek(first);
  const cells = Array.from({ length: 42 }, (_, i) => addDays(start, i));

  return (
    <div className="gcal-month">
      <div className="gcal-month__head">
        {WEEKDAYS.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="gcal-month__grid">
        {cells.map((day) => {
          const inMonth = day.getMonth() === cursor.getMonth();
          const dayEvents = eventsOnDay(day, events);
          return (
            <button
              type="button"
              key={day.toISOString()}
              className={[
                "gcal-day",
                !inMonth ? "is-muted" : "",
                sameDay(day, today) ? "is-today" : "",
                dayEvents.length ? "has-events" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => onSelectDay(day)}
            >
              <span className="gcal-day__num">{day.getDate()}</span>
              <div className="gcal-day__events">
                {dayEvents.slice(0, 2).map((e) => (
                  <EventChip key={e.id} event={e} compact />
                ))}
                {dayEvents.length > 2 && (
                  <span className="gcal-day__more">+{dayEvents.length - 2} more</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function WeekGrid({ cursor, today, onSelectDay, events }) {
  const start = startOfWeek(cursor);
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

  return (
    <div className="gcal-week">
      {days.map((day) => {
        const dayEvents = eventsOnDay(day, events);
        return (
          <button
            type="button"
            key={day.toISOString()}
            className={["gcal-week__col", sameDay(day, today) ? "is-today" : ""]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onSelectDay(day)}
          >
            <div className="gcal-week__label">
              <span>{WEEKDAYS[day.getDay()]}</span>
              <strong>{day.getDate()}</strong>
            </div>
            <div className="gcal-week__events">
              {dayEvents.length === 0 && <p className="gcal-empty">No events</p>}
              {dayEvents.map((e) => (
                <EventChip key={e.id} event={e} />
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function DayList({ cursor, events }) {
  const dayEvents = eventsOnDay(cursor, events);
  return (
    <div className="gcal-dayview">
      {dayEvents.length === 0 && (
        <p className="gcal-empty gcal-empty--lg">No events scheduled for this day.</p>
      )}
      {dayEvents.map((e) => (
        <article key={e.id} className="gcal-card">
          <div className="gcal-card__meta">
            <span className="gcal-card__tag">{e.tag}</span>
            {!e.allDay && (
              <span>
                {formatTime(eventStart(e))} – {formatTime(eventEnd(e))}
              </span>
            )}
          </div>
          <h4>{e.title}</h4>
          {e.description && <p>{e.description}</p>}
          {e.location && <p className="gcal-card__loc">{e.location}</p>}
          {e.registerUrl && (
            <a className="button tealbg gcal-card__cta" href={e.registerUrl}>
              Register
            </a>
          )}
        </article>
      ))}
    </div>
  );
}

function YearGrid({ cursor, today, onSelectMonth, events }) {
  return (
    <div className="gcal-year">
      {MONTHS.map((name, month) => {
        const first = new Date(cursor.getFullYear(), month, 1);
        const start = startOfWeek(first);
        const cells = Array.from({ length: 42 }, (_, i) => addDays(start, i));
        const monthEvents = eventsInRange(
          first,
          new Date(cursor.getFullYear(), month + 1, 0, 23, 59, 59),
          events,
        );
        return (
          <button
            type="button"
            key={name}
            className="gcal-year__month"
            onClick={() => onSelectMonth(first)}
          >
            <div className="gcal-year__name">
              {name}
              {monthEvents.length > 0 && (
                <span className="gcal-year__count">{monthEvents.length}</span>
              )}
            </div>
            <div className="gcal-year__mini">
              {WEEKDAYS.map((d) => (
                <span key={d} className="gcal-year__wd">
                  {d[0]}
                </span>
              ))}
              {cells.map((day) => {
                const inMonth = day.getMonth() === month;
                const has = inMonth && eventsOnDay(day, events).length > 0;
                return (
                  <span
                    key={day.toISOString()}
                    className={[
                      "gcal-year__cell",
                      !inMonth ? "is-muted" : "",
                      sameDay(day, today) ? "is-today" : "",
                      has ? "has-events" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  />
                );
              })}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default function GenCalendar({ events = [], renderedAt }) {
  // The page is prerendered, so its HTML can be days older than the visit. The first render has
  // to reproduce that HTML exactly, so it uses the moment the page was built (`renderedAt`);
  // once mounted, the calendar moves on to the actual time.
  const [now, setNow] = useState(() => (renderedAt ? new Date(renderedAt) : new Date()));
  useEffect(() => setNow(new Date()), []);

  const today = useMemo(() => startOfDay(kamloopsTime(now)), [now]);
  const [view, setView] = useState("month");
  const [picked, setCursor] = useState(null); // the date the visitor moved to, if any
  const cursor = picked ?? today;
  const upcoming = useMemo(() => getUpcomingEvents(events, 6, now), [events, now]);

  const label = formatRangeLabel(view, cursor);

  return (
    <div className="gcal">
      <div className="gcal__toolbar">
        <div className="gcal__nav">
          <button
            type="button"
            className="gcal__navbtn"
            onClick={() => setCursor(shiftCursor(view, cursor, -1))}
            aria-label="Previous"
          >
            <TruIcon name="chevron-left" />
          </button>
          <button type="button" className="gcal__today" onClick={() => setCursor(null)}>
            Today
          </button>
          <button
            type="button"
            className="gcal__navbtn"
            onClick={() => setCursor(shiftCursor(view, cursor, 1))}
            aria-label="Next"
          >
            <TruIcon name="chevron-right" />
          </button>
          <h6 className="gcal__label" aria-live="polite">
            {label}
          </h6>
        </div>

        <div className="gcal__views" role="tablist" aria-label="Calendar view">
          {VIEWS.map((v) => (
            <button
              key={v.id}
              type="button"
              role="tab"
              aria-selected={view === v.id}
              className={view === v.id ? "is-active" : undefined}
              onClick={() => setView(v.id)}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="gcal__layout">
        <div className="gcal__main">
          {view === "month" && (
            <MonthGrid
              cursor={cursor}
              today={today}
              events={events}
              onSelectDay={(day) => {
                setCursor(day);
                setView("day");
              }}
            />
          )}
          {view === "week" && (
            <WeekGrid
              cursor={cursor}
              today={today}
              events={events}
              onSelectDay={(day) => {
                setCursor(day);
                setView("day");
              }}
            />
          )}
          {view === "day" && <DayList cursor={cursor} events={events} />}
          {view === "year" && (
            <YearGrid
              cursor={cursor}
              today={today}
              events={events}
              onSelectMonth={(monthDate) => {
                setCursor(monthDate);
                setView("month");
              }}
            />
          )}
        </div>

        <aside className="gcal__aside">
          <h4 className="altHead">Upcoming events</h4>
          {upcoming.length === 0 && <p className="gcal-empty">No upcoming events.</p>}
          <ul className="gcal-upcoming">
            {upcoming.map((e) => (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => {
                    setCursor(startOfDay(eventStart(e)));
                    setView("day");
                  }}
                >
                  <span className="gcal-upcoming__date">{formatShortDate(eventStart(e))}</span>
                  <span className="gcal-upcoming__body">
                    <strong>{e.title}</strong>
                    <span>{e.allDay ? e.tag : `${formatTime(eventStart(e))} · ${e.tag}`}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <a className="button tealbg nomargin" href={GENERATOR_CONTACT_FORM}>
            Suggest an event
          </a>
        </aside>
      </div>
    </div>
  );
}
