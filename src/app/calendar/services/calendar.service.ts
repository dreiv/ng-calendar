import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { getDays } from './helpers/get-days';
import { mapDaysToEvents } from './helpers/map-days-to-events';
import {
  CalendarTimeFrame,
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

  constructor() {
    this.optionsSubject = new BehaviorSubject(null);
    this.visibleDaysSubject = new BehaviorSubject([]);
    this.eventsSubject = new BehaviorSubject([]);

    this.options$ = this.optionsSubject.asObservable();
    this.days$ = combineLatest([
      this.visibleDaysSubject,
      this.eventsSubject
    ]).pipe(
      map(([days, events]) => mapDaysToEvents(days, events)),
      shareReplay(1)
    );
  }

  configure(options: CalendarOptions): void {
    this.optionsSubject.next(options);
    this.setDays(options.timeFrame, options.focusedDay);
  }

  setEvents(events: CalendarEvent[]): void {
    this.eventsSubject.next(events);
  }

  go(direction: CalendarDirection): void {
    this.setDays(
      this.optionsSubject.getValue().timeFrame,
      this.visibleDaysSubject.getValue()[0],
      direction
    );
  }

  private setDays(
    period: CalendarTimeFrame,
    pivot: Date = new Date(),
    direction: CalendarDirection = 'current'
  ): void {
    this.visibleDaysSubject.next(getDays(period, pivot, direction));
  }
}
