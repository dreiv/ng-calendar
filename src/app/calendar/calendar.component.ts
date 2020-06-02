import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { CalendarService } from './services/calendar.service';
import { CalendarOptions, CalendarEvent } from './calendar';
import { CalendarSyncService } from './services/calendar-sync.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input()
  options: CalendarOptions;
  @Input()
  events: CalendarEvent[];

  constructor(
    public calendar: CalendarService,
    public calendarSync: CalendarSyncService
  ) {}

  ngOnInit(): void {}

  ngOnChanges({ options, events }: SimpleChanges): void {
    if (options) {
      this.calendar.configure(options.currentValue);
    }
    if (events) {
      this.calendar.setEvents(events.currentValue);
    }
  }
}
