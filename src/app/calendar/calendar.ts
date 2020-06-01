// change together with styling
export const HOUR_SIZE = 48;

export type CalendarPeriod = 'day' | 'week' | 'workWeek';

export type CalendarDirection = 'previous' | 'current' | 'next';

export interface CalendarOptions {
  period: CalendarPeriod;
  focusedDay?: Date;
  controlled?: boolean;
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
  id?: string;
  title: string;
  startDate: Date;
  endDate: Date;
  isSketch?: boolean;
  recurring?: boolean;
}

type timeRange = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export interface CalendarHour {
  hour: timeRange;
  period: 'am' | 'pm';
}
export interface CalendarOpperatingHours {
  startTime: CalendarHour;
  endTime: CalendarHour;
}
