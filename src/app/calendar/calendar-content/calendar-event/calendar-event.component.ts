import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { CalendarEvent } from '../../calendar';

@Component({
  selector: 'app-calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarEventComponent implements AfterViewInit {
  @HostBinding('class.sketch') get isSketch(): boolean {
    return this.event.isSketch;
  }

  @Input() event: CalendarEvent;
  @Input() isControlled: boolean;

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit(): void {
    if (this.event.isSketch) {
      this.elRef.nativeElement.scrollIntoView({ block: 'center' });
    }
  }
}
