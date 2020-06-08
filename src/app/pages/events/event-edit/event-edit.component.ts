import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppStoreService } from 'src/app/store/app-store.service';
import {
  CalendarEvent,
  CalendarOptions,
  CalendarRecurrenceFrequency
} from 'src/app/calendar/calendar';
import { proposeEvent } from './helpers/propose-event';
import { datetimeValidator } from './helpers/datetime-validator';
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
  selectRecurrenceFrequency: CalendarRecurrenceFrequency[];

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
    this.selectRecurrenceFrequency = ['week', 'day'];
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
    const { subject, description, startTime, endTime, recurrence } = this.event;
    const isrecurrenceEnabled = recurrence?.interval >= 0;
    this.event.isSketch = true;

    this.editForm = new FormGroup({
      subject: new FormControl(subject, Validators.required),
      description: new FormControl(description),
      datetime: new FormGroup(
        {
          date: new FormControl(ymd(startTime), Validators.required),
          start: new FormControl(hm(startTime), Validators.required),
          end: new FormControl(hm(endTime), Validators.required)
        },
        datetimeValidator
      ),
      recurrence: new FormGroup({
        interval: new FormControl(recurrence?.interval || 0),
        frequency: new FormControl({
          value: recurrence?.frequency || 'week',
          disabled: !isrecurrenceEnabled
        }),
        endDate: new FormControl({
          value: ymd(recurrence?.endDate),
          disabled: !isrecurrenceEnabled
        })
      })
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

    this.editForm
      .get('recurrence.interval')
      .valueChanges.subscribe(interval => {
        const frequency = this.editForm.get('recurrence.frequency');
        const endDate = this.editForm.get('recurrence.endDate');

        if (interval <= 0) {
          frequency.disable();
          endDate.disable();
        } else {
          frequency.enable();
          endDate.enable();
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
