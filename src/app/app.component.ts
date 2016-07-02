import { Component } from '@angular/core';
import { WorkspaceListComponent } from './workspaces/workspace-list.component';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [WorkspaceListComponent]
})
export class AppComponent {
  title = 'app works!';
}
