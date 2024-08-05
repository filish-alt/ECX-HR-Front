import { TestBed } from '@angular/core/testing';

import { ConractRegstrationService } from './conract-regstration.service';

describe('ConractRegstrationService', () => {
  let service: ConractRegstrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConractRegstrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
