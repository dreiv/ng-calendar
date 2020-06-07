import { CalendarEvent } from 'src/app/calendar/calendar';

export const proposeEvent = (): CalendarEvent => {
  const now = new Date();
  const nowHours = now.getHours();
  const nowMinutes = now.getMinutes();

  const startTime = new Date(now);
  if (nowMinutes > 29) {
    startTime.setHours(nowHours + 1);
    startTime.setMinutes(0);
  } else {
    startTime.setMinutes(30);
  }

  const endTime = new Date(startTime);
  endTime.setHours(endTime.getHours() + 1);

  return {
    subject: 'New Event',
    startTime: startTime,
    endTime: endTime
  };
};
