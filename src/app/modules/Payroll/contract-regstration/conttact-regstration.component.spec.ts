import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConttactRegstrationComponent } from './conttact-regstration.component';

describe('ConttactRegstrationComponent', () => {
  let component: ConttactRegstrationComponent;
  let fixture: ComponentFixture<ConttactRegstrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConttactRegstrationComponent]
    });
    fixture = TestBed.createComponent(ConttactRegstrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
