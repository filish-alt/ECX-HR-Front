import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedMedicalRequestsComponent } from './approved-medical-requests.component';

describe('ApprovedMedicalRequestsComponent', () => {
  let component: ApprovedMedicalRequestsComponent;
  let fixture: ComponentFixture<ApprovedMedicalRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedMedicalRequestsComponent]
    });
    fixture = TestBed.createComponent(ApprovedMedicalRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
