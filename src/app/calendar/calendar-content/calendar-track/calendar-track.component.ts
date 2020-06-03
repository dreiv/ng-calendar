import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { CalendarDay } from '../../calendar';
import { CalendarService } from '../../services/calendar.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-calendar-track',
  template: '<ng-content></ng-content>',
  styleUrls: ['./calendar-track.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarTrackComponent implements OnInit, OnDestroy {
  private componentDestroyed$ = new Subject();
  private opperatingHours;

  @Input() day: CalendarDay;

  constructor(private calendar: CalendarService) {}

  ngOnInit(): void {
    this.calendar.options$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(({ opperatingHours }) => {
        this.opperatingHours = opperatingHours;
      });

    console.log(this.day);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
