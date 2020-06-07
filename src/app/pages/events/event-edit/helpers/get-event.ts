import { CalendarEvent } from 'src/app/calendar/calendar';

const getTime = (seed, time: string): Date => {
  const [hours, minutes] = time.split(':').map(item => +item);

  const date = new Date(seed);
  date.setHours(hours, minutes);

  return date;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getEvent = (event: CalendarEvent, changes: any): CalendarEvent => {
  const eventDate = new Date(changes.date);

  return {
    ...event,
    subject: changes.subject,
    startTime: getTime(eventDate, changes.time.start),
    endTime: getTime(eventDate, changes.time.end)
  };
};
