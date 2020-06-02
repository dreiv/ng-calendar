import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { getDays } from './helpers/get-days';
import { mapDaysToEvents } from './helpers/map-days-to-events';
import {
  CalendarPeriod,
  CalendarDay,
  CalendarDirection,
  CalendarOptions,
  CalendarEvent
} from '../calendar';

@Injectable()
export class CalendarService {
  private optionsSubject: BehaviorSubject<CalendarOptions>;
  private visibleDaysSubject: BehaviorSubject<Date[]>;
  private eventsSubject: BehaviorSubject<CalendarEvent[]>;

  options$: Observable<CalendarOptions>;
  days$: Observable<CalendarDay[]>;
  time$: Observable<Date>;

  constructor() {
    this.optionsSubject = new BehaviorSubject(null);
    this.visibleDaysSubject = new BehaviorSubject([]);
    this.eventsSubject = new BehaviorSubject([]);

    this.options$ = this.optionsSubject.asObservable();
    this.days$ = combineLatest(
      this.visibleDaysSubject,
      this.eventsSubject
    ).pipe(map(([days, events]) => mapDaysToEvents(days, events)));
  }

  configure(options: CalendarOptions): void {
    this.optionsSubject.next(options);
    this.setDays(options.period, options.focusedDay);
  }

  setEvents(events: CalendarEvent[]): void {
    this.eventsSubject.next(events);
  }

  goPrevious(): void {
    this.setDays(
      this.optionsSubject.getValue().period,
      this.visibleDaysSubject.getValue()[0],
      'previous'
    );
  }

  goNext(): void {
    this.setDays(
      this.optionsSubject.getValue().period,
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
