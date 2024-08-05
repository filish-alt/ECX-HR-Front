import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewattendanceComponent } from './newattendance.component';

describe('NewattendanceComponent', () => {
  let component: NewattendanceComponent;
  let fixture: ComponentFixture<NewattendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewattendanceComponent]
    });
    fixture = TestBed.createComponent(NewattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
