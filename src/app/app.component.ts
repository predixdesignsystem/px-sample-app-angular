import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './sass/px-sample-app.scss'
  ],
})
export class AppComponent implements AfterViewInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  switchRoute(e) {
    this.router.navigateByUrl('/' + e.detail.value);
  }

  selectedRoute = ["dashboard"];

  ngAfterViewInit() {
  }
}
