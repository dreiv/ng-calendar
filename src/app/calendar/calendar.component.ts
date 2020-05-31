import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { CalendarService } from './service/calendar.service';
import { CalendarOptions, CalendarEvent } from './calendar';

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

  constructor(public calendarService: CalendarService) {}

  ngOnInit(): void {
    // this.calendarService.time$.subscribe(date => console.log(date));
  }

  ngOnChanges({ options, events }: SimpleChanges): void {
    if (options) {
      this.calendarService.configure(options.currentValue);
    }
    if (events) {
      // this.calendarService.setEvents(events.currentValue);
    }
  }
}
