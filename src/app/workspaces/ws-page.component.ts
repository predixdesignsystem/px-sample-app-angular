import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { ISubscription } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'app-ws-page',
  templateUrl: 'ws-page.component.html',
  styleUrls: ['ws-page.component.css']
})
export class WsPageComponent implements OnInit, OnDestroy {

  private routeParamsSub: any;
  private id: string;

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
