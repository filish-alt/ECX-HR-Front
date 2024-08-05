import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOtherLeaveBalanceComponent } from './edit-other-leave-balance.component';

describe('EditOtherLeaveBalanceComponent', () => {
  let component: EditOtherLeaveBalanceComponent;
  let fixture: ComponentFixture<EditOtherLeaveBalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditOtherLeaveBalanceComponent]
    });
    fixture = TestBed.createComponent(EditOtherLeaveBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
