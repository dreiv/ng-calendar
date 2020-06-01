import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarModule } from 'src/app/calendar/calendar.module';
import { EventsRoutingModule } from './events-routing.module';

import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventsComponent } from './events.component';

@NgModule({
  declarations: [EventsComponent, EventDetailComponent, EventEditComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    EventsRoutingModule,
    SharedModule,
    CalendarModule
  ]
})
export class EventsModule {}
