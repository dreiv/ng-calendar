import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-calendar-track-past',
  templateUrl: './calendar-track-past.component.html',
  styleUrls: ['../shared/calendar-track.common.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarTrackPastComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
