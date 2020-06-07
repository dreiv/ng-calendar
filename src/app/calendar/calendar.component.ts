import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
  OnDestroy,
  NgZone,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, distinctUntilChanged, map } from 'rxjs/operators';

import { CalendarService } from './services/calendar.service';
import {
  CalendarOptions,
  CalendarEvent,
  CalendarSelectedTimeFrame
} from './calendar';
import { CalendarSyncService } from './services/calendar-sync.service';
import { outsideZone } from './shared/runOutsdieAngular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  private componentDestroyed$ = new Subject();

  @Input()
  options: CalendarOptions;
  @Input()
  events: CalendarEvent[];

  @Output()
  selectedTimeFrame$: EventEmitter<CalendarSelectedTimeFrame>;
  @ViewChild('scrollSpy')
  scrollSpy;

  constructor(
    public calendar: CalendarService,
    public calendarSync: CalendarSyncService,
    private zone: NgZone
  ) {
    this.selectedTimeFrame$ = new EventEmitter<CalendarSelectedTimeFrame>();
  }

  ngOnInit(): void {
    this.calendar.selectedTimeFrame$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(selectedTimeFrame =>
        this.selectedTimeFrame$.emit(selectedTimeFrame)
      );
  }

  ngAfterViewInit(): void {
    fromEvent(this.scrollSpy.nativeElement, 'scroll')
      .pipe(
        takeUntil(this.componentDestroyed$),
        outsideZone(),
        map(({ target: { scrollLeft } }) => scrollLeft),
        distinctUntilChanged()
      )
      .subscribe(scrollLeft => {
        this.calendarSync.updateScroll(scrollLeft);
      });
  }

  ngOnChanges({ options, events }: SimpleChanges): void {
    if (options) {
      this.calendar.configure(options.currentValue);
    }
    if (events) {
      this.calendar.setEvents(events.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
