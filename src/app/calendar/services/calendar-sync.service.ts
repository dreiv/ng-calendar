import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarSyncService {
  private scrollSyncSubject: BehaviorSubject<number>;

  scrollSync$: Observable<number>;
  minute$: Observable<Date>;

  constructor() {
    this.scrollSyncSubject = new BehaviorSubject(0);

    this.scrollSync$ = this.scrollSyncSubject.asObservable();
    this.minute$ = timer((60 - new Date().getSeconds()) * 1000, 60000).pipe(
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
