import { Component } from '@angular/core';
import { CalendarOptions, CalendarPeriod } from 'src/app/calendar/calendar';
import { AppStoreService } from 'src/app/store/app-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  selectPeriods: CalendarPeriod[];
  calendarOptions: CalendarOptions;

  constructor(public store: AppStoreService) {
    this.selectPeriods = ['workWeek', 'week', 'day'];
    this.calendarOptions = {
      period: 'workWeek'
    };
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
