import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventsComponent } from './events.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventsResolverService } from './events-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
    children: [
      { path: 'new', component: EventEditComponent },
      {
        path: ':id',
        component: EventDetailComponent,
        resolve: [EventsResolverService]
      },
      {
        path: ':id/edit',
        component: EventEditComponent,
        resolve: [EventsResolverService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {}
