import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

const createHours = period =>
  Array.from({ length: 13 }, (_, k) => k + period).slice(1);

@Component({
  selector: 'app-calendar-time',
  templateUrl: './calendar-time.component.html',
  styleUrls: ['./calendar-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarTimeComponent implements OnInit {
  hours = [...createHours('am'), ...createHours('pm')];

  constructor() {}

  ngOnInit(): void {}
}
