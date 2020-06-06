import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTrackFutureComponent } from './calendar-track-future.component';

describe('CalendarTrackFutureComponent', () => {
  let component: CalendarTrackFutureComponent;
  let fixture: ComponentFixture<CalendarTrackFutureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarTrackFutureComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarTrackFutureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
