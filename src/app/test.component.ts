import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-test',
  template: `
    <paper-card heading={{name}}>
        <div class='card-actions'>
            <paper-button (click)="onCardClick()">Open</paper-button>
        </div>
    </paper-card>
  `,
  styles: []
})
export class TestComponent implements OnInit {

  @Input() name: string;
  @Output() onCardClick = () => {
    console.log('onCardClick');
  }

  constructor() { }

  ngOnInit() {
  }

}
