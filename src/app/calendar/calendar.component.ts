import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarService } from './calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {
  constructor(public calendarService: CalendarService) {}

  ngOnInit(): void {}
}
