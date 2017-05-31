import { Component, OnInit } from '@angular/core';
import { AppRoutes } from './../../app.routes';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  routes: string[] = [];

  ngOnInit() {
    // we don't care about the last route as it is just a redirect
    for (let i = 0; i < AppRoutes.length - 1; i++) {
      this.routes.push(AppRoutes[i].path);
    }
  }
}
