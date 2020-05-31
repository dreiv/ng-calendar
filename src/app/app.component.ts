import { Component } from '@angular/core';
import {
  CalendarOptions,
  CalendarPeriod,
  CalendarEvent
} from './calendar/calendar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectPeriods: CalendarPeriod[] = ['workWeek', 'week', 'day'];
  calendarEvents: CalendarEvent[] = [
    {
      date: new Date('May 27, 2020 15:25:00'),
      title: 'Brunch',
      description: 'meet up with Tom @Hip_House'
    }
  ];

  calendarOptions: CalendarOptions = {
    period: 'workWeek'
  };

  changePeriod(event: { target: HTMLSelectElement }): void {
    const period = event.target.value as CalendarPeriod;

    this.calendarOptions = {
      ...this.calendarOptions,
      period
    };
  }
}
