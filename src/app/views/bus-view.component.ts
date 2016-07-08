import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bus-view-container',
  template: `
     <bus-view workspace-id="https://localhost:8388/wsmgr/workspaces/1">
     </bus-view>
  `,
  styles: []
})
export class BusViewComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
