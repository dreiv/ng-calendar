import { CalendarPeriod, CalendarDirection } from '../../calendar';
import { getOffsetDate } from './get-offset-date';

const periodToDays = new Map<CalendarPeriod, number>([
  ['workWeek', 5],
  ['week', 7]
]);

export const getDays = (
  period: CalendarPeriod,
  pivot: Date,
  direction: CalendarDirection
): Date[] => {
  const date = getOffsetDate(period, pivot, direction);
  if (period == 'day') {
    return [date];
  }

  const week = [];
  const count = periodToDays.get(period);

  for (let i = 1; i <= count; i++) {
    const dayOfWeek = date.getDay() || 7;
    const dayOfMonth = date.getDate();
    const offsetWeekDay = dayOfMonth - dayOfWeek + i;

    week.push(new Date(date.setDate(offsetWeekDay)));
  }

  return week;
};
