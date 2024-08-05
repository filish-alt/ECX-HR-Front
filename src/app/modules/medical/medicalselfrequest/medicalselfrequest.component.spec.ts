import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalselfrequestComponent } from './medicalselfrequest.component';

describe('MedicalselfrequestComponent', () => {
  let component: MedicalselfrequestComponent;
  let fixture: ComponentFixture<MedicalselfrequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalselfrequestComponent]
    });
    fixture = TestBed.createComponent(MedicalselfrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
