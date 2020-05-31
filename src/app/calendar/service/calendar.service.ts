import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, combineLatest } from 'rxjs';
import { map, share } from 'rxjs/operators';
import {
  CalendarPeriod,
  CalendarDay,
  CalendarDirection,
  CalendarOptions,
  CalendarEvent
} from '../calendar';
import { getDays } from './helpers/getDays';
import { mapDaysToEvents } from './helpers/mapDaysToEvents';

@Injectable()
export class CalendarService {
  private options: CalendarOptions;
  private scrollSyncSubject: BehaviorSubject<number>;
  private visibleDaysSubject: BehaviorSubject<Date[]>;
  private eventsSubject: BehaviorSubject<CalendarEvent[]>;

  scrollSync$: Observable<number>;
  days$: Observable<CalendarDay[]>;
  time$: Observable<Date>;

  constructor() {
    this.scrollSyncSubject = new BehaviorSubject(0);
    this.visibleDaysSubject = new BehaviorSubject([]);
    this.eventsSubject = new BehaviorSubject([]);

    this.scrollSync$ = this.scrollSyncSubject.asObservable();
    this.days$ = combineLatest(
      this.visibleDaysSubject,
      this.eventsSubject
    ).pipe(map(([days, events]) => mapDaysToEvents(days, events)));
    this.time$ = interval(1000).pipe(
      map(() => new Date()),
      share()
    );
  }

  updateScroll(scrollLeft: number): void {
    if (scrollLeft != this.scrollSyncSubject.getValue()) {
      this.scrollSyncSubject.next(scrollLeft);
    }
  }

  configure(options: CalendarOptions): void {
    this.options = options;
    this.setDays(options.period);
  }

  setEvents(events: CalendarEvent[]): void {
    this.eventsSubject.next(events);
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

  private setDays(
    period: CalendarPeriod,
    pivot: Date = new Date(),
    direction: CalendarDirection = 'current'
  ): void {
    this.visibleDaysSubject.next(getDays(period, pivot, direction));
  }
}