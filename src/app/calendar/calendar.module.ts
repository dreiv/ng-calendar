import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CalendarTimeComponent } from './calendar-time/calendar-time.component';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';

@NgModule({
  declarations: [CalendarComponent, CalendarTimeComponent, CalendarHeaderComponent],
  imports: [CommonModule],
  exports: [CalendarComponent]
})
export class CalendarModule {}
