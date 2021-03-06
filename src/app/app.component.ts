import { Component } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './sass/px-sample-app.scss'
  ],
})
export class AppComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  selectedRoute = ["dashboard"];
  switchRoute(e) {
    this.router.navigateByUrl('/' + e.detail.value);
  }

  selectedContext = ["assets","a1"];

}
