import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

const createHours = (period, length = 13) =>
  Array.from({ length }, (_, idx) => idx + period).slice(1);

@Component({
  selector: 'app-calendar-time',
  templateUrl: './calendar-time.component.html',
  styleUrls: ['./calendar-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarTimeComponent implements OnInit {
  hours = [...createHours('am'), ...createHours('pm', 12)];

  constructor() {}

  ngOnInit(): void {}

  identify(index: number, hour: string): string {
    return hour;
  }
}
