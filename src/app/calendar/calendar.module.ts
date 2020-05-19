import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { CalendarBodyComponent } from './calendar-body/calendar-body.component';

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarHeaderComponent,
    CalendarBodyComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CalendarComponent
  ]
})
export class CalendarModule { }
