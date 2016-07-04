import { Component, OnInit } from '@angular/core';
import { WorkspaceListComponent } from './ws-list.component';

import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/Rx';

import { NgRedux, select } from 'ng2-redux';
import { createWorkspace, openWorkspace, deleteWorkspace, wsListFilterChange,
  fetchWorkspaceListIfNeeded, getWorkspaceModelStats } from '../redux/actions';

@Component({
  pipes: [ AsyncPipe ],
  moduleId: module.id,
  selector: 'ws-list-container',
  directives: [WorkspaceListComponent],
  template: `
    <ws-list
      [workspaces]="workspaces$ | async"
    ></ws-list>
  `,
  styles: []
})
export class WsListContainerComponent implements OnInit {

  @select('workspaces') workspaces$: Observable<any>;
  latestWsIds: string[];

  constructor(
    private ngRedux: NgRedux<any>
  ) {}

  ngOnInit() {
    // Typings for Redux (apparently coming from Redux itself) 
    // have dispatch accepting actions that extend Redux.Action;
    // this seems to go against e.g. redux-thunk that can accept functions.
    // For now type-assert to <any> ... 
    // this.ngRedux.dispatch( <any> fetchWorkspaceListIfNeeded);
    // TODO: makes sense to dispatch unconditional refresh periodically ...
    this.ngRedux.dispatch( <any> fetchWorkspaceListIfNeeded());

    // keep the ids of the latest workspaces
    this.workspaces$.subscribe(workspaces =>
      this.latestWsIds = Object.keys(workspaces));

    // get totalObjects for each workspace, on first non-empty refresh and then periodically
    this.workspaces$
      .first((wss) => Object.keys(wss).length !== 0)
      .subscribe(wss => {
        this.refreshStats(Object.keys(wss));
        Observable.interval(30000).subscribe(() =>
          this.refreshStats(this.latestWsIds)
        );
    });
  }

  refreshStats(workspaces: any[]) {
    workspaces.forEach((ws) =>
      this.ngRedux.dispatch(<any> getWorkspaceModelStats(ws))
    );
  }
}
