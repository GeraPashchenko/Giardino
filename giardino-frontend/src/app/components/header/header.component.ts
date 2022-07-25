import { Component, Input, OnInit } from '@angular/core';
import { routesEnum } from 'src/environments/routes.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  routes = routesEnum;

  ngOnInit(): void {
  }

}
