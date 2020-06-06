import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CalendarService } from './services/calendar.service';
import {
  CalendarOptions,
  CalendarEvent,
  CalendarSelectedTimeFrame
} from './calendar';
import { CalendarSyncService } from './services/calendar-sync.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit, OnChanges, OnDestroy {
  private componentDestroyed$ = new Subject();

  @Input()
  options: CalendarOptions;
  @Input()
  events: CalendarEvent[];

  @Output()
  selectedTimeFrame$: EventEmitter<CalendarSelectedTimeFrame>;

  constructor(
    public calendar: CalendarService,
    public calendarSync: CalendarSyncService
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
