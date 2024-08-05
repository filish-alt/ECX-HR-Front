import { ChangeDetectorRef, Component, SimpleChanges } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { CombinedEmployeeData, Employee, Supervisor } from 'app/models/employee.model'; 
import { EmployeeService } from 'app/service/employee.service'; 
import { MatDialog, MatDialogRef } from '@angular/material/dialog'; 
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component'; 

import { SupervisorService } from 'app/service/supervisor.service';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { DivisionService } from 'app/service/division.service';
import { StepService } from 'app/service/step.service';
import { EmployeePositionService } from 'app/service/employee-position';
import { BranchService } from 'app/service/branch.service';
import { PositionService } from 'app/service/position.service';
import { GradeService } from 'app/service/grade.service';
import { Branch, Division, EducationLevel, Grade, Position, Step } from 'app/models/job-description.model';
import { Department } from 'app/models/education.model';
import { LeaveTypeService } from 'app/service/leaveType.service';
import { LeaveType } from 'app/models/leaveType.model';
import { EmployeeDetailsModalComponent } from '../leave/employee-details-modal/employee-details-modal.component';

@Component({ 
  selector: 'app-employee-list', 
  templateUrl: './employee-list.component.html', 
  styleUrls: ['./employee-list.component.scss'] 
}) 
 
 
export class EmployeeListComponent { 
  searchTerm: string = ''; 
  pageSize: number = 10; 
  currentPage: number = 1; 

  filteredEmployees: Employee[] = []; 
  employees:Employee[]= []; 
  allEmployees:any=[]; 
  searchText:string[]; 
  selectedEmployee: Employee | null = null;
  showAllDetails = false;
    buttons = [    
      { label: ' Add Employee ', route: '/employee-registration' }, 
      { label: '  List Employee ', route: '/employee-list' },
      {label:'Employee History', route:'/history'}
    ] 
  dataSource: any; 
  divisions:Division[]= [];
  departments:Department[]=[];
   positions:Position[]= [];
  branches:Branch[]= [];
  steps:Step[]= [];
  levels: Grade[]=[];
  educationlevels:EducationLevel[]= [];
 
constructor(private employeeservice: EmployeeService, 
  private dialog: MatDialog, 
  private divisionservice: DivisionService,


  private changeDetectorRef: ChangeDetectorRef, 

  private stepservice: StepService,
  private branchservice: BranchService,

  private positionservice:PositionService ,

  private levelService: GradeService,
 
 private supervisorService:SupervisorService,
  // private snackBar: MatSnackBar, 
  private router: Router , 
  
  private leavetypeservice: LeaveTypeService,
  ){ 
    
  } 

ngOnInit(): void{ 

this.employeeservice.getAllEmployees() 
.subscribe({ 
  next: (employees) => { 
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
  
    this.employees=employees; 
    this.filteredEmployees = employees;
    const lastEmployee = this.employees.pop(); 
    this.employees.unshift(lastEmployee); 
    this.employees.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()); 
    this.filteredEmployees = this.employees.slice(startIndex, endIndex);
  }, 
     
  error(response){ 
    console.log(response) 
  } 
}); 
 

} 
leaveTypes:LeaveType[]=[] 
getLeaveTypeName(leavetypeId: string): string { 
  const leaveType = this.leaveTypes.find((leave) => leave.leaveTypeId === leavetypeId); 
  return leaveType ? leaveType.leaveTypeName : ''; 
} 

openEmployeeDetailsModal(empId: string) {
  const dialogRef =this.dialog.open(EmployeeDetailsModalComponent,{
     // Set the width to 100% to maximize
    // Apply your custom CSS class
  })
  dialogRef.componentInstance.openModal(empId)

}

employeeData: CombinedEmployeeData;
detail(empId:string){

  this.employeeservice.getEmployeeData(empId).subscribe(
  (data) => {
    this.employeeData = data;
    console.log('Employee:', data.employee);
    console.log('Addresses:', data.addresses);
    console.log('Emergency Contacts:', data.workExperiences);
  
   
  },
  (error) => {
    console.error('Error:', error);
  }
);}


onNextPage() {
  this.currentPage++;
  this.updateFilteredEmployees();
}

// Function to handle the "Previous" button click
onPreviousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updateFilteredEmployees();
  }}
  getEducationName(educationLevelId: string): string {
    const educationLevel = this.educationlevels.find((educationLevel) => educationLevel.id === educationLevelId);
    return educationLevel ? educationLevel.educationName : '';
  }
  getSupervisorName(positionId: string): string {
    const position = this.positions.find((position) => position.positionId === positionId);
    return position ? position.name : '';
  }
  getDivisionName(divisionId: string): string {
    const division = this.divisions.find((division) => division.divisionId === divisionId);
    return division ? division.description : '';
  }

  getStepName(stepId: string): string {
    const step = this.steps.find((step) => step.id === stepId);
    return step ? step.description : '';
  }

  getBranchName(branchId: string): string {
    const branch = this.branches.find((branch) => branch.id === branchId);
    return branch ? branch.name : '';
  }
  getPositionName(positionId: string): string {
    const position = this.positions.find((position) => position.positionId === positionId);
    return position ? position.name : '';
  }
getEmployees() {  
  this.employeeservice.getAllEmployees().subscribe(  
    (employees) => {  
      this.employees = employees;  
    },  
    (error) => {  
      console.log(error);  
    }  
  );  
}  capitalizeFirstLetter(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}
private updateFilteredEmployees() {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;

  this.filteredEmployees = this.employees.slice(startIndex, endIndex);
  
}

onSearch() {


 // this.filteredEmployees = this.employees; 
  if (this.searchTerm.trim() === '') {
 
    this.filteredEmployees = this.employees;
  } else {
 
    this.filteredEmployees = this.employees.filter(employee => {
      
      return (
        employee.firstName.toLowerCase().startsWith(this.searchTerm.toLowerCase()) ||
        employee.middleName.toLowerCase().startsWith(this.searchTerm.toLowerCase()) ||
        employee.sex.toLowerCase().startsWith(this.searchTerm.toLowerCase()) ||
        employee.ecxId.toLowerCase().includes(this.searchTerm.toLowerCase()) 
       
      );
      
      this.changeDetectorRef.detectChanges();
    });
  }
 
  }

  deleteEmployee(id: string) { 
    // Open the confirmation dialog 
    const dialogRef: MatDialogRef<DeleteConfirmationComponent> 
    = this.dialog.open(DeleteConfirmationComponent);
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) { 
        this.employeeservice.deleteEmployee(id).subscribe({
          next: () => {
                  
              }, 
              error(response){ 
                console.log(response) 
              }
            });
            this.employeeservice.getAllEmployees().subscribe((employees) => {
              this.filteredEmployees = employees;
            });
            this.dialog.open(DeletesucessfullmessageComponent)
                
          } });
      
      }
    
    

editEmployee(employee: Employee): void { 
  // Here, we will navigate to the edit page for the selected EmergencyContact. 
  this.router.navigate(["/edit-employee", employee.empId]); 
} 
  
  
 
 
getFirstSupervisorName(firstSupervisor: string): string { 
  const employee = this.employees.find((g) => g.empId === firstSupervisor); 
  return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
} 
getSecondSupervisorName(secondSupervisor: string): string { 
  const employee = this.employees.find((g) => g.empId === secondSupervisor); 
  return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
} 


}
