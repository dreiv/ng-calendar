import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import {
  CalendarPeriod,
  CalendarDay,
  CalendarDirection,
  CalendarOptions
} from '../calendar';
import { getDays } from './helpers/getDays';

@Injectable()
export class CalendarService {
  private options: CalendarOptions;
  private scrollSyncSubject: BehaviorSubject<number>;
  private daysSubject: BehaviorSubject<CalendarDay[]>;

  scrollSync$: Observable<number>;
  days$: Observable<CalendarDay[]>;
  time$: Observable<Date>;

  constructor() {
    this.scrollSyncSubject = new BehaviorSubject(0);
    this.daysSubject = new BehaviorSubject([]);

    this.scrollSync$ = this.scrollSyncSubject.asObservable();
    this.days$ = this.daysSubject.asObservable();
    this.time$ = interval(1000).pipe(
      map(() => new Date()),
      share()
    );
  }

  configure(options: CalendarOptions): void {
    this.options = options;
    this.setDays(options.period);
  }

  setDays(
    period: CalendarPeriod,
    pivot: Date = new Date(),
    direction: CalendarDirection = 'current'
  ): void {
    this.daysSubject.next(getDays(period, pivot, direction));
  }

  goPrevious(): void {
    this.setDays(
      this.options.period,
      this.daysSubject.getValue()[0].date,
      'previous'
    );
  }

  goNext(): void {
    this.setDays(
      this.options.period,
      this.daysSubject.getValue()[0].date,
      'next'
    );
  }

  updateScroll(scrollLeft: number): void {
    if (scrollLeft != this.scrollSyncSubject.getValue()) {
      this.scrollSyncSubject.next(scrollLeft);
    }
  }
}
