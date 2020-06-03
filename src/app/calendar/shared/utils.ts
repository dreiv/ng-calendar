export const getDateSize = (date: Date): number =>
  date.getHours() + date.getMinutes() / 60;

export const ymd = (date: Date): string =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
