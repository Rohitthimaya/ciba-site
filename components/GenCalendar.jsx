"use client";

import { useMemo, useState } from "react";
import { eventsInRange, eventsOnDay, getUpcomingEvents } from "@/lib/generatorEvents";

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

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
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
  return cursor.toLocaleDateString(undefined, {
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
      {!compact && <span className="gcal-chip__time">{formatTime(event.start)}</span>}
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
            <span>
              {formatTime(e.start)} – {formatTime(e.end)}
            </span>
          </div>
          <h3>{e.title}</h3>
          <p>{e.description}</p>
          <p className="gcal-card__loc">{e.location}</p>
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

export default function GenCalendar({ events = [] }) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [view, setView] = useState("month");
  const [cursor, setCursor] = useState(today);
  const upcoming = useMemo(() => getUpcomingEvents(events, 6), [events]);

  const label = formatRangeLabel(view, cursor);

  return (
    <div className="gcal">
      <div className="gcal__toolbar">
        <div className="gcal__nav">
          <button type="button" className="gcal__navbtn" onClick={() => setCursor(shiftCursor(view, cursor, -1))} aria-label="Previous">
            ‹
          </button>
          <button type="button" className="gcal__today" onClick={() => setCursor(today)}>
            Today
          </button>
          <button type="button" className="gcal__navbtn" onClick={() => setCursor(shiftCursor(view, cursor, 1))} aria-label="Next">
            ›
          </button>
          <h3 className="gcal__label">{label}</h3>
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
          <h4>Upcoming events</h4>
          {upcoming.length === 0 && <p className="gcal-empty">No upcoming events.</p>}
          <ul className="gcal-upcoming">
            {upcoming.map((e) => (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => {
                    setCursor(startOfDay(new Date(e.start)));
                    setView("day");
                  }}
                >
                  <span className="gcal-upcoming__date">
                    {new Date(e.start).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="gcal-upcoming__body">
                    <strong>{e.title}</strong>
                    <span>
                      {formatTime(e.start)} · {e.tag}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <a
            className="gen-btn gen-btn--teal gcal__cta"
            href="mailto:generator@acceleratebusiness.ca?subject=TRU%20Generator%20Events"
          >
            Suggest an event <span aria-hidden="true">›</span>
          </a>
        </aside>
      </div>
    </div>
  );
}
