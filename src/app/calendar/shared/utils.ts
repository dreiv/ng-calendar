import { hourSize } from './calendar.defs';

const dayDuration = 86400000;

export const ymd = (date: Date): string => {
  if (!date) return;

  const year = date.getFullYear();
  const month = padStart(date.getMonth() + 1);
  const day = padStart(date.getDate());

  return `${year}-${month}-${day}`;
};

export const hm = (date: Date): string => {
  if (!date) return;

  const hours = padStart(date.getHours());
  const minutes = padStart(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const padStart = (num: number, padCount = 2): string =>
  num.toString().padStart(padCount, '0');

export const numToSize = (dateSize: number): string =>
  dateSize * hourSize + 'px';

export const getDateSize = (date: Date): number =>
  date.getHours() + date.getMinutes() / 60;

export const dateToSize = (date: Date): string => numToSize(getDateSize(date));

export const dateDiff = (first: Date, second: Date): number =>
  Math.floor((first.getTime() - second.getTime()) / dayDuration);
