// change together with styling
export const HOUR_SIZE = 48;

export type CalendarPeriod = 'day' | 'week' | 'workWeek';

export type CalendarDirection = 'previous' | 'current' | 'next';

export interface CalendarOptions {
  period: CalendarPeriod;
  focusedDay?: Date;
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
  startDate: Date;
  endDate: Date;
  title: string;
  recurring?: boolean;
}
