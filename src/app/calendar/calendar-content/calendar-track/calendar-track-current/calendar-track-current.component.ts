import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  HostBinding
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { hm, dateToSize } from 'src/app/calendar/shared/utils';
import { CalendarOperatingHours } from 'src/app/calendar/calendar';
import { CalendarService } from 'src/app/calendar/services/calendar.service';
import { CalendarSyncService } from 'src/app/calendar/services/calendar-sync.service';
import { inactiveCol } from 'src/app/calendar/shared/calendar.defs';

@Component({
  selector: 'app-calendar-track-current',
  templateUrl: './calendar-track-current.component.html',
  styleUrls: ['../shared/calendar-track.common.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarTrackCurrentComponent implements OnInit, OnDestroy {
  private componentDestroyed$ = new Subject();
  private operatingHours: CalendarOperatingHours;
  time: Date;

  @HostBinding('style.background')
  get background(): string {
    if (!this.operatingHours) {
      return;
    }

    const now = hm(this.time);
    const endTime = hm(this.operatingHours.endTime);
    if (now > endTime) {
      return inactiveCol;
    }

    const startTime = hm(this.operatingHours.startTime);
    const start = dateToSize(
      now > startTime ? this.time : this.operatingHours.startTime
    );
    const end = dateToSize(this.operatingHours.endTime);

    return `linear-gradient(${inactiveCol} ${start}, transparent ${start}, transparent ${end}, ${inactiveCol} ${end})`;
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
      .subscribe(({ operatingHours }) => {
        this.operatingHours = operatingHours;
      });

    this.calendarSync.minute$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(time => {
        this.time = time;
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
