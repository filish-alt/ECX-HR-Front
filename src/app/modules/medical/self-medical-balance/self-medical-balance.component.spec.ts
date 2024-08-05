import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfMedicalBalanceComponent } from './self-medical-balance.component';

describe('SelfMedicalBalanceComponent', () => {
  let component: SelfMedicalBalanceComponent;
  let fixture: ComponentFixture<SelfMedicalBalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelfMedicalBalanceComponent]
    });
    fixture = TestBed.createComponent(SelfMedicalBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
