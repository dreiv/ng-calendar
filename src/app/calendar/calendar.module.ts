import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CalendarTimeComponent } from './calendar-time/calendar-time.component';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { CalendarContentComponent } from './calendar-content/calendar-content.component';

@NgModule({
  declarations: [CalendarComponent, CalendarTimeComponent, CalendarHeaderComponent, CalendarContentComponent],
  imports: [CommonModule],
  exports: [CalendarComponent]
})
export class CalendarModule {}
