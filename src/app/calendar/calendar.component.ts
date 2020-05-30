import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { CalendarService } from './service/calendar.service';
import { CalendarOptions } from './calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() options: CalendarOptions;

  constructor(public calendarService: CalendarService) {}

  ngOnInit(): void {
    this.calendarService.time$.subscribe(date => console.log(date));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      const current: CalendarOptions = changes.options.currentValue;

      this.calendarService.setPeriod(current.period);
    }
  }
}
