import { CalendarEvent } from 'src/app/calendar/calendar';

const getTime = (seed, time: string): Date => {
  const [hours, minutes] = time.split(':').map(item => +item);

  const date = new Date(seed);
  date.setHours(hours, minutes);

  return date;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getEvent = (event: CalendarEvent, changes: any): CalendarEvent => {
  const eventDate = new Date(changes.datetime.date);
  const { subject, description, datetime, recurrence } = changes;

  return {
    ...event,
    subject,
    description,
    startTime: getTime(eventDate, datetime.start),
    endTime: getTime(eventDate, datetime.end),
    ...(recurrence.interval && {
      recurring: {
        frequency: recurrence.frequency,
        interval: recurrence.interval,
        ...(recurrence.endDate && {
          endDate: new Date(recurrence.endDate)
        })
      }
    })
  };
};
