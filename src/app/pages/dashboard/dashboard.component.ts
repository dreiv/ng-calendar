import { Component, OnInit } from '@angular/core';
import { CalendarOptions, CalendarPeriod } from 'src/app/calendar/calendar';
import { AppStoreService } from 'src/app/store/app-store.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectPeriods: CalendarPeriod[];
  calendarOptions: CalendarOptions;

  private componentDestroyed$ = new Subject();

  constructor(public store: AppStoreService) {
    this.selectPeriods = ['workWeek', 'week', 'day'];
    this.calendarOptions = {
      period: 'workWeek'
    };
  }

  ngOnInit(): void {
    this.store.opperatingHours$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(opperatingHours => {
        this.calendarOptions = {
          ...this.calendarOptions,
          opperatingHours
        };
      });
  }

  changePeriod(event: { target: HTMLSelectElement }): void {
    const period = event.target.value as CalendarPeriod;

    this.calendarOptions = {
      ...this.calendarOptions,
      period
    };
  }

  goToToday(): void {
    this.calendarOptions = {
      ...this.calendarOptions,
      focusedDay: new Date()
    };
  }
}
