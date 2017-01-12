
document.addEventListener('WebComponentsReady', () => {
  require('./main.ts');
});

// https://github.com/angular/angular-cli/issues/3540#issuecomment-270627460
// HACK: horrible workaround for AoT bootstrap detection bug
import './polyfills.ts';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
let hackThis = false; 
if (hackThis) {
  platformBrowserDynamic().bootstrapModule(AppModule);
}