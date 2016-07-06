import { Component, OnInit, Input, Pipe, PipeTransform } from '@angular/core';
import { WorkspaceCardComponent } from './ws-card.component';

// TODO: move out
@Pipe({ name: 'mapToIterable' })
export class MapToIterable implements PipeTransform {

  transform(obj: any): any[] {
    let result = [];

    if (obj.entries) {
      for (const [key, value] of obj.entries()) {
        result.push({ key, value });
      }
    } else {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          result.push({ key, value: obj[key] });
        }
      }
    }

    return result;
  }
}

interface IWorkspace {
  name: string;
  totalObjects: number;
};

@Component({
  moduleId: module.id,
  selector: 'ws-list',
  template: `
    <div class="container">
      <!-- TODO: knows too much about store shape, move selectors closer to reducers --> 
      <ws-card *ngFor="let wskv of workspaces | mapToIterable"
        ws={{wskv.key}}
        name={{wskv.value.name}}
        totalObjects={{wskv.value.state?.objectCount}} 
      >
      </ws-card>
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
    ws-card {
     width: 350px;
     margin: 5px 5px;
    }`],

  directives: [WorkspaceCardComponent],
  pipes: [MapToIterable]

})
export class WorkspaceListComponent implements OnInit {

  @Input() workspaces: IWorkspace[];

  constructor() {}

  ngOnInit() {
  }
}
