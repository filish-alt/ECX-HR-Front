import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrApproveComponent } from './hr-approve.component';

describe('HrApproveComponent', () => {
  let component: HrApproveComponent;
  let fixture: ComponentFixture<HrApproveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HrApproveComponent]
    });
    fixture = TestBed.createComponent(HrApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
