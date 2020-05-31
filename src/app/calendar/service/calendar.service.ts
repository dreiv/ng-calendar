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
  private visibleDaysSubject: BehaviorSubject<Date[]>;

  scrollSync$: Observable<number>;
  days$: Observable<CalendarDay[]>;
  time$: Observable<Date>;

  constructor() {
    this.scrollSyncSubject = new BehaviorSubject(0);
    this.visibleDaysSubject = new BehaviorSubject([]);

    this.scrollSync$ = this.scrollSyncSubject.asObservable();
    this.days$ = this.visibleDaysSubject
      .asObservable()
      .pipe(map(dates => dates.map(date => ({ date }))));
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
    this.visibleDaysSubject.next(getDays(period, pivot, direction));
  }

  goPrevious(): void {
    this.setDays(
      this.options.period,
      this.visibleDaysSubject.getValue()[0],
      'previous'
    );
  }

  goNext(): void {
    this.setDays(
      this.options.period,
      this.visibleDaysSubject.getValue()[0],
      'next'
    );
  }

  updateScroll(scrollLeft: number): void {
    if (scrollLeft != this.scrollSyncSubject.getValue()) {
      this.scrollSyncSubject.next(scrollLeft);
    }
  }
}
