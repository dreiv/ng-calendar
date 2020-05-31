export type CalendarPeriod = 'day' | 'week' | 'workWeek';

export type CalendarDirection = 'previous' | 'current' | 'next';

export interface CalendarOptions {
  period: CalendarPeriod;
}

export interface CalendarDay {
  date: Date;
}

export interface CalendarEvent {
  date: string;
  title: string;
  description: string;
  recurring: boolean;
}
