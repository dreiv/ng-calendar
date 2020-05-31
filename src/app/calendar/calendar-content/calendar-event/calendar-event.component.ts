import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ChangeDetectionStrategy
} from '@angular/core';
import { CalendarEvent, HOUR_SIZE } from '../../calendar';

@Component({
  selector: 'app-calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarEventComponent implements OnInit {
  @HostBinding('style.top')
  get offsetTop(): string {
    const date = this.event.startDate;
    const time = date.getHours() + date.getMinutes() / 60;

    return time * HOUR_SIZE + 'px';
  }
  @Input() event: CalendarEvent;
  constructor() {}

  ngOnInit(): void {}
}
