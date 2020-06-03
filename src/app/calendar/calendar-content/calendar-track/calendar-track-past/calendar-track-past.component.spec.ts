import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTrackPastComponent } from './calendar-track-past.component';

describe('CalendarTrackPastComponent', () => {
  let component: CalendarTrackPastComponent;
  let fixture: ComponentFixture<CalendarTrackPastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarTrackPastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarTrackPastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
