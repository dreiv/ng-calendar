import { CalendarDays, CalendarPeriod, CalendarDirection } from '../calendar';
import { getOffsetDate } from './getOffsetDate';

const periodToDays = new Map<CalendarPeriod, number>([
  ['workWeek', 5],
  ['week', 7]
]);

export const getDays = (
  period: CalendarPeriod,
  direction: CalendarDirection = 'current',
  pivot: Date = new Date()
): CalendarDays[] => {
  const date = getOffsetDate(period, direction, pivot);
  if (period == 'day') {
    return [{ date }];
  }

  const week = [];
  const count = periodToDays.get(period);

  for (let i = 1; i <= count; i++) {
    const first = date.getDate() - date.getDay() + i;
    const weekDay = new Date(date.setDate(first));

    week.push({ date: weekDay });
  }

  return week;
};
