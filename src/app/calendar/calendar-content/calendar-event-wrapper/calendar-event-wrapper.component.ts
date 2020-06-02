import { Component, HostBinding, Input } from '@angular/core';
import { getDateSize } from '../../shared/utils';
import { HOUR_SIZE, CalendarEvent } from '../../calendar';

@Component({
  selector: 'app-calendar-event-wrapper',
  template: '<ng-content></ng-content>',
  styleUrls: ['./calendar-event-wrapper.component.scss']
})
export class CalendarEventWrapperComponent {
  @HostBinding('style.top')
  get offsetTop(): string {
    return getDateSize(this.event.startDate) * HOUR_SIZE + 'px';
  }
  @HostBinding('style.minHeight') get eventSize(): string {
    const { endDate, startDate } = this.event;
    const difference = getDateSize(endDate) - getDateSize(startDate);

    return difference * HOUR_SIZE + 'px';
  }

  @Input() event: CalendarEvent;
}
