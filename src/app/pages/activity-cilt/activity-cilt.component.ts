import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity-cilt',
  templateUrl: './activity-cilt.component.html',
  styleUrls: ['./activity-cilt.component.scss']
})
export class ActivityCiltComponent {

  ngOnInit(): void {
    window.location.href = "http://localhost:3456/"
  }
}
