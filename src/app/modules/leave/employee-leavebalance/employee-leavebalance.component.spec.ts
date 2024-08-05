import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLeavebalanceComponent } from './employee-leavebalance.component';

describe('EmployeeLeavebalanceComponent', () => {
  let component: EmployeeLeavebalanceComponent;
  let fixture: ComponentFixture<EmployeeLeavebalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeLeavebalanceComponent]
    });
    fixture = TestBed.createComponent(EmployeeLeavebalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
