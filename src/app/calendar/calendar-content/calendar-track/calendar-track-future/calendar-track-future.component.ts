import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  HostBinding
} from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarService } from 'src/app/calendar/services/calendar.service';
import { takeUntil } from 'rxjs/operators';
import { getDateSize } from 'src/app/calendar/shared/utils';
import { HOUR_SIZE } from '../../../calendar';

@Component({
  selector: 'app-calendar-track-future',
  templateUrl: './calendar-track-future.component.html',
  styleUrls: ['./calendar-track-future.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarTrackFutureComponent implements OnInit, OnDestroy {
  private componentDestroyed$ = new Subject();
  private opperatingHours;

  @HostBinding('style.background')
  get background(): string {
    const start =
      getDateSize(this.opperatingHours.startTime) * HOUR_SIZE + 'px';
    const end = getDateSize(this.opperatingHours.endTime) * HOUR_SIZE + 'px';

    return `linear-gradient(to bottom, #0001 ${start}, transparent ${start}, transparent ${end}, #0001 ${end})`;
  }

  constructor(private calendar: CalendarService) {}

  ngOnInit(): void {
    this.calendar.options$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(({ opperatingHours }) => {
        this.opperatingHours = opperatingHours;
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
