import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppStoreService } from 'src/app/store/app-store.service';
import { CalendarEvent, CalendarOptions } from 'src/app/calendar/calendar';
import {
  prePopulateEventTime,
  EventTime
} from './helpers/pre-populate-event-time';
import { timeValidator } from './helpers/time-validator';
import { buildEvent } from './helpers/build-event';
import { validChanges } from './helpers/valid-changes';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit, OnDestroy {
  sketchEvents: CalendarEvent[];
  editForm: FormGroup;
  prePopulateTime: EventTime;
  calendarOptions: CalendarOptions;
  event: CalendarEvent;

  private sketchEvent: CalendarEvent;
  private storeEvents: CalendarEvent[];
  private componentDestroyed$ = new Subject();

  constructor(public store: AppStoreService, private route: ActivatedRoute) {
    this.calendarOptions = { timeFrame: 'day', isControlled: true };
  }

  ngOnInit(): void {
    this.event = this.route.snapshot.data[0];
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
    const event = {
      ...this.sketchEvent,
      ...(this.event?.id && { id: this.event.id })
    };
    delete event.isSketch;

    this.store.addEvent(event);
    this.editForm.reset();
  }

  private initForm(): void {
    const { date, startTime, endTime } = prePopulateEventTime(
      this.event?.startTime
    );

    if (this.event) {
      this.calendarOptions = {
        ...this.calendarOptions,
        focusedDay: this.event.startTime
      };
    }

    this.editForm = new FormGroup({
      subject: new FormControl(this.event?.subject, Validators.required),
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
    combineLatest([this.editForm.valueChanges, this.editForm.statusChanges])
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(([changes, status]) => {
        if (status === 'VALID' && validChanges(changes)) {
          this.sketchEvent = buildEvent(changes);
          this.sketchEvents = [...this.storeEvents, this.sketchEvent];

          this.calendarOptions = {
            ...this.calendarOptions,
            focusedDay: this.sketchEvent.startTime
          };
        } else {
          this.sketchEvents = this.storeEvents;
        }
      });
  }
}
