export interface EventTime {
  date: string;
  startTime: string;
  endTime: string;
}

const formatTime = time => {
  const hours = time
    .getHours()
    .toString()
    .padStart(2, '0');

  const minutes = time
    .getMinutes()
    .toString()
    .padStart(2, '0');

  return `${hours}:${minutes}`;
};

export const populateEventTime = (): EventTime => {
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
    date: now.toISOString().slice(0, 10),
    startTime: formatTime(startTime),
    endTime: formatTime(endTime)
  };
};
