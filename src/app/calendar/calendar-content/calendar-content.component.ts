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

  identify(index: number, item: CalendarDay | CalendarEvent): Date {
    return item.date;
  }
}
