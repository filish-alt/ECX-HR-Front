import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowanceTypeComponent } from './allowance-type.component';

describe('AllowanceTypeComponent', () => {
  let component: AllowanceTypeComponent;
  let fixture: ComponentFixture<AllowanceTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllowanceTypeComponent]
    });
    fixture = TestBed.createComponent(AllowanceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
