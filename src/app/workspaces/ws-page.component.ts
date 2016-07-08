import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MD_TABS_DIRECTIVES } from '@angular2-material/tabs/tabs';
// import { ISubscription } from 'rxjs';
import { BusViewComponent } from '../bus-view/bus-view.component';

@Component({
  moduleId: module.id,
  selector: 'app-ws-page',
  templateUrl: 'ws-page.component.html',
  styleUrls: ['ws-page.component.css'],
  directives: [MD_TABS_DIRECTIVES, BusViewComponent]
})
export class WsPageComponent implements OnInit, OnDestroy {

  private routeParamsSub: any;
  private id: string;

  tabs = [
    { label: 'Tab One', content: 'This is the body of the first tab' },
    { label: 'Tab Two', content: 'This is the body of the second tab' },
    { label: 'Tab Three', content: 'This is the body of the third tab' },
  ];

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.routeParamsSub = this.route.params.subscribe(params => {
       this.id = params['id'];
    });
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe();
  }

}
