export type CalendarPeriod = 'day' | 'week' | 'workWeek';

export interface CalendarOptions {
  period: CalendarPeriod;
}

export interface CalendarDays {
  date: Date;
}
