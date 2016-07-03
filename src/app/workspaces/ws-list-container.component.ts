import { Component, OnInit } from '@angular/core';
import { WorkspaceListComponent } from './ws-list.component';

import { AsyncPipe } from '@angular/common';
import { select } from 'ng2-redux';
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

  @select('workspaces') workspaces$;

  constructor() {}

  ngOnInit() {

  }

}

/*
      [workspaces]="
        [ { name: 'ws1', totalObjects: 200 },
          { name: 'ws2', totalObjects: 300 }
        ]"
*/
