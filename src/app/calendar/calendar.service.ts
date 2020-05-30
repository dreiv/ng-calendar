import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CalendarService {
  private scrollSub: BehaviorSubject<number> = new BehaviorSubject(0);
  scroll$ = this.scrollSub.asObservable();

  constructor() {}

  updateScroll(scrollLeft: number): void {
    if (scrollLeft != this.scrollSub.getValue()) {
      this.scrollSub.next(scrollLeft);
    }
  }
}
