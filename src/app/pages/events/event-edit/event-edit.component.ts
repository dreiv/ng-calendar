import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppStoreService } from 'src/app/store/app-store.service';
import { CalendarEvent, CalendarOptions } from 'src/app/calendar/calendar';
import { proposeEvent } from './helpers/propose-event';
import { timeValidator } from './helpers/time-validator';
import { getEvent } from './helpers/get-event';
import { validChanges } from './helpers/valid-changes';
import { ActivatedRoute, Router } from '@angular/router';
import { ymd, hm } from 'src/app/calendar/shared/utils';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit, OnDestroy {
  isEditMode = false;
  editForm: FormGroup;
  events: CalendarEvent[];
  event: CalendarEvent;
  calendarOptions: CalendarOptions;

  get viewEvents(): CalendarEvent[] {
    return [...this.events, this.event];
  }

  get editText(): string {
    return `${this.isEditMode ? 'Edit' : 'Create'} Event`;
  }

  private componentDestroyed$ = new Subject();

  constructor(
    public store: AppStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.calendarOptions = { timeFrame: 'day', isControlled: true };
  }

  ngOnInit(): void {
    combineLatest([
      this.route.data,
      this.store.events$,
      this.store.operatingHours$
    ])
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(([data, events, hours]) => {
        this.calendarOptions.operatingHours = hours;
        if (data[0]) {
          this.event = { ...data[0] };
          this.updateDate();
        }
        this.isEditMode = !!this.event;

        this.events = this.isEditMode
          ? events.filter(({ id }) => id !== this.event.id)
          : events;
      });

    this.initForm();
    this.watchChanges();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }

  onSubmit(): void {
    const event = getEvent(this.event, this.editForm.value);
    delete event.isSketch;
    this.editForm.reset();

    if (this.isEditMode) {
      this.store.updateEvent(this.event.id, event);
    } else {
      this.store.addEvent(event);
    }
    this.onCancel();
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  private initForm(): void {
    if (!this.isEditMode) {
      this.event = proposeEvent();
    }
    const { subject, startTime, endTime } = this.event;
    this.event.isSketch = true;

    this.editForm = new FormGroup({
      subject: new FormControl(subject, Validators.required),
      date: new FormControl(ymd(startTime)),
      time: new FormGroup(
        {
          start: new FormControl(hm(startTime), Validators.required),
          end: new FormControl(hm(endTime), Validators.required)
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
          this.event = getEvent(this.event, changes);
          this.updateDate();
        }
      });
  }

  private updateDate(): void {
    this.calendarOptions = {
      ...this.calendarOptions,
      focusedDay: this.event.startTime
    };
  }
}
