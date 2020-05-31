import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { CalendarPeriod, CalendarDay } from '../calendar';
import { getDays } from './getDays';

@Injectable()
export class CalendarService {
  private scrollSubject: BehaviorSubject<number>;
  private daysSubject: BehaviorSubject<CalendarDay[]>;

  scroll$: Observable<number>;
  days$: Observable<CalendarDay[]>;
  time$: Observable<Date>;

  constructor() {
    this.scrollSubject = new BehaviorSubject(0);
    this.daysSubject = new BehaviorSubject([]);

    this.scroll$ = this.scrollSubject.asObservable();
    this.days$ = this.daysSubject.asObservable();
    this.time$ = interval(1000).pipe(
      map(() => new Date()),
      share()
    );
  }

  setPeriod(period: CalendarPeriod): void {
    this.daysSubject.next(getDays(period));
  }

  updateScroll(scrollLeft: number): void {
    if (scrollLeft != this.scrollSubject.getValue()) {
      this.scrollSubject.next(scrollLeft);
    }
  }
}
