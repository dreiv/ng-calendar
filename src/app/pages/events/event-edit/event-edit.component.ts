import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppStoreService } from 'src/app/store/app-store.service';
import { CalendarEvent, CalendarOptions } from 'src/app/calendar/calendar';
import {
  prepopulateEventTime,
  EventTime
} from './helpers/prepopulate-event-time';
import { timeValidator } from './helpers/time-validator';
import { buildEvent } from './helpers/build-event';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit, OnDestroy {
  tempEvents: CalendarEvent[];
  editForm: FormGroup;
  prepopulateTime: EventTime;
  calendarOptions: CalendarOptions;

  private storeEvents: CalendarEvent[];
  private componentDestroyed$ = new Subject();

  constructor(public store: AppStoreService) {
    this.prepopulateTime = prepopulateEventTime();
    this.calendarOptions = { period: 'day', controlled: true };
  }

  ngOnInit(): void {
    this.store.events$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(events => {
        this.storeEvents = events;
        this.tempEvents = events;
      });
    this.initForm();
    this.watchChanges();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }

  onSubmit() {
    console.log(this.editForm);
    this.editForm.reset();
  }

  private initForm(): void {
    const { date, startTime, endTime } = this.prepopulateTime;
    this.editForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      date: new FormControl(date, Validators.required),
      time: new FormGroup(
        {
          start: new FormControl(startTime, Validators.required),
          end: new FormControl(endTime, Validators.required)
        },
        timeValidator
      )
    });
  }

  private watchChanges(): void {
    combineLatest(
      this.editForm.valueChanges,
      this.editForm.statusChanges
    ).subscribe(([changes, status]) => {
      if (status == 'VALID') {
        const tempEvent = buildEvent(changes);
        this.tempEvents = [...this.storeEvents, tempEvent];
        this.calendarOptions = {
          ...this.calendarOptions,
          focusedDay: tempEvent.startDate
        };
      } else {
        this.tempEvents = this.storeEvents;
      }
    });
  }
}
