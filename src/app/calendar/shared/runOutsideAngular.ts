import { ɵɵdirectiveInject as directiveInject, NgZone } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

export function outsideZone<T>() {
  return (source: Observable<T>): Observable<T> => {
    return new Observable(observer => {
      let sub: Subscription;
      directiveInject(NgZone).runOutsideAngular(() => {
        sub = source.subscribe(observer);
      });

      return sub;
    });
  };
}
