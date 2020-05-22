import { Component, OnInit } from '@angular/core';

const generateHours = period =>
  Array.from({ length: 13 }, (_, k) => k + period).slice(1);

@Component({
  selector: 'app-calendar-time',
  templateUrl: './calendar-time.component.html',
  styleUrls: ['./calendar-time.component.scss']
})
export class CalendarTimeComponent implements OnInit {
  hours = [
    ...generateHours('am'),
    ...generateHours('pm')
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
