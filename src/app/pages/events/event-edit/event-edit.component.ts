import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppStoreService } from 'src/app/store/app-store.service';
import { CalendarEvent } from 'src/app/calendar/calendar';
import { prepopulateEventTime } from './prepopulateEventTime';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit, OnDestroy {
  tempEvents: CalendarEvent[];
  editForm: FormGroup;

  private componentDestroyed$ = new Subject();

  constructor(public store: AppStoreService) {}

  ngOnInit(): void {
    this.store.events$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(events => {
        this.tempEvents = [...events];
      });

    const { date, startTime, endTime } = prepopulateEventTime();
    this.editForm = new FormGroup({
      title: new FormControl(null),
      date: new FormControl(date),
      startTime: new FormControl(startTime),
      endtime: new FormControl(endTime)
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }

  onSubmit() {
    console.log(this.editForm);
  }
}
