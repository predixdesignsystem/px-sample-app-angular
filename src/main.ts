import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { NgRedux } from 'ng2-redux';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [ NgRedux ]);

