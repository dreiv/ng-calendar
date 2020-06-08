import {
  Component,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CalendarService } from '../services/calendar.service';
import { CalendarDay } from '../calendar';
import { CalendarSyncService } from '../services/calendar-sync.service';
import { outsideZone } from '../shared/runOutsideAngular';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: [
    '../shared/calendar.common.scss',
    './calendar-header.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarHeaderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('scrollSync')
  scrollSync: ElementRef;

  private componentDestroyed$ = new Subject();

  constructor(
    public calendar: CalendarService,
    private calendarSync: CalendarSyncService
  ) {}

  ngAfterViewInit(): void {
    this.calendarSync.scrollSync$
      .pipe(takeUntil(this.componentDestroyed$), outsideZone())
      .subscribe(left => {
        this.scrollSync.nativeElement.scrollLeft = left;
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }

  identify(index: number, day: CalendarDay): Date {
    return day.date;
  }
}
