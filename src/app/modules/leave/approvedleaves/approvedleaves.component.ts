import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Attendance } from 'app/models/Attendance.model';
import { Department } from 'app/models/education.model';
import { Employee } from 'app/models/employee.model';
import { Division, EmployeePosition, Position } from 'app/models/job-description.model';
import { LeaveType } from 'app/models/leaveType.model';
import { LeaveRequest } from 'app/models/leaverequestmodel';
import { DepartmentService } from 'app/service/department.service';
import { DivisionService } from 'app/service/division.service';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { EmployeePositionService } from 'app/service/employee-position';
import { EmployeeService } from 'app/service/employee.service';
import { LeaveRequestService } from 'app/service/leaveRequest.service';
import { LeaveTypeService } from 'app/service/leaveType.service';
import { PositionService } from 'app/service/position.service';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-approvedleaves',
  templateUrl: './approvedleaves.component.html',
  styleUrls: ['./approvedleaves.component.css']
})
export class ApprovedleavesComponent {
  searchTerm: string = ''; 
  leaveApprove:boolean
  leaveTypes:LeaveType[]=[]
  selectedLeaveType: string='';
  selectedEmployee: string='';
  employees:Employee[]=[];
leaveApproved: boolean = false;
leave: boolean = false;
leaveRequests:LeaveRequest[]=[]; 
downloadFileUrl: string=''; 
divisions:Division[]= [];
  departments:Department[]=[];
   positions:Position[]= [];
   employeePosition:EmployeePosition;
   filteredLeave: LeaveRequest[]; // Array to hold filtered attendances
   fromDate: string; // Variable to store the "From" date
   toDate: string;
   FileNull:boolean = false;
   id:string;
 leaveStatus:string="Admin-Approved";
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
  approvedLeaves:LeaveRequest[]=[]
  leavependding:LeaveRequest;
  constructor(
 
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
     private snackBar :MatSnackBar
  ) { }

  ngOnInit(): void {
    this.divisionservice.getAllDivisions()
    .subscribe({
      next: (division) => {
        this.divisions=division;
      },
      
    });
    this.departmentservice.getAllDepartment()
    .subscribe({
      next: (department) => {
        this.departments=department;
      },
     
    });
    this.positionservice.getAllPosition()
    .subscribe({
      next: (positions) => {
        this.positions=positions;
            },
    });
  
    this.employeeService.getAllEmployees() 
.subscribe({ 
  next: (employees) => {
    // this.leaveRequest.empId = this.selectedEmployee;
    this.employees=employees
   },
  
});


    this.leaveRequestservice.getAllLeaveRequestByStatus(this.leaveStatus).subscribe({
      next: (leaveRequest) => {
        this.approvedLeaves = leaveRequest;
        this.filteredLeave=leaveRequest;
        
        console.log(leaveRequest)
      },
      
    });
this.leavetypeservice.getAllLeaveType().
subscribe({
  next: (leaveType) => {
  //this.leaveRequest.leaveTypeId = this.selectedLeaveType;
    this.leaveTypes= leaveType
    ;
  },
  
});   

  }
  
  showSucessMessage(message:string) : void{
    this.snackBar.open(message,'Close',
    {duration:3000,
    
    horizontalPosition:'end',
      verticalPosition:'top',
        panelClass:['cardhead']
      })
      
      }
  capitalizeFirstLetter(text: string): string {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  getPosition(empId: string): Observable<string> {
    return this.employeepositionservice.getAllEmployeePosition().pipe(
      switchMap(employeePositions => {
        const position = employeePositions.find(employeePosition => employeePosition.empId === empId);
        return of(position ? this.getPositionName(position.position) : '');
      })
    );
  }
  
  getDivisionName(divisionId: string): string {
    const division = this.divisions.find((division) => division.divisionId === divisionId);
    return division ? division.description : '';
  }
  getDepartmentName(departmentId: string): string {
    const department = this.departments.find((de) => de.departmentId === departmentId);
    return department ? department.description : '';
  }
  getPositionName(positionId: string): string {

    const position = this.positions.find((position) => position.positionId === positionId);  
    
    return position ? position.name : '';
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
    const leaveRequestToEdit = this.filteredLeave.find(leaveRequest => leaveRequest.leaveRequestId === leave.leaveRequestId); 
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
  
  
  approveleavePendding(leaveRequest: LeaveRequest){
    
    var leaveRequestId=leaveRequest.leaveRequestId
    leaveRequest.leaveStatus="First-Approved"
   console.log(leaveRequest)
    this.leaveRequestservice
    .updateLeaveRequest(leaveRequest,leaveRequestId)
    .subscribe(() =>{
      this.showSucessMessage('Sucessfully Approved!!')
      
      this.leaveRequestservice.getAllLeaveRequestByStatus(this.leaveStatus).subscribe({
        next: (leaveRequest) => {
          this.approvedLeaves = leaveRequest
          ;
        },
        error: (response) => {
          console.log(response);
        }
      });
    });
}

onSearch() {


  // this.filteredEmployees = this.employees; 
   if (this.searchTerm.trim() === '') {

     this.filteredLeave =this.approvedLeaves;
   } else {
  
     this.filteredLeave = this.approvedLeaves.filter(at => {
       
       return (
         this.getDepartmentName(at.departmentId).toLowerCase().startsWith(this.searchTerm.toLowerCase()) ||
         this.getPositionName(at.employeePositionId).toLowerCase().startsWith(this.searchTerm.toLowerCase()) ||
         this.getEmployeeName(at.empId).toLowerCase().startsWith(this.searchTerm.toLowerCase()) 
          );
       
       
     });
   }
  
   }
 
   filterByDateRange() {
    if (this.fromDate && this.toDate) {
      let fromDate = new Date(this.fromDate);
      let toDate = new Date(this.toDate);
  
      // Subtract one day from the "From" date
      toDate.setDate(toDate.getDate() + 1);
  
      this.filteredLeave = this.approvedLeaves.filter(at => {
        const attendanceStartDate = new Date(at.startDate);
        const attendanceEndDate = new Date(at.endDate);
        return attendanceStartDate >= fromDate && attendanceEndDate <= toDate;
      });
    } else {
      // If both dates are not selected, show all attendances
      this.filteredLeave = this.approvedLeaves;
         
      this.leave=true;
      setTimeout(() => {
        this.leave= false;
      }, 2000);}}
  }

