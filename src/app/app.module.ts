import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TestComponent } from './test.component';
import { PxTestComponent } from './pxtest.component';

import { routing,
         appRoutingProviders } from './app.routing';

import { PaperCheckboxControlValueAccessorDirective, PolymerCheckedEventDirective } from './shared/paper-checkbox.cva';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent, PxTestComponent,

    // enable bi-directional binding
    PolymerCheckedEventDirective,
    // enables ngModel compatibility
    PaperCheckboxControlValueAccessorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
