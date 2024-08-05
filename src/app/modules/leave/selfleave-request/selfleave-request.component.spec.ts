import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfleaveRequestComponent } from './selfleave-request.component';

describe('SelfleaveRequestComponent', () => {
  let component: SelfleaveRequestComponent;
  let fixture: ComponentFixture<SelfleaveRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelfleaveRequestComponent]
    });
    fixture = TestBed.createComponent(SelfleaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
