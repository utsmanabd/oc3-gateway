import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGatewayComponent } from './home-gateway.component';

describe('HomeGatewayComponent', () => {
  let component: HomeGatewayComponent;
  let fixture: ComponentFixture<HomeGatewayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeGatewayComponent]
    });
    fixture = TestBed.createComponent(HomeGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
