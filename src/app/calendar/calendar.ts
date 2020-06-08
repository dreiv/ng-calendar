export type CalendarTimeFrame = 'day' | 'week' | 'workWeek';

export type CalendarDirection = 'previous' | 'current' | 'next';

export type CalendarTense = 'past' | 'present' | 'future';

export type CalendarRecurrenceFrequency = 'day' | 'week';

export interface CalendarOptions {
  timeFrame: CalendarTimeFrame;
  focusedDay?: Date;
  isControlled?: boolean;
  operatingHours?: CalendarOperatingHours;
}

export interface CalendarDay {
  date: Date;
  events: CalendarEvent[][];
  tense: CalendarTense;
}

export interface CalendarEvent {
  id?: string;
  subject: string;
  description?: string;
  startTime: Date;
  endTime: Date;

  isSketch?: boolean;
  recurrence?: CalendarEventRecurrence;
}

export interface CalendarEventRecurrence {
  frequency: CalendarRecurrenceFrequency;
  interval: number;
  endDate?: Date;
  exceptions?: Date[];
}

export interface CalendarOperatingHours {
  startTime: Date;
  endTime: Date;
}

export interface CalendarSelectedTimeFrame {
  from: Date;
  to: Date;
}
