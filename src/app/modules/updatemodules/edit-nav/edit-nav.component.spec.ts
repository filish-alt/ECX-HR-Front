import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNavComponent } from './edit-nav.component';

describe('EditNavComponent', () => {
  let component: EditNavComponent;
  let fixture: ComponentFixture<EditNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditNavComponent]
    });
    fixture = TestBed.createComponent(EditNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
