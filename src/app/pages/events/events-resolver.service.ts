import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CalendarEvent } from 'src/app/calendar/calendar';
import { AppStoreService } from 'src/app/store/app-store.service';

@Injectable({
  providedIn: 'root'
})
export class EventsResolverService implements Resolve<CalendarEvent> {
  constructor(private store: AppStoreService) {}

  resolve(route: ActivatedRouteSnapshot): CalendarEvent {
    const id = route.paramMap.get('id');
    const event = this.store.getEvent(id);

    return event;
  }
}
