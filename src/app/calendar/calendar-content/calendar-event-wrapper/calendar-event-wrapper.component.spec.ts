import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventWrapperComponent } from './calendar-event-wrapper.component';

describe('CalendarEventWrapperComponent', () => {
  let component: CalendarEventWrapperComponent;
  let fixture: ComponentFixture<CalendarEventWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarEventWrapperComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEventWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
