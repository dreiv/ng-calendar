import { Component, OnInit } from '@angular/core';

const genTime = (min, max, period) =>
  [...Array(max - min)].map((_, index) => min + index + period)

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  time = genTime(7, 12, 'am')
    .concat(genTime(1, 6, 'pm'))

  constructor() { }

  ngOnInit(): void {
  }

}
