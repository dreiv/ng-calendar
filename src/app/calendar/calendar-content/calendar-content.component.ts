import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

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
  constructor() {}

  ngOnInit(): void {}
}
