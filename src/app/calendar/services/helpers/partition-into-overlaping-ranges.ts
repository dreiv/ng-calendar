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

export const partitionIntoOverlappingRanges = (dates: CalendarEvent[]) => {
  const partitioned = [];
  let g = 0;
  partitioned[g] = [dates[0]];

  dates.sort(dateSort('startTime'));

  for (let i = 1; i < dates.length; i++) {
    if (
      dates[i].startTime > dates[i - 1].startTime &&
      dates[i].startTime < getMaxEnd(partitioned[g])
    ) {
      partitioned[g].push(dates[i]);
    } else {
      g++;
      partitioned[g] = dates[i];
    }
  }

  return partitioned;
};
