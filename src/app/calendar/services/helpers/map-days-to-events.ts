import { CalendarEvent, CalendarDay } from '../../calendar';
import { getTense } from './get-tense';

export const mapDaysToEvents = (
  days: Date[],
  events: CalendarEvent[]
): CalendarDay[] => {
  const now = new Date();

  return days.map(day => {
    const eventsForDay = events.filter(
      ({ startDate }) => startDate.toDateString() == day.toDateString()
    );

    return {
      date: day,
      events: eventsForDay,
      tense: getTense(now, day)
    };
  });
};
