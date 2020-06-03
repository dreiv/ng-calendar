import { ymd } from '../../shared/utils';
import { CalendarTense } from '../../calendar';

export const getTense = (nowDate: Date, thenDate: Date): CalendarTense => {
  const now = ymd(nowDate);
  const then = ymd(thenDate);

  if (then < now) {
    return 'past';
  } else if (now == then) {
    return 'present';
  }

  return 'future';
};
