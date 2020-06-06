import {
  Component,
  HostBinding,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { getDateSize } from '../../../shared/utils';
import { HOUR_SIZE, CalendarEvent } from '../../../calendar';

@Component({
  selector: 'app-calendar-event-wrapper',
  template: '<ng-content></ng-content>',
  styleUrls: ['./calendar-event-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarEventWrapperComponent {
  @HostBinding('style.top')
  get offsetTop(): string {
    return getDateSize(this.event.startTime) * HOUR_SIZE + 'px';
  }
  @HostBinding('style.minHeight') get eventSize(): string {
    const { endTime, startTime: startTime } = this.event;
    const difference = getDateSize(endTime) - getDateSize(startTime);

    return difference * HOUR_SIZE + 'px';
  }
  @HostBinding('style.width') get eventWidth(): string {
    return `${Math.floor(100 / this.overlappingCount)}%`;
  }

  @HostBinding('style.left') get eventOffset(): string {
    return `${this.overlappingIndex *
      Math.floor(100 / this.overlappingCount)}%`;
  }

  @Input() event: CalendarEvent;
  @Input() overlappingCount;
  @Input() overlappingIndex;
}
