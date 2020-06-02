import { CalendarEvent, CalendarDay } from '../../calendar';

export const mapDaysToEvents = (
  days: Date[],
  events: CalendarEvent[]
): CalendarDay[] =>
  days.map(day => {
    const eventsForDay = events.filter(
      event => event.startDate.toDateString() == day.toDateString()
    );

    return { date: day, events: eventsForDay };
  });
