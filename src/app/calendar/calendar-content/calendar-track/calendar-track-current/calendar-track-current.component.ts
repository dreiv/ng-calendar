import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  HostBinding
} from '@angular/core';
import { Subject } from 'rxjs';
import { getDateSize } from 'src/app/calendar/shared/utils';
import { HOUR_SIZE } from 'src/app/calendar/calendar';
import { CalendarService } from 'src/app/calendar/services/calendar.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-calendar-track-current',
  templateUrl: './calendar-track-current.component.html',
  styleUrls: [
    './calendar-track-current.component.scss',
    '../shared/calendar-track.common.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarTrackCurrentComponent implements OnInit, OnDestroy {
  private componentDestroyed$ = new Subject();
  private opperatingHours;

  @HostBinding('style.background')
  get background(): string {
    const start =
      getDateSize(this.opperatingHours.startTime) * HOUR_SIZE + 'px';
    const end = getDateSize(this.opperatingHours.endTime) * HOUR_SIZE + 'px';

    return `linear-gradient(#0001 ${start}, transparent ${start}, transparent ${end}, #0001 ${end})`;
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
