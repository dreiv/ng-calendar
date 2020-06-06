import { Component, OnInit } from '@angular/core';
import {
  CalendarOptions,
  CalendarTimeFrame,
  CalendarSelectedTimeFrame
} from 'src/app/calendar/calendar';
import { AppStoreService } from 'src/app/store/app-store.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectPeriods: CalendarTimeFrame[];
  calendarOptions: CalendarOptions;

  private componentDestroyed$ = new Subject();

  constructor(public store: AppStoreService) {
    this.selectPeriods = ['workWeek', 'week', 'day'];
    this.calendarOptions = {
      timeFrame: 'workWeek'
    };
  }

  ngOnInit(): void {
    this.store.operatingHours$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(operatingHours => {
        this.calendarOptions = {
          ...this.calendarOptions,
          operatingHours
        };
      });
  }

  changePeriod(event: { target: HTMLSelectElement }): void {
    const period = event.target.value as CalendarTimeFrame;

    this.calendarOptions = {
      ...this.calendarOptions,
      timeFrame: period
    };
  }

  goToToday(): void {
    this.calendarOptions = {
      ...this.calendarOptions,
      focusedDay: new Date()
    };
  }
}
