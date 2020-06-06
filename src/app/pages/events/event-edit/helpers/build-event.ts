import { CalendarEvent } from 'src/app/calendar/calendar';

const getTime = (seed, time: string): Date => {
  const [hours, minutes] = time.split(':').map(item => +item);

  const date = new Date(seed);
  date.setHours(hours, minutes);

  return date;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const buildEvent = (changes: any): CalendarEvent => {
  const eventDate = new Date(changes.date);

  const event: CalendarEvent = {
    subject: changes.subject,
    startDate: getTime(eventDate, changes.time.start),
    endDate: getTime(eventDate, changes.time.end),
    isSketch: true
  };

  return event;
};
