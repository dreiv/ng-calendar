import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { CalendarDay } from '../../calendar';

@Component({
  selector: 'app-calendar-track',
  templateUrl: './calendar-track.component.html',
  styleUrls: ['./calendar-track.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarTrackComponent implements OnInit {
  @Input() day: CalendarDay;

  constructor() {}

  ngOnInit(): void {}
}
