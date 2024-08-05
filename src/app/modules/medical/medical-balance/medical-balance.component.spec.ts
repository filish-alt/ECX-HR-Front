import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalBalanceComponent } from './medical-balance.component';

describe('MedicalBalanceComponent', () => {
  let component: MedicalBalanceComponent;
  let fixture: ComponentFixture<MedicalBalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalBalanceComponent]
    });
    fixture = TestBed.createComponent(MedicalBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
