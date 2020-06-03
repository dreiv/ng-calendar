import { ymd } from 'src/app/calendar/shared/utils';

export interface EventTime {
  date: string;
  startTime: string;
  endTime: string;
}

const padStart = num => num.toString().padStart(2, '0');

const formatTime = time => {
  const hours = padStart(time.getHours());
  const minutes = padStart(time.getMinutes());

  return `${hours}:${minutes}`;
};

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
    startTime: formatTime(startTime),
    endTime: formatTime(endTime)
  };
};
