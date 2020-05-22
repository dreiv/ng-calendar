import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTimeComponent } from './calendar-time.component';

describe('CalendarTimeComponent', () => {
  let component: CalendarTimeComponent;
  let fixture: ComponentFixture<CalendarTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
