import {
  CalendarEvent,
  CalendarDay,
  CalendarRecurringFrequency
} from '../../calendar';
import { getTense } from './get-tense';
import { partitionEvents } from './partition-events';
import { dateDiff } from '../../shared/utils';

const frequencyWeight = new Map<CalendarRecurringFrequency, number>([
  ['day', 1],
  ['week', 7]
]);

export const mapDaysToEvents = (
  days: Date[],
  events: CalendarEvent[]
): CalendarDay[] =>
  days.map(day => {
    const eventsForDay = events.filter(event => {
      const { startTime, recurring } = event;
      let isValid = startTime.toDateString() === day.toDateString();

      if (recurring) {
        const { frequency, interval, endDate } = recurring;
        console.log(endDate);
        if (startTime < day) {
          if (endDate && day > endDate) {
            return false;
          }

          isValid =
            dateDiff(startTime, day) %
              (frequencyWeight.get(frequency) * interval) ===
            0;
        }
      }
      return isValid;
    });

    return {
      date: day,
      events: partitionEvents(eventsForDay),
      tense: getTense(new Date(), day)
    };
  });
