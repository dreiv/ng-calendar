import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarSyncService {
  private scrollSyncSubject: BehaviorSubject<number>;

  scrollSync$: Observable<number>;
  time$: Observable<Date>;

  constructor() {
    this.scrollSyncSubject = new BehaviorSubject(0);

    this.scrollSync$ = this.scrollSyncSubject.asObservable();
    this.time$ = interval(1000).pipe(
      map(() => new Date()),
      share()
    );
  }

  updateScroll(scrollLeft: number): void {
    if (scrollLeft != this.scrollSyncSubject.getValue()) {
      this.scrollSyncSubject.next(scrollLeft);
    }
  }
}
