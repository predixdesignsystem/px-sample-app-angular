import { Component, Directive, Output, EventEmitter, HostListener } from '@angular/core';
import { PaperCheckboxControlValueAccessorDirective } from './shared/paper-checkbox.cva';
import { PolymerElement } from '@vaadin/angular2-polymer';

@Directive({
  selector: 'paper-checkbox[translateEvent]'
})
class PolymerCheckedEventDirective {
  @Output() checkedChange: EventEmitter<any> = new EventEmitter();
  @HostListener('checked-changed', ['$event'])
  onChange(e) {
    this.checkedChange.emit(e.detail.value);
  }
}

@Component({
  selector: 'my-app',
  template: `
    <div>
      <h2>Angular2 + Polymer checkbox databinding example</h2>
      <div>Value: {{v}}</div>
      <paper-button raised (click)="onBtnClick($event)">Ng Update Checkbox</paper-button>

      <h2>Explicit property and event binding</h2>
      
      <h3>[checked]="v" (change)="v = $event.target.checked"</h3>
      <paper-checkbox [checked]="v" (change)="v = $event.target.checked"></paper-checkbox>
      <div>paper-checkbox fires 'change'</div>

      <h3>[checked]="v" (iron-change)="v = $event.target.checked"</h3>
      <paper-checkbox [checked]="v" (iron-change)="v = $event.target.checked"></paper-checkbox>
      <div>paper-checkbox fires 'iron-change'</div>

      <h3>[checked]="v" (checked-changed)="v = $event.detail.value"</h3>
      <paper-checkbox [checked]="v" (checked-changed)="v = $event.detail.value"></paper-checkbox>
      <div>paper-checkbox fires 'checked-change' ('checked' property notification, non-bubbling)</div>

      <h2>Bi-directional binding</h2>
      
      <h3>[(checked)]="v"</h3>
      <paper-checkbox translateEvent [(checked)]="v"></paper-checkbox>
      
      <h3>[checked]="v" (checkedChange)="v = $event"</h3>
      <paper-checkbox translateEvent [checked]="v" (checkedChange)="v = $event"></paper-checkbox>
      
      <div>Both of these have ng2 listen to 'checkedChanged' event, so for this to work there needs to be
      something listening to and translating one of the events ('change', 'iron-change', 'checked-change')
      to 'checkedChanged'. Could be a custom directive, or use vaadin/angular2-polymer
      (its changeEventsAdapterDirective - added by PolymerElement -- will listen
      to all property-changed events and emit appropriate propertyChange events.
      <div>
      
      <h2>ngModel compatibility</h2>

      <h3>[(ngModel)]="v"</h3>
      <form>
        <paper-checkbox cva [(ngModel)]="v" name="name"></paper-checkbox>
      </form>
      <div>
      To be compatible with ngModel, custom elements need to provide
      ControlValueAccessor, that gives ngModel a way to set the value
      and listen to value changes. vaadin/angular2-polymer has
      formElementDirective that implements this for elements with
      iron-form-element behaviour (listening to valueChange/setting value).
      Others - e.g. paper-checkbox - need custom CVA implementation.
      </div>
    </div>
  `,
  directives: [
    // either of these two enable bi-directional binding
    PolymerCheckedEventDirective,
//  PolymerElement('paper-checkbox'),
    // enables ngModel compatibility
    PaperCheckboxControlValueAccessorDirective
  ]
})
export class TestComponent {
  v: any = true;
  onBtnClick(e) {
    this.v = !this.v;
  }
}
