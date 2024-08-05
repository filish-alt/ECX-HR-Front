import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherspromotionComponent } from './otherspromotion.component';

describe('OtherspromotionComponent', () => {
  let component: OtherspromotionComponent;
  let fixture: ComponentFixture<OtherspromotionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtherspromotionComponent]
    });
    fixture = TestBed.createComponent(OtherspromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
