import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestComponent } from './test.component';
import { PxTestComponent } from './pxtest.component';

const appRoutes: Routes = [
  { path: '', component: TestComponent },
  { path: 'px', component: PxTestComponent }
];

export const appRoutingProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
