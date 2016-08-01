/* babel-runtime/regenerator is a dependency of redux-api-middleware
  which it currently loads with "require('babel-runtime/regenerator')['default']"
  The way babel-runtime/regenerator is built, it does not set 'default',
  so it redux-api-middlware will fail on _regeneratorRuntime.async
  with "Cannot read property 'async' of undefined".
  The following is a temporary solutions for that (load and set 'default' early).
  TODO: find a better solution, either via SystemJS config, or a new build of r-a-m.
*/
declare var require: (moduleId: string) => any;
const regeneratorRuntime = require('babel-runtime/regenerator');
if (!regeneratorRuntime.default) {
  regeneratorRuntime.default = regeneratorRuntime;
}

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
