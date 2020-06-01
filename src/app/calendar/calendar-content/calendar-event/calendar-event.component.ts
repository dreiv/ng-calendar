import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ChangeDetectionStrategy
} from '@angular/core';
import { CalendarEvent, HOUR_SIZE } from '../../calendar';

const getDateSize = date => date.getHours() + date.getMinutes() / 60;

@Component({
  selector: 'app-calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarEventComponent implements OnInit {
  @HostBinding('style.top')
  get offsetTop(): string {
    return getDateSize(this.event.startDate) * HOUR_SIZE + 'px';
  }
  @HostBinding('style.minHeight') get eventSize(): string {
    const { endDate, startDate } = this.event;
    const difference = getDateSize(endDate) - getDateSize(startDate);

    return difference * HOUR_SIZE + 'px';
  }
  @HostBinding('class.sketch') get isSketch(): boolean {
    console.log(this.event);

    return this.event.isSketch;
  }

  @Input() event: CalendarEvent;
  constructor() {}

  ngOnInit(): void {}
}
