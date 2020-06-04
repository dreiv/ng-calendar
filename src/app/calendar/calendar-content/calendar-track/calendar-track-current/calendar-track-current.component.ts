import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  HostBinding
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { getDateSize, hm } from 'src/app/calendar/shared/utils';
import { HOUR_SIZE, CalendarOpperatingHours } from 'src/app/calendar/calendar';
import { CalendarService } from 'src/app/calendar/services/calendar.service';
import { CalendarSyncService } from 'src/app/calendar/services/calendar-sync.service';

const inactive_col = '#0001';
const size = date => getDateSize(date) * HOUR_SIZE + 'px';

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
    const now = hm(this.time);
    const end = hm(this.opperatingHours.endTime);
    if (now > end) {
      return inactive_col;
    }

    const start = hm(this.opperatingHours.startTime);
    const startSize = size(
      now > start ? this.time : this.opperatingHours.startTime
    );
    const endSize = size(this.opperatingHours.endTime);

    return `linear-gradient(${inactive_col} ${startSize}, transparent ${startSize}, transparent ${endSize}, ${inactive_col} ${endSize})`;
  }

  get timeSize(): string {
    return size(this.time);
  }

  constructor(
    private calendar: CalendarService,
    private calendarSync: CalendarSyncService
  ) {
    this.time = new Date();
  }

  ngOnInit(): void {
    this.calendar.options$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(({ opperatingHours }) => {
        this.opperatingHours = opperatingHours;
      });

    this.calendarSync.time$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(time => {
        console.log('tick');
        const hours = time.getHours();
        time.setHours(hours - 4);
        this.time = time;
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
