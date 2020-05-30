import { Component } from '@angular/core';
import { CalendarOptions } from './calendar/calendar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  calendarOptions: CalendarOptions = {
    period: 'workWeek'
  };
}
