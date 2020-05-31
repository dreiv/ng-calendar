import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalendarModule } from './calendar/calendar.module';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { EventsComponent } from './pages/events/events.component';
import { EventEditComponent } from './pages/events/event-edit/event-edit.component';
import { EventDetailComponent } from './pages/events/event-detail/event-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EventsComponent,
    EventEditComponent,
    EventDetailComponent
  ],
  imports: [BrowserModule, CalendarModule, SharedModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
