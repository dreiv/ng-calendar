import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { RouterModule } from '@angular/router';

import { CalendarTimeComponent } from './calendar-time/calendar-time.component';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { HeaderDayComponent } from './calendar-header/header-day/header-day.component';
import { CalendarContentComponent } from './calendar-content/calendar-content.component';
import { CalendarEventComponent } from './calendar-content/calendar-event/calendar-event.component';
import { CalendarEventWrapperComponent } from './calendar-content/calendar-event/calendar-event-wrapper/calendar-event-wrapper.component';
import { CalendarTrackComponent } from './calendar-content/calendar-track/calendar-track.component';
import { CalendarTrackPastComponent } from './calendar-content/calendar-track/calendar-track-past/calendar-track-past.component';
import { CalendarTrackCurrentComponent } from './calendar-content/calendar-track/calendar-track-current/calendar-track-current.component';
import { CalendarTrackFutureComponent } from './calendar-content/calendar-track/calendar-track-future/calendar-track-future.component';
import { SharedModule } from '../shared/shared.module';
import { CalendarService } from './services/calendar.service';

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarTimeComponent,
    CalendarHeaderComponent,
    CalendarContentComponent,
    HeaderDayComponent,
    CalendarEventComponent,
    CalendarEventWrapperComponent,
    CalendarTrackComponent,
    CalendarTrackPastComponent,
    CalendarTrackCurrentComponent,
    CalendarTrackFutureComponent
  ],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [CalendarComponent],
  providers: [CalendarService]
})
export class CalendarModule {}
