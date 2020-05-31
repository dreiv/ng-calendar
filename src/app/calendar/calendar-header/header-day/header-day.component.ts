import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-header-day',
  templateUrl: './header-day.component.html',
  styleUrls: ['./header-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderDayComponent implements OnInit {
  @Input() date: Date;
  constructor() {}

  ngOnInit(): void {}
}
