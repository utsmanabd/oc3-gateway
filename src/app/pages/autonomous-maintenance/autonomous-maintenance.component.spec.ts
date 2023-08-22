import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutonomousMaintenanceComponent } from './autonomous-maintenance.component';

describe('AutonomousMaintenanceComponent', () => {
  let component: AutonomousMaintenanceComponent;
  let fixture: ComponentFixture<AutonomousMaintenanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutonomousMaintenanceComponent]
    });
    fixture = TestBed.createComponent(AutonomousMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
