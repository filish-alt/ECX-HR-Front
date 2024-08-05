import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Position } from 'app/models/job-description.model';
import { LeaveType } from 'app/models/leaveType.model';
import { CombinedLeaveData } from 'app/models/leaverequestmodel';
import { LeaveRequestService } from 'app/service/leaveRequest.service';
import { LeaveTypeService } from 'app/service/leaveType.service';
import { PositionService } from 'app/service/position.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-employee-leave-detail',
  templateUrl: './employee-leave-detail.component.html',
  styleUrls: ['./employee-leave-detail.component.css']
})
export class EmployeeLeaveDetailComponent {
  constructor(
    private positionservice:PositionService ,
    private leavetypeservice: LeaveTypeService,
    private leaveService: LeaveRequestService,
    public dialogRef: MatDialogRef<EmployeeLeaveDetailComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, private leaveRequestService: LeaveRequestService) {} // Replace with your actual backend service


      selectedEmployee: string;
      private isOpen = new BehaviorSubject<boolean>(false);
isOpen$ = this.isOpen.asObservable();

positions:Position[]= [];
ngOnInit(): void {
  this.leavetypeservice.getAllLeaveType().
  subscribe({
    next: (leaveType) => {
    //this.leaveRequest.leaveTypeId = this.selectedLeaveType;
      this.leaveTypes= leaveType
      ;
    },
    error: (response) => {
      console.log(response);
    }
  });   

  this.positionservice.getAllPosition()
  .subscribe({
    next: (positions) => {
      this.positions=positions;
    
      
    },
    error(response){
      console.log(response)
    }
  });}

public employeeName = new BehaviorSubject<string | null>(null); // Corrected property name
employeeName$ = this.employeeName.asObservable();
leaveTypes:LeaveType[]=[] 



      leaveData: CombinedLeaveData;
openModal(empId: string) {
  this.selectedEmployee=empId;
  this.leaveService.getLeaveData(this.selectedEmployee).subscribe(
    (data) => {
      this.leaveData = data;
      console.log('Employee:', data.employee);
      console.log('LeaveRequest:', data.leaveRequests);
      console.log('Annual:', data.otherLeaveBalances);
    
     
    },
    (error) => {
      console.error('Error:', error);
    }
  );

       
  }
  onCancelClick(): void {
    this.dialogRef.close(false);
  }
closeModal() {
  this.isOpen.next(false);
}
printEmployeeDetails() {
  // Implement printing functionality here
  // You can use browser-specific printing techniques or a library like ngx-print to handle printing.
  window.print();
  console.log(this.selectedEmployee);
}
getPositionName(positionId: string): string {

  const position = this.positions.find((position) => position.positionId === positionId);  
  
  return position ? position.name : '';
}
getLeaveTypeName(leavetypeId: string): string {
  const leaveType = this.leaveTypes.find((leave) => leave.leaveTypeId === leavetypeId);
  return leaveType ? leaveType.leaveTypeName : '';
}
}
