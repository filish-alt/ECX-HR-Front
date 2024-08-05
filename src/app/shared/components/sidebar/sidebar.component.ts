
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/employee-registration', title: 'Employee Registration',  icon:'person', class: '' },
    { path: '/admin', title: 'Admin',  icon:'people', class: '' },
    { path: '/leave/leave-request-form', title: 'Leave',  icon:'house', class: '' },
  { path: '/promotionhistory', title: 'Promotion',  icon:'train', class: '' },
    
    { path: '/attendance', title: 'Attendance',  icon:'book', class: '' },
    { path: '/medicalRequest', title: 'Medical Fund',  icon:'people', class: '' },
  
    { path: '/payroll', title: 'PayRoll',  icon:'people', class: '' },
  
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {
    this.menuItems = [];
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  
  
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
