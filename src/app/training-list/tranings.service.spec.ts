import { TestBed } from '@angular/core/testing';

import { TraningsService } from './tranings.service';

describe('TraningsService', () => {
  let service: TraningsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraningsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
