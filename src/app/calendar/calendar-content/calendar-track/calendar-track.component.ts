import { Component, OnInit, Input } from '@angular/core';
import { CalendarDay } from '../../calendar';

@Component({
  selector: 'app-calendar-track',
  template: '<ng-content></ng-content>',
  styleUrls: ['./calendar-track.component.scss']
})
export class CalendarTrackComponent implements OnInit {
  @Input() day: CalendarDay;

  constructor() {}

  ngOnInit(): void {}
}
