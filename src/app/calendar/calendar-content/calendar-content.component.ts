import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarService } from '../services/calendar.service';
import { CalendarDay, CalendarEvent } from '../calendar';

@Component({
  selector: 'app-calendar-content',
  templateUrl: './calendar-content.component.html',
  styleUrls: [
    '../shared/calendar.common.scss',
    './calendar-content.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarContentComponent implements OnInit {
  constructor(public calendar: CalendarService) {}

  ngOnInit(): void {}

  identifyDay(index: number, item: CalendarDay): Date {
    return item.date;
  }

  identifyEvent(index: number, item: CalendarEvent): string {
    return item.id;
  }
}
