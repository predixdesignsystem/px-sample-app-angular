import { Component, Input, Output } from '@angular/core';
import { MD_CARD_DIRECTIVES  } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES  } from '@angular2-material/button';
// import { PolymerElement } from '@vaadin/angular2-polymer';

@Component({
  moduleId: module.id,
  selector: 'ws-card',
  templateUrl: 'ws-card.component.html',
  directives: [
    // Angular Material
    MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES,
    // Polymer
    // PolymerElement('paper-card'),
    // PolymerElement('paper-button'),
  ]
})
export class WorkspaceCardComponent {

  @Input() name: string;
  @Input() totalObjects: string;
  @Output() onOpenClick = () => { console.log('OPEN clicked'); }
  @Output() onDeleteClick = () => { console.log('DELETE clicked'); }

  totalObjectsString = () =>
      this.totalObjects === undefined || this.totalObjects === '' ? '?' :
      this.totalObjects === '0' ? 'Empty' :
      this.totalObjects + ' objects';
}
