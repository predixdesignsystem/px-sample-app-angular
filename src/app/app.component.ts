import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import workspaceManager from './redux/workspacesReducer';
import { environment } from './environment';

// TypeScript appears to not be able yet to import untyped JS modules, so require instead
// import { apiMiddleware } from 'redux-api-middleware';
// import thunk from 'redux-thunk';
declare var require: (moduleId: string) => any;
const { apiMiddleware } = require('redux-api-middleware');
const thunk = require('redux-thunk').default;

interface IAppState {}
@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {

  constructor(private ngRedux: NgRedux<IAppState>) {

    let enhancers = [];
    if (!environment.production) {
      const env: any = window || this;
      if (env.devToolsExtension) {
        enhancers = [ ...enhancers, env.devToolsExtension() ];
      }
    }

    // TODO: move redux configuration (and initial store state) elsewhere
    const wsmgrInitialState = {

      selectedWorkspace: undefined,
      isFetching: false,
      didInvalidate: true,  // shouldFetch (including the initial one) relies on lack of this key to request ...
      lastUpdated: 0,
      filter: '',

      workspaces: {}
    };

    this.ngRedux.configureStore(workspaceManager, wsmgrInitialState, [ thunk , apiMiddleware ], enhancers);
  }
}
