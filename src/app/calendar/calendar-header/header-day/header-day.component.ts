import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  HostBinding
} from '@angular/core';
import { CalendarTense } from '../../calendar';

@Component({
  selector: 'app-header-day',
  templateUrl: './header-day.component.html',
  styleUrls: ['./header-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderDayComponent implements OnInit {
  @HostBinding('class')
  @Input()
  tense: CalendarTense;
  @Input()
  date: Date;

  constructor() {}

  ngOnInit(): void {}
}
