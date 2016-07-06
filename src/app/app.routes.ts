import { provideRouter, RouterConfig } from '@angular/router';
import { WsListContainerComponent } from './workspaces/ws-list-container.component';
import { WsPageComponent } from './workspaces/ws-page.component';

export const routes: RouterConfig = [
  { path: '', component: WsListContainerComponent },
  { path: 'workspace/:id', component: WsPageComponent },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
