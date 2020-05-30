import {
  Component,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { CalendarService } from '../calendar.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: [
    '../styles/calendar.common.scss',
    './calendar-header.component.scss'
  ]
})
export class CalendarHeaderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('scroll') scroll: ElementRef;
  private componentDestroyed$ = new Subject();

  constructor(private calendarService: CalendarService) {}

  ngAfterViewInit(): void {
    this.calendarService.scroll$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(left => {
        this.scroll.nativeElement.scrollLeft = left;
      });
  }

  ngOnDestroy(): void {}
}
