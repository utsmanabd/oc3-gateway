import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCiltComponent } from './activity-cilt.component';

describe('ActivityCiltComponent', () => {
  let component: ActivityCiltComponent;
  let fixture: ComponentFixture<ActivityCiltComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityCiltComponent]
    });
    fixture = TestBed.createComponent(ActivityCiltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
