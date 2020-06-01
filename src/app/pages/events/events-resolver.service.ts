import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CalendarEvent } from 'src/app/calendar/calendar';
import { AppStoreService } from 'src/app/store/app-store.service';

@Injectable({
  providedIn: 'root'
})
export class EventsResolverService implements Resolve<CalendarEvent[]> {
  constructor(private store: AppStoreService) {}

  resolve(): CalendarEvent[] {
    const events = this.store.getEvents();

    return events;
  }
}
