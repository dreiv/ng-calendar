import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { CalendarEvent, HOUR_SIZE } from '../../calendar';

const getDateSize = date => date.getHours() + date.getMinutes() / 60;

@Component({
  selector: 'app-calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarEventComponent implements AfterViewInit {
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
    return this.event.isSketch;
  }

  @Input() event: CalendarEvent;
  @Input() isControlled: boolean;

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit(): void {
    if (this.event.isSketch) {
      this.elRef.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
