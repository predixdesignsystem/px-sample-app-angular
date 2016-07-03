import { Component, OnInit, Input, Output } from '@angular/core';
import { WorkspaceCardComponent } from './workspace-card.component';

interface IWorkspace {
  name: string;
  totalObjects: number;
};

@Component({
  moduleId: module.id,
  selector: 'workspace-list',
  template: `
    <div class="container">
      <workspace-card *ngFor="let workspace of workspaces"
        name={{workspace.name}}
        totalObjects={{workspace.totalObjects}} 
      >
      </workspace-card>
    </div>
  `,
  styles: [`
    .container {
      background: white;
      height: calc(100% - 40px);
      margin: 20px 0px 20px 10px;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      align-items: flex-start;
      overflow-y: auto;
    }
    workspace-card {
     width: 350px;
     margin: 5px 5px;
    }`],

  directives: [WorkspaceCardComponent]

})
export class WorkspaceListComponent implements OnInit {

  @Input() workspaces: IWorkspace[];

  constructor() {}


  ngOnInit() {
    console.log(this.workspaces);
  }

}
