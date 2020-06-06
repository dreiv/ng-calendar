import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CalendarEvent, CalendarOperatingHours } from '../calendar/calendar';
import events from './events-seed.json';

@Injectable({
  providedIn: 'root'
})
export class AppStoreService {
  private eventsSubject: BehaviorSubject<CalendarEvent[]>;
  private operatingHoursSubject: BehaviorSubject<CalendarOperatingHours>;

  events$: Observable<CalendarEvent[]>;
  operatingHours$: Observable<CalendarOperatingHours>;

  constructor() {
    this.operatingHoursSubject = new BehaviorSubject({
      startTime: new Date(null, null, null, 9, 0),
      endTime: new Date(null, null, null, 17, 0)
    });
    this.eventsSubject = new BehaviorSubject(
      events.map(event => ({
        ...event,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate)
      }))
    );

    this.events$ = this.eventsSubject.asObservable();
    this.operatingHours$ = this.operatingHoursSubject.asObservable();
  }

  setEvents(events: CalendarEvent[]): void {
    this.eventsSubject.next(events.slice());
  }

  getEvents(): CalendarEvent[] {
    return this.eventsSubject.getValue().slice();
  }

  getEvent(id: string): CalendarEvent {
    return this.eventsSubject.getValue().find(event => event.id == id);
  }

  addEvent(event: CalendarEvent): void {
    const events = this.getEvents();
    if (!event.id) {
      event.id = Math.random()
        .toString(36)
        .substr(2, 5);
    }
    events.push(event);

    this.setEvents(events);
  }

  updateEvent(id: string, updatedEvent: CalendarEvent): void {
    const events = this.getEvents();
    const updatedEventIndex = this.getEventIndex(id);
    events[updatedEventIndex] = updatedEvent;

    this.setEvents(events);
  }

  deleteEvent(id: string): void {
    const events = this.getEvents();
    const deletedEventIndex = this.getEventIndex(id);
    events.splice(deletedEventIndex, 1);

    this.setEvents(events);
  }

  private getEventIndex(id: string): number {
    return this.eventsSubject.getValue().findIndex(event => event.id == id);
  }
}
