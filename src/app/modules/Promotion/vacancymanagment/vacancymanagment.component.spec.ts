import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancymanagmentComponent } from './vacancymanagment.component';

describe('VacancymanagmentComponent', () => {
  let component: VacancymanagmentComponent;
  let fixture: ComponentFixture<VacancymanagmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VacancymanagmentComponent]
    });
    fixture = TestBed.createComponent(VacancymanagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
