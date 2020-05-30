import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { CalendarPeriod, CalendarDays } from '../calendar';
import { getDays } from './getDays';

@Injectable()
export class CalendarService {
  private scrollSubject: BehaviorSubject<number>;
  private daysSubject: BehaviorSubject<Date[]>;

  scroll$: Observable<number>;
  days$: Observable<CalendarDays[]>;
  time$: Observable<Date>;

  constructor() {
    this.scrollSubject = new BehaviorSubject(0);

    this.scroll$ = this.scrollSubject.asObservable();
    this.time$ = interval(1000).pipe(
      map(() => new Date()),
      share()
    );
  }

  setPeriod(period: CalendarPeriod): void {
    console.log(getDays(period));
  }

  updateScroll(scrollLeft: number): void {
    if (scrollLeft != this.scrollSubject.getValue()) {
      this.scrollSubject.next(scrollLeft);
    }
  }
}
