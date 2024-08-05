import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedleavesComponent } from './approvedleaves.component';

describe('ApprovedleavesComponent', () => {
  let component: ApprovedleavesComponent;
  let fixture: ComponentFixture<ApprovedleavesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedleavesComponent]
    });
    fixture = TestBed.createComponent(ApprovedleavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
