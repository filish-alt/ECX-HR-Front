import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmergencyContactComponent } from './edit-emergencycontact.component';

describe('EditEmergencycontactComponent', () => {
  let component: EditEmergencyContactComponent;
  let fixture: ComponentFixture<EditEmergencyContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEmergencyContactComponent]
    });
    fixture = TestBed.createComponent(EditEmergencyContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
