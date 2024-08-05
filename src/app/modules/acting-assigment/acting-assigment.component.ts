import { Component } from '@angular/core';

@Component({
  selector: 'app-acting-assigment',
  templateUrl: './acting-assigment.component.html',
  styleUrls: ['./acting-assigment.component.css']
})
export class ActingAssigmentComponent {
  buttons = [ 
    { label: ' Assign  ', route: '/acting-assigment' }, 
    { label: '  view ', route: '/acting-assigment' } ,
    
  ];

  
}
