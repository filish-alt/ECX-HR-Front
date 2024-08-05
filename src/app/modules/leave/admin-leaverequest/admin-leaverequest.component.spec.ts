import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeaverequestComponent } from './admin-leaverequest.component';

describe('AdminLeaverequestComponent', () => {
  let component: AdminLeaverequestComponent;
  let fixture: ComponentFixture<AdminLeaverequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminLeaverequestComponent]
    });
    fixture = TestBed.createComponent(AdminLeaverequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
