import { Component } from '@angular/core';
import { CheckInOut, NumOfRun, NumOfRunDel, Schedule, UserOfNum, userInfo } from 'app/models/Attendance.model';
import { AttendanceService } from 'app/service/attendance.service';

@Component({
  selector: 'app-newattendance',
  templateUrl: './newattendance.component.html',
  styleUrls: ['./newattendance.component.css']
})
export class NewattendanceComponent {
  buttons = [
    { label: ' Attendance', route: '/attendance' },

  ];
  userInfo:userInfo;
  checkinout:CheckInOut;
  userNum:UserOfNum;
  numRun:NumOfRun;
  numRunDel:NumOfRunDel;
  schdule:Schedule

  constructor(
    private attendanceService: AttendanceService  ) 
    {}
    
    ngOnInit(): void { 
      this.attendanceService.getNumOfRun().subscribe({
        next: (at) => { 
          // this.leaveRequest.empId = this.selectedEmployee; 
          this.numRun=at 
         }, 
        error: (response) => { 
          console.log(response); 
        } 
      
      })
      this.attendanceService.getNumRunDel().subscribe({
        next: (at) => { 
          // this.leaveRequest.empId = this.selectedEmployee; 
          this.numRunDel=at 
         }, 
        error: (response) => { 
          console.log(response); 
        } 
      
      })
    
    this.attendanceService.getSchedule().subscribe({
      next: (at) => { 
        // this.leaveRequest.empId = this.selectedEmployee; 
        this.schdule=at 
       }, 
      error: (response) => { 
        console.log(response); 
      } 
    
    })
  }


  getData(){

  }
}
