import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionhistoryComponent } from './promotionhistory.component';

describe('PromotionhistoryComponent', () => {
  let component: PromotionhistoryComponent;
  let fixture: ComponentFixture<PromotionhistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionhistoryComponent]
    });
    fixture = TestBed.createComponent(PromotionhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
