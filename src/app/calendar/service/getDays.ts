import { CalendarDay, CalendarPeriod, CalendarDirection } from '../calendar';
import { getOffsetDate } from './getOffsetDate';

const periodToDays = new Map<CalendarPeriod, number>([
  ['workWeek', 5],
  ['week', 7]
]);

export const getDays = (
  period: CalendarPeriod,
  direction: CalendarDirection = 'current',
  pivot: Date = new Date()
): CalendarDay[] => {
  const date = getOffsetDate(period, direction, pivot);
  if (period == 'day') {
    return [{ date }];
  }

  const week = [];
  const count = periodToDays.get(period);

  for (let i = 1; i <= count; i++) {
    const dayOfWeek = date.getDay() || 7;
    const dayOfMonth = date.getDate();
    const offsetWeekDay = dayOfMonth - dayOfWeek + i;

    week.push({ date: new Date(date.setDate(offsetWeekDay)) });
  }

  return week;
};
