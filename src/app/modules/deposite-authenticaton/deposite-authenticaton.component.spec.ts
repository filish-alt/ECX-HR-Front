import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositeAuthenticationComponent } from './deposite-authenticaton.component';

describe('DepositeAuthenticatonComponent', () => {
  let component: DepositeAuthenticationComponent;
  let fixture: ComponentFixture<DepositeAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositeAuthenticationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositeAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
