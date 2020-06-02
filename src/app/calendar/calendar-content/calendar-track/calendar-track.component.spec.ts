import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTrackComponent } from './calendar-track.component';

describe('CalendarTrackComponent', () => {
  let component: CalendarTrackComponent;
  let fixture: ComponentFixture<CalendarTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
