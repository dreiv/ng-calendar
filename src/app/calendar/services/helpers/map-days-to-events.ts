import {
  CalendarEvent,
  CalendarDay,
  CalendarRecurringFrequency
} from '../../calendar';
import { getTense } from './get-tense';
import { partitionEvents } from './partition-events';
import { dateDiff } from '../../shared/utils';

const weight = new Map<CalendarRecurringFrequency, number>([
  ['day', 1],
  ['week', 7]
]);

const sameDay = (a: Date, b: Date): boolean =>
  a.toDateString() === b.toDateString();

const filterEvents = day => event => {
  const { startTime, recurring } = event;

  if (recurring && startTime < day) {
    const { frequency, interval, endDate, exceptions } = recurring;

    if (endDate && day > endDate) {
      return false;
    }

    if (exceptions && ~exceptions.findIndex(ex => sameDay(ex, day))) {
      return false;
    }

    return dateDiff(startTime, day) % (weight.get(frequency) * interval) === 0;
  } else {
    return sameDay(startTime, day);
  }
};

export const mapDaysToEvents = (
  days: Date[],
  events: CalendarEvent[]
): CalendarDay[] =>
  days.map(day => {
    const eventsForDay = events.filter(filterEvents(day));

    return {
      date: day,
      events: partitionEvents(eventsForDay),
      tense: getTense(new Date(), day)
    };
  });
