import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActingAssigmentComponent } from './acting-assigment.component';

describe('ActingAssigmentComponent', () => {
  let component: ActingAssigmentComponent;
  let fixture: ComponentFixture<ActingAssigmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActingAssigmentComponent]
    });
    fixture = TestBed.createComponent(ActingAssigmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
