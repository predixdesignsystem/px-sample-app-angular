import { Component, Input, Output, OnInit } from '@angular/core';
import { MD_CARD_DIRECTIVES  } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES  } from '@angular2-material/button';

@Component({
  moduleId: module.id,
  selector: 'ws-card',
  template: `
    <md-card>
        <md-card-title>{{name}}</md-card-title>
        <md-card-subtitle>{{totalObjects}} objects</md-card-subtitle>
        <button md-button (click)="onOpenClick()" color="primary">OPEN</button>
        <button md-button (click)="onDeleteClick()">DELETE</button>
    </md-card>`,
  directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES],
})
export class WorkspaceCardComponent implements OnInit {

  @Input() name: string;
  @Input() totalObjects: number;
  @Output() onOpenClick = () => { console.log('OPEN clicked'); }
  @Output() onDeleteClick = () => { console.log('DELETE clicked'); }

  constructor() {}

  ngOnInit() {
  }

}
