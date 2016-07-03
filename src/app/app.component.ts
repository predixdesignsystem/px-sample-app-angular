import { Component } from '@angular/core';
import { WsListContainerComponent } from './workspaces/ws-list-container.component';
import { NgRedux } from 'ng2-redux';
import workspaceManager from './redux/workspacesReducer';

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
  directives: [WsListContainerComponent]
})
export class AppComponent {
  title = 'app works!';

  constructor(private ngRedux: NgRedux<IAppState>) {
    this.ngRedux.configureStore(workspaceManager, {}, [ thunk, apiMiddleware ]);
  }
}
