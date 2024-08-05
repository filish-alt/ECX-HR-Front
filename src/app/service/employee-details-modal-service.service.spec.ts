import { TestBed } from '@angular/core/testing';

import { EmployeeDetailsModalServiceService } from './employee-details-modal-service.service';

describe('EmployeeDetailsModalServiceService', () => {
  let service: EmployeeDetailsModalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeDetailsModalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
