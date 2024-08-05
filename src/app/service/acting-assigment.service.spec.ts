import { TestBed } from '@angular/core/testing';

import { ActingAssigmentService } from './acting-assigment.service';

describe('ActingAssigmentService', () => {
  let service: ActingAssigmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActingAssigmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
