import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarService } from '../service/calendar.service';
import { CalendarDay, CalendarEvent } from '../calendar';

@Component({
  selector: 'app-calendar-content',
  templateUrl: './calendar-content.component.html',
  styleUrls: [
    '../styles/calendar.common.scss',
    './calendar-content.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarContentComponent implements OnInit {
  constructor(public calendarService: CalendarService) {}

  ngOnInit(): void {}

  identifyDay(index: number, item: CalendarDay): Date {
    return item.date;
  }

  identifyEvent(index: number, item: CalendarEvent): Date {
    return item.startDate;
  }
}
