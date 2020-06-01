import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CalendarEvent, CalendarOpperatingHours } from '../calendar/calendar';
import events from './events-seed.json';

@Injectable({
  providedIn: 'root'
})
export class AppStoreService {
  private eventsSubject: BehaviorSubject<CalendarEvent[]>;
  private opperatingHoursSubject: BehaviorSubject<CalendarOpperatingHours>;

  events$: Observable<CalendarEvent[]>;
  opperatingHours$: Observable<CalendarOpperatingHours>;

  constructor() {
    this.opperatingHoursSubject = new BehaviorSubject({
      startTime: { hour: 9, period: 'am' },
      endTime: { hour: 5, period: 'pm' }
    });
    this.eventsSubject = new BehaviorSubject(
      events.map(event => ({
        ...event,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate)
      }))
    );

    this.events$ = this.eventsSubject.asObservable();
    this.opperatingHours$ = this.opperatingHoursSubject.asObservable();
  }
}
