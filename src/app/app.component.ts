import { Component } from '@angular/core';
import { CalendarOptions, CalendarPeriod } from './calendar/calendar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectPeriods: CalendarPeriod[] = ['workWeek', 'week', 'day'];

  calendarOptions: CalendarOptions = {
    period: 'workWeek'
  };

  changePeriod(event: { target: HTMLSelectElement }): void {
    const period = event.target.value as CalendarPeriod;

    this.calendarOptions = {
      period
    };
  }
}
