import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  HostBinding,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { hm, dateToSize } from 'src/app/calendar/shared/utils';
import { CalendarOperatingHours } from 'src/app/calendar/calendar';
import { CalendarService } from 'src/app/calendar/services/calendar.service';
import { CalendarSyncService } from 'src/app/calendar/services/calendar-sync.service';
import { inactiveCurrCol } from 'src/app/calendar/shared/calendar.defs';

@Component({
  selector: 'app-calendar-track-current',
  templateUrl: './calendar-track-current.component.html',
  styleUrls: [
    './calendar-track-current.component.scss',
    '../shared/calendar-track.common.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarTrackCurrentComponent
  implements OnInit, AfterViewInit, OnDestroy {
  private componentDestroyed$ = new Subject();
  private operatingHours: CalendarOperatingHours;
  time: Date;

  @ViewChild('focusEl') focusEl: ElementRef;

  @HostBinding('style.background')
  get background(): string {
    if (!this.operatingHours) {
      return;
    }

    const now = hm(this.time);
    const endTime = hm(this.operatingHours.endTime);
    if (now > endTime) {
      return inactiveCurrCol;
    }

    const startTime = hm(this.operatingHours.startTime);
    const start = dateToSize(
      now > startTime ? this.time : this.operatingHours.startTime
    );
    const end = dateToSize(this.operatingHours.endTime);

    return `linear-gradient(${inactiveCurrCol} ${start}, transparent ${start}, transparent ${end}, ${inactiveCurrCol} ${end})`;
  }

  get timeSize(): string {
    return dateToSize(this.time);
  }

  constructor(
    private calendar: CalendarService,
    private calendarSync: CalendarSyncService,
    private ref: ChangeDetectorRef
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
        this.ref.detectChanges();
      });
  }

  ngAfterViewInit(): void {
    this.focusEl.nativeElement.scrollIntoView({ block: 'center' });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
