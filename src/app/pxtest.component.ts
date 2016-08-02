import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-pxtest',
  template: `
    <div>Value: {{dateTime}}  Time Hidden: {{hideTime}}</div>

    <!-- Note the use of camelCased hideTime for *property* binding -->
    <px-datetime-picker
      date-time={{dateTime}}
      date-format="MM/DD/YY"
      time-format="hh:mm A"
      show-time-zone="abbreviatedText"
      time-zone="America/Los_Angeles"

      [hideTime]="hideTime"
      (px-datetime-submitted)="dateTime = $event.detail.dateTime"
      >
    </px-datetime-picker>

    <paper-button raised (click)="hideTime = !hideTime">Show/Hide Time</paper-button>
    
  `,
  styles: []
})
export class PxTestComponent {
  dateTime: string = new Date().toISOString();
  hideTime: boolean = true;
}
