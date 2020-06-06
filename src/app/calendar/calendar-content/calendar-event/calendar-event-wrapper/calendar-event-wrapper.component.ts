import {
  Component,
  HostBinding,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { getDateSize, dateToSize, numToSize } from '../../../shared/utils';
import { CalendarEvent } from '../../../calendar';

@Component({
  selector: 'app-calendar-event-wrapper',
  template: '<ng-content></ng-content>',
  styleUrls: ['./calendar-event-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarEventWrapperComponent {
  @HostBinding('style.top')
  get offsetTop(): string {
    return dateToSize(this.event.startTime);
  }
  @HostBinding('style.minHeight') get eventSize(): string {
    const { endTime, startTime: startTime } = this.event;
    const difference = getDateSize(endTime) - getDateSize(startTime);

    return numToSize(difference);
  }
  @HostBinding('style.width') get eventWidth(): string {
    return `${this.getEventSize()}%`;
  }

  @HostBinding('style.left') get eventOffset(): string {
    return `${this.overlappingIndex * this.getEventSize()}%`;
  }

  @Input() event: CalendarEvent;
  @Input() overlappingCount;
  @Input() overlappingIndex;

  private getEventSize() {
    return Math.floor(100 / this.overlappingCount);
  }
}
