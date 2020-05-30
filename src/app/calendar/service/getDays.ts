import { CalendarDays, CalendarPeriod } from '../calendar';

const periodToDays = new Map<CalendarPeriod, number>([
  ['workWeek', 5],
  ['week', 7]
]);

export const getDays = (period: CalendarPeriod): CalendarDays[] => {
  const curr = new Date();
  if (period == 'day') {
    return [{ date: curr }];
  }

  const week = [];
  const count = periodToDays.get(period);

  for (let i = 1; i <= count; i++) {
    const first = curr.getDate() - curr.getDay() + i;
    const date = new Date(curr.setDate(first));

    week.push({ date });
  }

  return week;
};
