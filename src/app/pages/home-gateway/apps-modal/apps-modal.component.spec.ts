import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsModalComponent } from './apps-modal.component';

describe('AppsModalComponent', () => {
  let component: AppsModalComponent;
  let fixture: ComponentFixture<AppsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppsModalComponent]
    });
    fixture = TestBed.createComponent(AppsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
