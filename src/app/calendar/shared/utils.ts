export const getDateSize = (date: Date): number =>
  date.getHours() + date.getMinutes() / 60;
