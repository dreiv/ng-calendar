import { CalendarEvent, CalendarDay } from '../../calendar';
import { getTense } from './get-tense';
import { partitionIntoOverlappingRanges } from './partition-into-overlapping-ranges';

export const mapDaysToEvents = (
  days: Date[],
  events: CalendarEvent[]
): CalendarDay[] => {
  const now = new Date();
  console.log('called');

  return days.map(day => {
    const eventsForDay = events.filter(
      ({ startTime: startTime }) =>
        startTime.toDateString() === day.toDateString()
    );

    console.log('partitioned', partitionIntoOverlappingRanges(eventsForDay));

    return {
      date: day,
      events: eventsForDay,
      tense: getTense(now, day)
    };
  });
};
