// change together with styling
export const HOUR_SIZE = 48;

export type CalendarPeriod = 'day' | 'week' | 'workWeek';

export type CalendarDirection = 'previous' | 'current' | 'next';

export interface CalendarOptions {
  period: CalendarPeriod;
  focusedDay?: Date;
  isControlled?: boolean;
  opperatingHours?: CalendarOpperatingHours;
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

export interface CalendarOpperatingHours {
  startTime: Date;
  endTime: Date;
}
