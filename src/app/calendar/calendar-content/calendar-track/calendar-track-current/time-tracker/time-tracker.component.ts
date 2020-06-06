import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  ElementRef,
  HostBinding,
  ViewChild,
  Input
} from '@angular/core';
import { dateToSize } from 'src/app/calendar/shared/utils';

@Component({
  selector: 'app-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeTrackerComponent implements AfterViewInit {
  @ViewChild('focusEl') focusEl: ElementRef;

  @Input()
  private time: Date;

  @HostBinding('style.top')
  get timeSize(): string {
    return dateToSize(this.time);
  }

  ngAfterViewInit(): void {
    this.focusEl.nativeElement.scrollIntoView();
  }
}
