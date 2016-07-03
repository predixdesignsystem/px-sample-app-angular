import { Component } from '@angular/core';
import { WorkspaceListComponent } from './workspaces/workspace-list.component';
import { NgRedux } from 'ng2-redux';
// import { apiMiddleware } from 'redux-api-middleware';
import workspaceManager from './redux/workspacesReducer';

// TypeScript appears to not be able yet to import untyped JS modules, so require instead
declare var require: (moduleId: string) => any;
const { apiMiddleware } = require('redux-api-middleware');

interface IAppState {}
@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [WorkspaceListComponent]
})
export class AppComponent {
  title = 'app works!';

  constructor(private ngRedux: NgRedux<IAppState>) {
    this.ngRedux.configureStore(workspaceManager, {}, [ apiMiddleware ]);
  }
}
