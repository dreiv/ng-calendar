export type CalendarPeriod = 'day' | 'week' | 'workWeek';

export type CalendarDirection = 'previous' | 'current' | 'next';

export interface CalendarOptions {
  period: CalendarPeriod;
}

export interface CalendarState extends CalendarOptions {
  pivot: Date;
  direction: CalendarDirection;
}

export interface CalendarDay {
  date: Date;
  events: CalendarEvent[];
}

export interface CalendarEvent {
  date: Date;
  title: string;
  description: string;
  recurring?: boolean;
}
