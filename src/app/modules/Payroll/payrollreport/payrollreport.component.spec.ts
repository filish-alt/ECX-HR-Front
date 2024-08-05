import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollReportComponent } from './payrollreport.component';

describe('ReportComponent', () => {
  let component: PayrollReportComponent;
  let fixture: ComponentFixture<PayrollReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayrollReportComponent]
    });
    fixture = TestBed.createComponent(PayrollReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
