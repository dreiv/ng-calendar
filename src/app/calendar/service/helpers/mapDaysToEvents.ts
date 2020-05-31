import { CalendarEvent, CalendarDay } from '../../calendar';

const toYMD = date => date.toISOString().slice(0, 10);

export const mapDaysToEvents = (
  days: Date[],
  events: CalendarEvent[]
): CalendarDay[] =>
  days.map(day => {
    const dayYMD = toYMD(day);
    const eventsForDay = events.filter(
      event => toYMD(event.startDate) == dayYMD
    );

    return { date: day, events: eventsForDay };
  });
