import { CalendarEvent } from '../../calendar';
import { hm } from '../../shared/utils';

const eventSort = (property: string) => (
  a: CalendarEvent,
  b: CalendarEvent
): number => {
  const timeA = hm(a[property]);
  const timeB = hm(b[property]);

  if (timeA < timeB) {
    return -1;
  }
  if (timeA > timeB) {
    return 1;
  }

  return 0;
};

const getMaxEnd = (events: CalendarEvent[]) => {
  if (!events.length) {
    return;
  }
  events.sort(eventSort('endTime'));

  return events[events.length - 1].endTime;
};

export const partitionEvents = (events: CalendarEvent[]): CalendarEvent[][] => {
  if (!events.length) {
    return [];
  }

  const sortedEvents = [...events].sort(eventSort('startTime'));
  const partitioned: CalendarEvent[][] = [];
  let index = 0;
  partitioned[index] = [sortedEvents[0]];

  for (let i = 1; i < sortedEvents.length; i++) {
    if (hm(sortedEvents[i].startTime) < hm(getMaxEnd(partitioned[index]))) {
      partitioned[index].push(sortedEvents[i]);
    } else {
      index++;
      partitioned[index] = [sortedEvents[i]];
    }
  }

  return partitioned;
};
