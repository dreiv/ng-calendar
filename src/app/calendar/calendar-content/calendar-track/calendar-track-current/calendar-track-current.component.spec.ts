import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTrackCurrentComponent } from './calendar-track-current.component';

describe('CalendarTrackCurrentComponent', () => {
  let component: CalendarTrackCurrentComponent;
  let fixture: ComponentFixture<CalendarTrackCurrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarTrackCurrentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarTrackCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
