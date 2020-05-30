import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Injectable()
export class CalendarService {
  private scrollSub: BehaviorSubject<number> = new BehaviorSubject(0);
  scroll$ = this.scrollSub.asObservable();
  time$ = interval(1000).pipe(
    map(() => new Date()),
    share()
  );

  constructor() {}

  updateScroll(scrollLeft: number): void {
    if (scrollLeft != this.scrollSub.getValue()) {
      this.scrollSub.next(scrollLeft);
    }
  }
}
