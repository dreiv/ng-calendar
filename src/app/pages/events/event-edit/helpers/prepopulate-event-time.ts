import { ymd, hm } from 'src/app/calendar/shared/utils';

export interface EventTime {
  date: string;
  startTime: string;
  endTime: string;
}
export const prepopulateEventTime = (now = new Date()): EventTime => {
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
    date: ymd(now),
    startTime: hm(startTime),
    endTime: hm(endTime)
  };
};
