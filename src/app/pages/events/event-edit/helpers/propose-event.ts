import { CalendarEvent } from 'src/app/calendar/calendar';
import { getRoundedDate } from './get-rounded-date';

export const proposeEvent = (): CalendarEvent => {
  const proposed = getRoundedDate(15);

  const startTime = new Date(proposed);
  const endTime = new Date(startTime);
  endTime.setHours(endTime.getHours() + 1);

  return {
    subject: 'New Event',
    startTime,
    endTime
  };
};
