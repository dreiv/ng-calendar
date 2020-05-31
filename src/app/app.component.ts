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
      startDate: new Date('May 27, 2020 13:25:00'),
      endDate: new Date('May 27, 2020 15:00:00'),
      title: 'Brunch'
    },
    {
      startDate: new Date('May 25, 2020 8:30:00'),
      endDate: new Date('May 25, 2020 9:30:00'),
      title: 'Doctor'
    },
    {
      startDate: new Date('May 25, 2020 18:20:00'),
      endDate: new Date('May 25, 2020 19:30:00'),
      title: 'Dentist'
    },
    {
      startDate: new Date('May 28, 2020 19:30:00'),
      endDate: new Date('May 28, 2020 23:30:00'),
      title: 'Swimming'
    },
    {
      startDate: new Date('May 29, 2020 9:00:00'),
      endDate: new Date('May 29, 2020 10:00:00'),
      title: 'Gym'
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

  goToToday(): void {
    this.calendarOptions = {
      ...this.calendarOptions,
      focusedDay: new Date()
    };
  }
}
