import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceApproveComponent } from './finance-approve.component';

describe('FinanceApproveComponent', () => {
  let component: FinanceApproveComponent;
  let fixture: ComponentFixture<FinanceApproveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinanceApproveComponent]
    });
    fixture = TestBed.createComponent(FinanceApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
