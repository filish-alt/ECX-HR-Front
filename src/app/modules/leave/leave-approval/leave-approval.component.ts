import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Employee } from 'app/models/employee.model';
import { LeaveType } from 'app/models/leaveType.model';
import { LeaveRequest } from 'app/models/leaverequestmodel';
import { EmployeeDetailsModalServiceService } from 'app/service/employee-details-modal-service.service';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { EmployeeService } from 'app/service/employee.service';
import { LeaveRequestService } from 'app/service/leaveRequest.service';
import { LeaveTypeService } from 'app/service/leaveType.service';
import { EmployeeDetailsModalComponent } from '../employee-details-modal/employee-details-modal.component';
import { DivisionService } from 'app/service/division.service';
import { DepartmentService } from 'app/service/department.service';
import { PositionService } from 'app/service/position.service';
import { Division, EmployeePosition, Position } from 'app/models/job-description.model';
import { Department } from 'app/models/education.model';
import { EmployeePositionService } from 'app/service/employee-position';
import { Observable, of, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-leave-approval',
  templateUrl: './leave-approval.component.html',
  styleUrls: ['./leave-approval.component.css']
})
export class LeaveApprovalComponent {

  leaveTypes:LeaveType[]=[]
  selectedLeaveType: string='';
  selectedEmployee: string='';
  employees:Employee[]=[];
leaveApproved: boolean = false;
leaveRejected: boolean = false;
leaveRequests:LeaveRequest[]=[]; 
downloadFileUrl: string=''; 
divisions:Division[]= [];
  departments:Department[]=[];
   positions:Position[]= [];
   employeePosition:EmployeePosition;
   employeePositions:EmployeePosition[]=[];
   FileNull:boolean = false;
   id:string;
 leaveStatus:string="pendding";
 leaverejectStatus:string="Reject";
 empId="17320a72-e4bd-46b9-894a-dfe5bf3d967c";
 supervisor:string="";
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
  leavePenddings:LeaveRequest[]=[]
  leavependding:LeaveRequest;
  constructor(
   public employeeDetailsModalService: EmployeeDetailsModalServiceService,
    private leaveRequestservice: LeaveRequestService,
    private router: Router,
    private employeeService:EmployeeService,
    private leavetypeservice: LeaveTypeService,
    private employeeIdService: EmployeeIdService,
    private dialog: MatDialog,
    private divisionservice: DivisionService,
    private departmentservice: DepartmentService,
     private positionservice:PositionService ,
     private employeepositionservice:EmployeePositionService,
     private employeepostionservice : EmployeePositionService,
     private snackBar :MatSnackBar
  ) { }

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

this.employeepostionservice.getEmployeePosition(this.empId)  
.subscribe({  
  next: (employeePostion) => { 
    // this.leaveRequest.empId = this.selectedEmployee; 
    this.supervisor=employeePostion.position
   console.log( this.supervisor)
   }, 
  error: (response) => { 
    console.log(response); 
  } 
}); 


    this.leaveRequestservice.getLeaveRequestByStatus(this.leaveStatus,this.supervisor).subscribe({
      next: (leaveRequest) => {
        this.leavePenddings = leaveRequest
        ;
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
this.leaveRequestservice.getAllLeaveRequest().
subscribe({
  next: (leave) => {
  //this.leaveRequest.leaveTypeId = this.selectedLeaveType;
    this.leaveRequests= leave
    ;
  },
  error: (response) => {
    console.log(response);
  }
});  
  }
//   getPosition(empId:string){

//     this.employeepositionservice.getEmployeePosition(empId) 
//   .subscribe({ 
//     next: (employeepositions) => { 
//       var position = employeepositions.position; 
//      console.log(this.getPositionName(position))
//       return  this.getPositionName(position);
//           }, 

// });

//   }


capitalizeFirstLetter(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}
  getPosition(empId: string): string{

    this.employeepositionservice.getAllEmployeePosition()
    .subscribe({
      next: (employeePositions) => {
        this.employeePosition = employeePositions.find(employeePosition => employeePosition.empId === empId);
      
            
      },
     
    }); 
    const  positionId=this.employeePosition.position
    const position = this.positions.find((position) => position.positionId === positionId);  
    console.log('position  ',position.name)
    return position ? position.name : '';

   // return  this.employeePosition? this.employeePosition.position:" ";
  }
  // getPosition(empId: string){
  //   return this.employeepositionservice.getAllEmployeePosition().pipe(
  //     switchMap(employeePositions => {
  //       const position = employeePositions.find(employeePosition => employeePosition.empId === empId);
  //   console.log(position.position)
  //       return (position ? this.getPositionName(position.position) : 'no name');
      
  //     })
  //   );
  // }
  
  getDivisionName(divisionId: string): string {
    const division = this.divisions.find((division) => division.divisionId === divisionId);
    return division ? division.description : '';
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
  openEmployeeDetailsModal(empId: string) {
    const dialogRef =this.dialog.open(EmployeeDetailsModalComponent,{
       // Set the width to 100% to maximize
      // Apply your custom CSS class
    })
    dialogRef.componentInstance.openModal(empId)

  }
  getLeaveTypeName(leavetypeId: string): string {
    const leaveType = this.leaveTypes.find((leave) => leave.leaveTypeId === leavetypeId);
    return leaveType ? leaveType.leaveTypeName : '';
  }
  getEmployeeName(empId: string): string { 
    const employee = this.employees.find((g) => g.empId === empId); 
    return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
  } 
  fetchAndDisplayPDF(leave: LeaveRequest):void { 
    // Call your service method to fetch the PDF file  
    console.log(leave.leaveRequestId)
    const leaveRequestToEdit = this.leaveRequests.find(leaveRequest => leaveRequest.leaveRequestId === leave.leaveRequestId); 
    console.log(leave.leaveRequestId)
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
  approveleavePendding(leaveRequest: LeaveRequest){
    
    var leaveRequestId=leaveRequest.leaveRequestId
    leaveRequest.leaveStatus="First-Approved"
   console.log(leaveRequest)
    this.leaveRequestservice
    .updateLeaveRequest(leaveRequest,leaveRequestId)
    .subscribe(() =>{
      this.showSucessMessage('Sucessfully Approved!!')
      
      this.leaveRequestservice.getLeaveRequestByStatus(this.leaveStatus,this.supervisor).subscribe({
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


rejectleavePendding
(leaveRequest: LeaveRequest){
    
  var leaveRequestId=leaveRequest.leaveRequestId
  leaveRequest.leaveStatus="Rejected"
 console.log(leaveRequest)
  this.leaveRequestservice
  .updateLeaveRequest(leaveRequest,leaveRequestId)
  .subscribe(() =>{
    this.leaveRejected = true;
console.log("updated")
      setTimeout(() => {
        this.leaveRejected= false;
      }, 2000);

    
    this.leaveRequestservice.getLeaveRequestByStatus(this.leaverejectStatus,this.supervisor).subscribe({
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

