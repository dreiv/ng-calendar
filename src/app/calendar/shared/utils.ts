export const getDateSize = (date: Date): number =>
  date.getHours() + date.getMinutes() / 60;

export const ymd = (date: Date): string => {
  const year = date.getFullYear();
  const month = padStart(date.getMonth() + 1);
  const day = padStart(date.getDate());

  return `${year}-${month}-${day}`;
};

export const padStart = (num: number, padCount = 2): string =>
  num.toString().padStart(padCount, '0');
