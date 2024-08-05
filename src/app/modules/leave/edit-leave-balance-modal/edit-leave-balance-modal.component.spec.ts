import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeaveBalanceModalComponent } from './edit-leave-balance-modal.component';

describe('EditLeaveBalanceModalComponent', () => {
  let component: EditLeaveBalanceModalComponent;
  let fixture: ComponentFixture<EditLeaveBalanceModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditLeaveBalanceModalComponent]
    });
    fixture = TestBed.createComponent(EditLeaveBalanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
