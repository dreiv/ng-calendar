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

  return Array.from({ length: periodToDays.get(period) }, (_, idx) => {
    const dayOfWeek = date.getDay() || 7;
    const dayOfMonth = date.getDate();
    const offsetWeekDay = dayOfMonth - dayOfWeek + idx + 1;

    return new Date(date.setDate(offsetWeekDay));
  });
};
