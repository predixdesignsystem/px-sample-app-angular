import { provideRouter, RouterConfig } from '@angular/router';
import { TestComponent } from './test.component';
import { PxTestComponent } from './pxtest.component';

export const routes: RouterConfig = [
  { path: '', component: TestComponent },
  { path: 'px', component: PxTestComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
