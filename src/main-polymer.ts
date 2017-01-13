
document.addEventListener('WebComponentsReady', () => {
  require('./main.ts');
});

// https://github.com/angular/angular-cli/issues/3540
// HACK: horrible workaround for AoT bootstrap detection bug
import './polyfills.ts';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
const hackThis = false;
if (hackThis) {
  platformBrowserDynamic().bootstrapModule(AppModule);
}
