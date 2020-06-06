import { CalendarEvent, CalendarDay } from '../../calendar';
import { getTense } from './get-tense';
import { partitionEvents } from './partition-events';

export const mapDaysToEvents = (
  days: Date[],
  events: CalendarEvent[]
): CalendarDay[] => {
  const now = new Date();

  return days.map(day => {
    const eventsForDay = events.filter(
      ({ startTime: startTime }) =>
        startTime.toDateString() === day.toDateString()
    );

    return {
      date: day,
      events: partitionEvents(eventsForDay),
      tense: getTense(now, day)
    };
  });
};
