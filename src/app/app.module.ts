import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalendarModule } from './calendar/calendar.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CalendarModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
