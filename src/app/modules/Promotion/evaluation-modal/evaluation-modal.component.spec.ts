import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationModalComponent } from './evaluation-modal.component';

describe('EvaluationModalComponent', () => {
  let component: EvaluationModalComponent;
  let fixture: ComponentFixture<EvaluationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationModalComponent]
    });
    fixture = TestBed.createComponent(EvaluationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
