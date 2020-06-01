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
import { validChanges } from './helpers/valid-changes';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit, OnDestroy {
  sketchEvents: CalendarEvent[];
  editForm: FormGroup;
  prepopulateTime: EventTime;
  calendarOptions: CalendarOptions;

  private sketchEvent: CalendarEvent;
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
        this.sketchEvents = events;
      });
    this.initForm();
    this.watchChanges();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }

  onSubmit(): void {
    const event = { ...this.sketchEvent };
    delete event.isSketch;

    this.store.addEvent(event);
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
      if (status == 'VALID' && validChanges(changes)) {
        this.sketchEvent = buildEvent(changes);
        this.sketchEvents = [...this.storeEvents, this.sketchEvent];

        this.calendarOptions = {
          ...this.calendarOptions,
          focusedDay: this.sketchEvent.startDate
        };
      } else {
        this.sketchEvents = this.storeEvents;
      }
    });
  }
}
