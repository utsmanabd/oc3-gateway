import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSparepartsComponent } from './stock-spareparts.component';

describe('StockSparepartsComponent', () => {
  let component: StockSparepartsComponent;
  let fixture: ComponentFixture<StockSparepartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockSparepartsComponent]
    });
    fixture = TestBed.createComponent(StockSparepartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
