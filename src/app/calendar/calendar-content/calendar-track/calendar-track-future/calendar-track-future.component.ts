import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  HostBinding
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CalendarService } from 'src/app/calendar/services/calendar.service';
import { getDateSize } from 'src/app/calendar/shared/utils';
import { CalendarOperatingHours } from '../../../calendar';
import { inactiveCol, hourSize } from 'src/app/calendar/shared/calendar.defs';

const size = dateSize => dateSize * hourSize + 'px';

@Component({
  selector: 'app-calendar-track-future',
  templateUrl: './calendar-track-future.component.html',
  styleUrls: ['../shared/calendar-track.common.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarTrackFutureComponent implements OnInit, OnDestroy {
  private componentDestroyed$ = new Subject();
  private operatingHours: CalendarOperatingHours;

  @HostBinding('style.background')
  get background(): string {
    const start = size(getDateSize(this.operatingHours.startTime));
    const end = size(getDateSize(this.operatingHours.endTime));

    return `linear-gradient(${inactiveCol} ${start}, transparent ${start}, transparent ${end}, ${inactiveCol} ${end})`;
  }

  constructor(private calendar: CalendarService) {}

  ngOnInit(): void {
    this.calendar.options$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(({ operatingHours }) => {
        this.operatingHours = operatingHours;
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
