import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobDescriptionComponent } from './edit-job-description.component';

describe('EditJobDescriptionComponent', () => {
  let component: EditJobDescriptionComponent;
  let fixture: ComponentFixture<EditJobDescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditJobDescriptionComponent]
    });
    fixture = TestBed.createComponent(EditJobDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
