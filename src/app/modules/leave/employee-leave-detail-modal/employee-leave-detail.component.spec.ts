import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLeaveDetailComponent } from './employee-leave-detail.component';

describe('EmployeeLeaveDetailComponent', () => {
  let component: EmployeeLeaveDetailComponent;
  let fixture: ComponentFixture<EmployeeLeaveDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeLeaveDetailComponent]
    });
    fixture = TestBed.createComponent(EmployeeLeaveDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
