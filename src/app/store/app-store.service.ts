import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CalendarEvent } from '../calendar/calendar';
import events from './events-seed.json';

@Injectable({
  providedIn: 'root'
})
export class AppStoreService {
  private eventsSubject: BehaviorSubject<CalendarEvent[]>;

  events$: Observable<CalendarEvent[]>;

  constructor() {
    this.eventsSubject = new BehaviorSubject(
      events.map(event => ({
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        title: event.title
      }))
    );

    this.events$ = this.eventsSubject.asObservable();
  }
}
