import { CalendarEvent } from '../../calendar';

const eventSort = (property: string) => (
  a: CalendarEvent,
  b: CalendarEvent
): number => {
  if (a[property] < b[property]) {
    return -1;
  }
  if (a[property] > b[property]) {
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
    if (sortedEvents[i].startTime < getMaxEnd(partitioned[index])) {
      partitioned[index].push(sortedEvents[i]);
    } else {
      index++;
      partitioned[index] = [sortedEvents[i]];
    }
  }

  return partitioned;
};
