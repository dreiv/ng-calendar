import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStoreService } from 'src/app/store/app-store.service';
import { CalendarEvent } from 'src/app/calendar/calendar';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  event: CalendarEvent;

  constructor(
    private store: AppStoreService,
    public route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.event = this.route.snapshot.data[0];
  }

  deleteEvent(id: string): void {
    this.store.deleteEvent(id);
    this.router.navigate(['/']);
  }
}
