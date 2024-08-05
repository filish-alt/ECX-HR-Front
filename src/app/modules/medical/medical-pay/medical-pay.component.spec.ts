import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalPayComponent } from './medical-pay.component';

describe('MedicalHistoryComponent', () => {
  let component: MedicalPayComponent;
  let fixture: ComponentFixture<MedicalPayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalPayComponent]
    });
    fixture = TestBed.createComponent(MedicalPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
