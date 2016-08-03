import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [
    '../sass/seed-app.css',
    '../sass/iconography.css',
    '../sass/typography.css'
  ],
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {
}
