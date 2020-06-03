import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  HostBinding
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { getDateSize } from 'src/app/calendar/shared/utils';
import { HOUR_SIZE, CalendarOpperatingHours } from 'src/app/calendar/calendar';
import { CalendarService } from 'src/app/calendar/services/calendar.service';
import { CalendarSyncService } from 'src/app/calendar/services/calendar-sync.service';

const inactive_col = '#0001';
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
  private opperatingHours: CalendarOpperatingHours;
  private time: Date;

  @HostBinding('style.background')
  get background(): string {
    if (
      !this.time ||
      this.time.getTime() > this.opperatingHours.endTime.getTime()
    ) {
      return inactive_col;
    }
    const start = getDateSize(this.getStart()) * HOUR_SIZE + 'px';
    const end = getDateSize(this.opperatingHours.endTime) * HOUR_SIZE + 'px';

    return `linear-gradient(${inactive_col} ${start}, transparent ${start}, transparent ${end}, ${inactive_col} ${end})`;
  }

  get timeLocation(): string {
    return getDateSize(this.time) * HOUR_SIZE + 'px';
  }

  constructor(
    private calendar: CalendarService,
    private calendarSync: CalendarSyncService
  ) {}

  ngOnInit(): void {
    this.calendar.options$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(({ opperatingHours }) => {
        this.opperatingHours = opperatingHours;
      });
    this.calendarSync.time$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(time => {
        this.time = time;
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }

  private getStart(): Date {
    if (this.time.getTime() > this.opperatingHours.startTime.getTime()) {
      return this.time;
    }
    return this.opperatingHours.startTime;
  }
}
