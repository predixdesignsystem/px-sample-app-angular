import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { TestComponent } from './test.component';
import { PxTestComponent } from './pxtest.component';

import { PaperCheckboxControlValueAccessorDirective, PolymerCheckedEventDirective } from './shared/paper-checkbox.cva';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InboxComponent } from './inbox/inbox.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent, PxTestComponent,

    // enable bi-directional binding
    PolymerCheckedEventDirective,
    // enables ngModel compatibility
    PaperCheckboxControlValueAccessorDirective,
    DashboardComponent,
    InboxComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'inbox', component: InboxComponent },
      { path: 'layout', component: LayoutComponent }
    ])
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
