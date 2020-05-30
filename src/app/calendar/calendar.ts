export type CalendarPeriod = 'day' | 'week' | 'workWeek';

export type CalendarDirection = 'previous' | 'current' | 'next';

export interface CalendarOptions {
  period: CalendarPeriod;
}

export interface CalendarDays {
  date: Date;
}
