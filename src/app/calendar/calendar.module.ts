import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CalendarTimeComponent } from './calendar-time/calendar-time.component';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { CalendarContentComponent } from './calendar-content/calendar-content.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderDayComponent } from './calendar-header/header-day/header-day.component';

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarTimeComponent,
    CalendarHeaderComponent,
    CalendarContentComponent,
    HeaderDayComponent
  ],
  imports: [CommonModule, SharedModule],
  exports: [CalendarComponent]
})
export class CalendarModule {}
