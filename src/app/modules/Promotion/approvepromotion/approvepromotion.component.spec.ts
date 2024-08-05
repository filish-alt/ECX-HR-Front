import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovepromotionComponent } from './approvepromotion.component';

describe('ApprovepromotionComponent', () => {
  let component: ApprovepromotionComponent;
  let fixture: ComponentFixture<ApprovepromotionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovepromotionComponent]
    });
    fixture = TestBed.createComponent(ApprovepromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
