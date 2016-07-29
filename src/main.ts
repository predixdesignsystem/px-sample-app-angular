import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';
import { NgRedux } from 'ng2-redux';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  NgRedux,
  // https://angular.io/docs/ts/latest/guide/forms.html
  disableDeprecatedForms(),
  provideForms()
])
.catch(err => console.error(err));
