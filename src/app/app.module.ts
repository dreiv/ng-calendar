import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalendarModule } from './calendar/calendar.module';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [BrowserModule, CalendarModule, SharedModule, AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
