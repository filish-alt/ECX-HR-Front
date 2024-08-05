import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletesucessfullmessageComponent } from './deletesucessfullmessage.component';

describe('DeletesucessfullmessageComponent', () => {
  let component: DeletesucessfullmessageComponent;
  let fixture: ComponentFixture<DeletesucessfullmessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletesucessfullmessageComponent]
    });
    fixture = TestBed.createComponent(DeletesucessfullmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
