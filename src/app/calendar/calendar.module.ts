import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { RouterModule } from '@angular/router';

import { CalendarTimeComponent } from './calendar-time/calendar-time.component';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { CalendarContentComponent } from './calendar-content/calendar-content.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderDayComponent } from './calendar-header/header-day/header-day.component';
import { CalendarService } from './service/calendar.service';
import { CalendarEventComponent } from './calendar-content/calendar-event/calendar-event.component';

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarTimeComponent,
    CalendarHeaderComponent,
    CalendarContentComponent,
    HeaderDayComponent,
    CalendarEventComponent
  ],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [CalendarComponent],
  providers: [CalendarService]
})
export class CalendarModule {}
