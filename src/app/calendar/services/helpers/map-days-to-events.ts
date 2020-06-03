import { CalendarEvent, CalendarDay, CalendarTense } from '../../calendar';
import { ymd } from '../../shared/utils';

const getTense = (nowDate: Date, thenDate: Date): CalendarTense => {
  const now = ymd(nowDate);
  const then = ymd(thenDate);

  if (then < now) {
    return 'past';
  } else if (now == then) {
    return 'present';
  }

  return 'future';
};

export const mapDaysToEvents = (
  days: Date[],
  events: CalendarEvent[]
): CalendarDay[] => {
  const now = new Date();

  return days.map(day => {
    const eventsForDay = events.filter(
      event => event.startDate.toDateString() == day.toDateString()
    );

    return { date: day, events: eventsForDay, tense: getTense(now, day) };
  });
};
