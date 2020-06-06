import { CalendarDirection, CalendarTimeFrame } from '../../calendar';

const periodWeight = new Map<CalendarTimeFrame, number>([
  ['day', 1],
  ['week', 7],
  ['workWeek', 7]
]);

const directionSign = new Map<CalendarDirection, number>([
  ['previous', -1],
  ['current', 0],
  ['next', 1]
]);

export const getOffsetDate = (
  period: CalendarTimeFrame,
  pivot: Date,
  direction: CalendarDirection
): Date => {
  const offset = periodWeight.get(period) * directionSign.get(direction);
  const offsetDate = new Date(
    pivot.getFullYear(),
    pivot.getMonth(),
    pivot.getDate() + offset
  );

  return offsetDate;
};
