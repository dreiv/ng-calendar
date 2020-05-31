import { Component } from '@angular/core';
import { CalendarOptions, CalendarPeriod } from 'src/app/calendar/calendar';
import { AppStoreService } from 'src/app/store/app-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  selectPeriods: CalendarPeriod[] = ['workWeek', 'week', 'day'];
  calendarOptions: CalendarOptions = {
    period: 'workWeek'
  };

  constructor(public store: AppStoreService) {}

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
