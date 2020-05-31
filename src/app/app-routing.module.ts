import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EventsComponent } from './pages/events/events.component';
import { EventEditComponent } from './pages/events/event-edit/event-edit.component';
import { EventDetailComponent } from './pages/events/event-detail/event-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'events',
    component: EventsComponent,
    children: [
      { path: 'new', component: EventEditComponent },
      { path: ':id', component: EventDetailComponent },
      { path: ':id/edit', component: EventEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
