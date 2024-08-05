
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


import { Employee } from 'app/models/employee.model';
import { AssignSupervisor, Branch, Division, EducationLevel, EmployeePosition, Grade, Position, Step } from 'app/models/job-description.model';
import { DivisionService } from 'app/service/division.service';
import { EducationLevelService } from 'app/service/educationlevel.service';
import { EmployeeIdService } from 'app/service/employee-id.service';

import { EmployeePositionService } from 'app/service/employee-position';
import { PositionService } from 'app/service/position.service';
import { StepService } from 'app/service/step.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { BranchService } from 'app/service/branch.service';
import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'app/service/department.service';
import { Department } from 'app/models/education.model';
import { GradeService } from 'app/service/grade.service';
import { AssignSupervisorService } from 'app/service/AssignSupervisor';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-jobdescription',
  templateUrl: './jobdescription.component.html',
  styleUrls: ['./jobdescription.component.scss']
})
export class JobdescriptionComponent implements OnInit {
  employeePositionSaved: boolean = false;
  employeePositionUpdated: boolean = false;
employeepositions:EmployeePosition[]=[]

  divisions:Division[]= [];
  selectedDivision: string='';
  division: string='';
  department: string='';

  departments:Department[]=[];
  selectedDepartment:string='';
   positions:Position[]= [];
  selectedPosition: string='';
  branches:Branch[]= [];
  selectedBranch: string='';
 
  steps:Step[]= [];
  selectedStep: string='';
  
  levels: Grade[]=[];
  selectedLevel:string='';
  assignedSupervisors:AssignSupervisor[]=[];
  selectedFirstSupervisor:string='';
  selectedSecondSupervisor:string='';
  selectedThirdSupervisor:string='';
  selectedFourthSupervisor:string='';
  selectedFifthSupervisor:string='';
  


  buttons = [
    { label: ' Add Employee ' , route:"/employee-registration" },
         { label: '  List Employee ', route:"/employee-list" },
         {label:'Employee History', route:'/history'}
  
  ];
  employeePosition:EmployeePosition={
    pid:0,
    empId:"",
    id:undefined,
  divisionId:'',
  stepId: '',
  branchId: 'string',
  position: '',
  status:0,
  startDate: '',
  endDate: '2023-07-21T08:09:41.138Z',
createdBy: '',
createdDate: '2023-07-21T08:09:41.138Z',
updatedDate: '2023-07-21T08:09:41.138Z',
updatedBy: '',

  }
 



constructor(
  private divisionservice: DivisionService,
  private departmentservice: DepartmentService,
   private positionservice:PositionService ,
    private stepservice: StepService,
  private branchservice: BranchService,
  private employeepositionservice:EmployeePositionService,

  private employeeIdService:EmployeeIdService,
  private levelService: GradeService,
  private dialog: MatDialog,
  private assignSupervisorService:AssignSupervisorService,

  private router:Router,
  private snackBar :MatSnackBar){}
ngOnInit(): void{
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
this.levelService.getAllGrade()
.subscribe({
  next: (level) => {
    this.levels=level;
  },
  error(response){
    console.log(response)
  }
});
this.employeepositionservice.getAllEmployeePosition()
.subscribe({
  next: (employeePositions) => {
    this.employeepositions = employeePositions.filter(employeePositions => employeePositions.empId === this.employeeIdService.employeeId);
         
  },
  error(response){
    console.log(response)
  }
});

this.assignSupervisorService.getAllAssignSupervisor()
.subscribe({
  next: (assignedSupervisors) => {
    this.assignedSupervisors=assignedSupervisors;
    
  },
  error(response){
    console.log(response)
  }
});

this.stepservice.getAllStep()
.subscribe({
  next: (steps) => {
    this.steps=steps;
  },
  error(response){
    console.log(response)
  }
});
this.branchservice.getAllBranch()
.subscribe({
  next: (branchs) => {
    this.branches=branchs;
  },
  error(response){
    console.log(response)
  }
});


// this.employeepositionservice.getEmployeePosition(this.employeeIdService.employeeId) 
//   .subscribe({ 
//     next: (employeepositions) => { 
//       this.employeePosition = employeepositions; 
//           }, 
//     error(response) { 
//       console.log(response); 
//     }, 
// });
}
showSucessMessage(message:string) : void{
  this.snackBar.open(message,'Close',
  {duration:3000,
  
  horizontalPosition:'end',
    verticalPosition:'top',
      panelClass:['cardhead']
    })
    
    }

updateEmployeePosition(): void {
 
  
  this.employeePosition.divisionId = this.selectedDivision;
  this.employeePosition.position = this.selectedPosition;
  this.employeePosition.stepId = this.selectedStep;
  this.employeePosition.branchId = this.selectedBranch;
  this.employeepositionservice.updateEmployeePosition
  (this.employeePosition, this.employeePosition.id)
  .subscribe({
  
    next: (employeePosition) => { 
      this.showSucessMessage('Sucessfully Updated!!')
    
      this.employeepositionservice.getAllEmployeePosition().subscribe((employeePositions) => {
        this.employeepositions = employeePositions.filter(employeePositions => employeePositions.empId === this.employeeIdService.employeeId);})
      this.selectedDivision =  "";
      this.selectedPosition  ="" ;
       this.selectedStep= "" ;
       this.selectedBranch ="" ;
      this.employeePosition = {
          pid:0,
          empId:"",
          id:undefined,
        divisionId:'',
        stepId: '',
        branchId: 'string',
        position: '',
        status:0,
        startDate: '',
        endDate: '2023-07-21T08:09:41.138Z',
      createdBy: '',
      createdDate: '2023-07-21T08:09:41.138Z',
      updatedDate: '2023-07-21T08:09:41.138Z',
      updatedBy: '',
      };
    },
    error: (response) => {
      console.log(response);
    }
  });

}
addEmployeePosition(){   console.log("dkjhlghl",this.selectedDivision)
  this.employeePosition.empId = this.employeeIdService.employeeId;
  this.employeePosition.divisionId = this.selectedDivision;
  this.employeePosition.position = this.selectedPosition;
  this.employeePosition.stepId = this.selectedStep;
  this.employeePosition.branchId = this.selectedBranch; 

  this.employeepositionservice.addEmployeePosition(this.employeePosition)
  .subscribe({
  next:()=>{
    this.showSucessMessage('Sucessfully Added!!')
    
    this.employeepositionservice.getEmployeePosition(this.employeeIdService.employeeId) 
  .subscribe({ 
    next: (employeepositions) => { 
      this.employeePosition = employeepositions; 
          }, 
    error(response) { 
      console.log(response); 
    }, 
});
    // Add the
     this.employeepositions.push({ ...this.employeePosition });
     this.selectedDivision =  "";
     this.selectedPosition  ="" ;
      this.selectedStep= "" ;
      this.selectedBranch ="" ;
    this.employeePosition={
      pid:0,
      empId:'',
      id: undefined,
    divisionId:'',
    stepId: '',
    branchId: '',
    position: '',
    status:0,
    startDate: '',
    endDate: '2023-07-21T08:09:41.138Z',
  createdBy: '',
  createdDate: '2023-07-21T08:09:41.138Z',
  updatedDate: '2023-07-21T08:09:41.138Z',
  updatedBy: '',
  
    }
  },
   error(response){
    console.log(response)
  }

  })}
  
  onPositionSelected(): void {
   
    const selectedPosition = this.positions.find(position => position.positionId === this.selectedPosition);
   
   
    if (selectedPosition ) {
      
      const selectedDivision = this.divisions.find(division => division.divisionId === selectedPosition.divisionId);

console.log(this.assignedSupervisors)
const selectedassignedSupervisor= this.assignedSupervisors.find(assignedSupervisor => assignedSupervisor.positionId === selectedPosition.positionId);
console.log("Selected Position:", selectedPosition);
console.log("Selected Assigned Supervisor:", selectedassignedSupervisor);

if(selectedassignedSupervisor){
  this.selectedFirstSupervisor=this.getSupervisorName(selectedassignedSupervisor.firstSupervisor);
  this.selectedSecondSupervisor=this.getSupervisorName(selectedassignedSupervisor.secondSupervisor);
  this.selectedThirdSupervisor=this.getSupervisorName(selectedassignedSupervisor.thirdSupervisor);
  this.selectedFourthSupervisor=this.getSupervisorName(selectedassignedSupervisor.fourthSupervisor);
  this.selectedFifthSupervisor=this.getSupervisorName(selectedassignedSupervisor.fifthSupervisor);
}
//con
    const selectedDepartment = this.departments.find(department => department.departmentId === selectedDivision.departmentId);
      if (selectedDivision) {
        this.selectedDivision = selectedDivision.divisionId;
        this.division=selectedDivision.description
        this.selectedDepartment = selectedDepartment.departmentId;
        this.department=selectedDepartment.description
        
      } 
    }
  }
  onStepSelected(): void {
   // const selectedPosition = this.positions.find(position => position.positionId === this.selectedPosition);
     const selectedStep = this.steps.find(step => step.id === this.selectedStep);
    console.log(this.divisions.find(division => division.divisionId))
    if (selectedStep) {
    
      const selectedLevel= this.levels.find(level => level.levelId === selectedStep.levelId );
       console.log(this.departments.find(department => department.departmentId))
      if (selectedLevel) {
        this.selectedLevel = selectedLevel.description;
      } else {
        this.selectedLevel = 'not'; 
      }
    }
  }  getSupervisorName(positionId: string): string {
    const position = this.positions.find((position) => position.positionId === positionId);
    return position ? position.name : '';
  }
  getDivisionName(divisionId: string): string {
    const division = this.divisions.find((division) => division.divisionId === divisionId);
    return division ? division.description :'';
  }
  getPositionName(positionId: string): string {
    const position = this.positions.find((position) => position.positionId === positionId);
    return position ? position.name : '';
  }
  getStepName(stepId: string): string {
    const step = this.steps.find((step) => step.id === stepId);
    return step ? step.description : '';
  }

  getBranchName(branchId: string): string {
    const branch = this.branches.find((branch) => branch.id === branchId);
    return branch ? branch.name : '';
  }

  editEmployeePosition(employeePosition: EmployeePosition): void {
 
    const contactToEdit = this.employeepositions.find(employeePosition => employeePosition.id === employeePosition.id);
    this.employeePosition = contactToEdit;

     this.selectedDivision =  this.employeePosition.divisionId;
  this.selectedPosition  =this.employeePosition.position ;
   this.selectedStep= this.employeePosition.stepId ;
   this.selectedBranch =this.employeePosition.branchId ;
  }

  deleteEmployeePosition(EmployeePosition: EmployeePosition): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      // If the user confirms the deletion, we can call the service to delete the EmployeePosition.
      this.employeepositionservice.deleteEmployeePosition(EmployeePosition.id).subscribe(
        () => {
          // EmployeePosition deleted successfully, we can update the list of EmployeePositions after deletion.
          // Here, we are simply filtering out the deleted EmployeePosition from the EmployeePositions array.
          this.dialog.open(DeletesucessfullmessageComponent)
          this.employeepositionservice.getAllEmployeePosition().subscribe((employeePositions) => {
            this.employeepositions = employeePositions.filter(employeePositions => employeePositions.empId === this.employeeIdService.employeeId);})
      
        },
        (error) => {
          console.error(error);
          // If there was an error during deletion, you can show an error message.
          alert('Failed to delete the EmployeePosition. Please try again later.');
        }
      );
    }
  }
  
)}}
