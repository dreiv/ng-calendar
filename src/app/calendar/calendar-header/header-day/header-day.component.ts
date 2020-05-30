import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { HeaderDay } from './header-day';

@Component({
  selector: 'app-header-day',
  templateUrl: './header-day.component.html',
  styleUrls: ['./header-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderDayComponent implements OnInit {
  @Input() day: HeaderDay;
  constructor() {}

  ngOnInit(): void {}
}
