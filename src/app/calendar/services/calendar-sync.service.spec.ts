import { TestBed } from '@angular/core/testing';

import { CalendarSyncService } from './calendar-sync.service';

describe('CalendarSyncService', () => {
  let service: CalendarSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
