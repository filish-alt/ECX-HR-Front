import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDepositeAuthenticationComponent } from './edit-depositeauthentication.component';

describe('EditDepositeauthenticationComponent', () => {
  let component: EditDepositeAuthenticationComponent;
  let fixture: ComponentFixture<EditDepositeAuthenticationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDepositeAuthenticationComponent]
    });
    fixture = TestBed.createComponent(EditDepositeAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
