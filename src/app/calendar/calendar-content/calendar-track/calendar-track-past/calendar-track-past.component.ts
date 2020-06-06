import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-calendar-track-past',
  template: '<ng-content></ng-content>',
  styleUrls: [
    'calendar-track-past.component.scss',
    '../shared/calendar-track.common.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarTrackPastComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
