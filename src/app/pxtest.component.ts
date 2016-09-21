import { Component } from '@angular/core';

@Component({
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

    <px-vis-pie-chart 
                  id="donut" 
                  width="300" 
                  height="250"
                  use-percentage="true" 
                  include-all-series="true"
                  donut="true"
                  chart-data='[
                  {"x": 15, "y": "IPA"}, 
                  {"x": 8,"y": "Lambic"}, 
                  {"x": 12,
                  "y": "Stout"
                },
                {
                  "x": 7,
                  "y": "Pale Ale"
                },
                {
                  "x": 9,
                  "y": "Porter"
                },
                {
                  "x": 4,
                  "y": "Heffeweisse"
                }]' 
                
                  use-percentage="true"
                  style="margin: auto"
                  >
              </px-vis-pie-chart>
  `,
  styles: []
})
export class PxTestComponent {
  dateTime: string = new Date().toISOString();
  hideTime: boolean = true;
}
