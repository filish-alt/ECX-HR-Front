import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Department } from 'app/models/education.model';
import { Employee } from 'app/models/employee.model';
import { Division, Position } from 'app/models/job-description.model';
import { LeaveType } from 'app/models/leaveType.model';
import { LeaveRequest } from 'app/models/leaverequestmodel';
import { DepartmentService } from 'app/service/department.service';
import { DivisionService } from 'app/service/division.service';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { EmployeeService } from 'app/service/employee.service';
import { LeaveRequestService } from 'app/service/leaveRequest.service';
import { LeaveTypeService } from 'app/service/leaveType.service';
import { PositionService } from 'app/service/position.service';

@Component({
  selector: 'app-admin-leaverequest',
  templateUrl: './admin-leaverequest.component.html',
  styleUrls: ['./admin-leaverequest.component.css']
})
export class AdminLeaverequestComponent {


  employees:Employee[]=[];
  leaveTypes:LeaveType[]=[]
  leavePenddings:LeaveRequest[]=[]
  leavependding:LeaveRequest;
  leaveRejected: boolean = false;
  leaverejectStatus:string="Admin Reject";
  leave:boolean= false;

  fromDate: string; // Variable to store the "From" date
  toDate: string;
  filteredLeave:LeaveRequest[]=[]
  selectedLeaveType: string='';
  selectedEmployee: string='';
  divisions:Division[]= [];
  departments:Department[]=[];
   positions:Position[]= [];
leaveApproved: boolean = false;
leaveRequests:LeaveRequest[]=[]; 
downloadFileUrl: string=''; 
FileNull:boolean = false;
id:string;
buttons = [  
  { label: 'Leave Request',
  dropdownOptions: [
    { label: ' Employee LeaveRequest Form ', route: '/leave/leave-request-form' }, 
    { label: ' Self LeaveRequest Form', route: '/leave/self-leave' }, 
 
   ]},
 // { label: ' Leave Request Form ', route: '/leave/leave-request-form' }, 
  { label: ' Leave Balance ', route: '/leave/leave-balance' }, 
 // { label: ' Self LeaveRequest Form', route: '/leave/self-leave' }, 
  { label: ' Leave Approve ', route: '/leave/leave-approve' }, 
  { label: ' Employee Leave Balance ', route: '/leave/employeeleavebalance' }, 
  { label: 'Admin Leave Approval ', route: '/leave/leave-requests' },
  { label: 'Approved Leaves ', route: '/leave/approvedleaves' }, 


];  
  constructor(    private leaveRequestservice: LeaveRequestService,
    private router: Router,
    private employeeService:EmployeeService,
    private leavetypeservice: LeaveTypeService,
    private employeeIdService: EmployeeIdService,
    private dialog: MatDialog,
    private divisionservice: DivisionService,
    private departmentservice: DepartmentService,
     private positionservice:PositionService ,
     private snackBar :MatSnackBar
  ) { }
  leaveStatus:string="First-Approved";

  ngOnInit(): void {

    this.positionservice.getAllPosition()
    .subscribe({
      next: (positions) => {
        this.positions=positions;
      
        
      },
      error(response){
        console.log(response)
      }
    });
    this.divisionservice.getAllDivisions()
    .subscribe({
      next: (division) => {
        this.divisions=division;
      },
      error(response){
        console.log(response)
      }
    });
    this.departmentservice.getAllDepartment()
    .subscribe({
      next: (department) => {
        this.departments=department;
      },
      error(response){
        console.log(response)
      }
    });
    this.employeeService.getAllEmployees() 
.subscribe({ 
  next: (employees) => {
    // this.leaveRequest.empId = this.selectedEmployee;
    this.employees=employees
   },
  error: (response) => {
    console.log(response);
  }
});

this.leaveRequestservice.getAllLeaveRequestByStatus(this.leaveStatus).subscribe({
  next: (leaveRequest) => {
    this.leaveRequests=leaveRequest
    this.leavePenddings = leaveRequest
    this.filteredLeave=leaveRequest
    ;
    console.log(leaveRequest)
  },
  error: (response) => {
    console.log(response);
  }
});

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
  }
  capitalizeFirstLetter(text: string): string {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  fetchAndDisplayPDF(leave: LeaveRequest):void { 
    // Call your service method to fetch the PDF file  
    const leaveRequestToEdit = this.leavePenddings.find(leaveRequest => leaveRequest.leaveRequestId === leave.leaveRequestId); 
    leaveRequestToEdit.leaveRequestId 
    this.leaveRequestservice.getLeaveRequestFile(leaveRequestToEdit.leaveRequestId) 
    
      .subscribe( 
        (pdf: Blob) => { 
          const file = new Blob([pdf], { type: 'application/pdf' }); 
          this.downloadFileUrl = window.URL.createObjectURL(file); 
          window.open(this.downloadFileUrl, '_blank'); 
          //console.log(this.leaveRequest.leaveRequestId); 
           
      
        }, 
         
        (error) => {
          this.FileNull=true
          console.error('Error loading PDF:', error);
         this.id= leaveRequestToEdit.leaveRequestId
        }
      ); 
  } 
  

  showSucessMessage(message:string) : void{
    this.snackBar.open(message,'Close',
    {duration:3000,
    
    horizontalPosition:'end',
      verticalPosition:'top',
        panelClass:['cardhead']
      })
      
      }
getLeaveTypeName(leavetypeId: string): string {
  const leaveType = this.leaveTypes.find((leave) => leave.leaveTypeId === leavetypeId);
  return leaveType ? leaveType.leaveTypeName : '';
}
getEmployeeName(empId: string): string { 
  const employee = this.employees.find((g) => g.empId === empId); 
  return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
} 

rejectleavePendding
(leaveRequest: LeaveRequest){
    
  var leaveRequestId=leaveRequest.leaveRequestId
  leaveRequest.leaveStatus="Admin-Rejected"
 console.log(leaveRequest)
  this.leaveRequestservice
  .updateLeaveRequest(leaveRequest,leaveRequestId)
  .subscribe(() =>{
    this.showSucessMessage('Sucessfully Rejected!!')
    
    this.leaveRequestservice.getAllLeaveRequestByStatus(this.leaveStatus).subscribe({
      next: (leaveRequest) => {
        this.leavePenddings = leaveRequest
        ;
      },
      error: (response) => {
        console.log(response);
      }
    });
  });
}

getDepartmentName(departmentId: string): string {
  const department = this.departments.find((de) => de.departmentId === departmentId);
  return department ? department.description : '';
}
employee:boolean;

getPositionName(positionId: string): string {

  const position = this.positions.find((position) => position.positionId === positionId);  
  console.log('position  ',position.name)
  this.employee=true
  return position ? position.name  : '';
}

approveleavePendding(leaveRequest: LeaveRequest){
    
  var leaveRequestId=leaveRequest.leaveRequestId
  leaveRequest.leaveStatus="Admin-Approved"
 console.log(leaveRequest)
  this.leaveRequestservice
  .updateLeaveRequest(leaveRequest,leaveRequestId)
  .subscribe(() =>{
    this.showSucessMessage('Sucessfully Approved!!')
    
    this.leaveRequestservice.getAllLeaveRequestByStatus(this.leaveStatus).subscribe({
      next: (leaveRequest) => {
        this.leavePenddings = leaveRequest
        ;
      },
      error: (response) => {
        console.log(response);
      }
    });
  });
}



}

