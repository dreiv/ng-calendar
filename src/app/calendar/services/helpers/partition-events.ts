import { CalendarEvent } from '../../calendar';

const dateSort = (property: string) => (
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

const getMaxEnd = (dates: CalendarEvent[]) => {
  if (!dates.length) {
    return false;
  }
  dates.sort(dateSort('endTime'));

  return dates[0].endTime;
};

export const partitionEvents = (dates: CalendarEvent[]): CalendarEvent[][] => {
  const partitioned: CalendarEvent[][] = [];
  let index = 0;
  if (dates[0]) {
    partitioned[index] = [dates[0]];
  }

  dates.sort(dateSort('startTime'));

  for (let i = 1; i < dates.length; i++) {
    if (
      dates[i].startTime > dates[i - 1].startTime &&
      dates[i].startTime < getMaxEnd(partitioned[index])
    ) {
      partitioned[index].push(dates[i]);
    } else {
      index++;
      partitioned[index] = [dates[i]];
    }
  }

  return partitioned;
};
