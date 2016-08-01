import { provideRouter, RouterConfig } from '@angular/router';
import { TestComponent } from './test.component';

export const routes: RouterConfig = [
  { path: '', component: TestComponent },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
