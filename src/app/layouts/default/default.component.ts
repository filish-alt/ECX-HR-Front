
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';
import PerfectScrollbar from 'perfect-scrollbar';
import * as $ from "jquery";
import { filter, Subscription } from 'rxjs';
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
    sideBarOpen = true;
    isLoginPage: boolean = false;

    toggleSideBar(event: any) {
      this.sideBarOpen = !this.sideBarOpen;
    }
  
    private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];


  constructor(private router: Router, public location: Location, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = this.activatedRoute.firstChild?.snapshot.routeConfig?.path === 'login';
      }
    });
  }

  ngOnInit() {
  }}