
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeePositionService } from 'app/service/employee-position';
import { AssignSupervisor, Branch, Division, EmployeePosition, Grade, Position, Step } from 'app/models/job-description.model';
import { DivisionService } from 'app/service/division.service';
import { StepService } from 'app/service/step.service';
import { PositionService } from 'app/service/position.service';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { BranchService } from 'app/service/branch.service';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Department } from 'app/models/education.model';
import { AssignSupervisorService } from 'app/service/AssignSupervisor';
import { DepartmentService } from 'app/service/department.service';
import { GradeService } from 'app/service/grade.service';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-job-description',
  templateUrl: './edit-job-description.component.html',
  styleUrls: ['./edit-job-description.component.scss']
})
export class EditJobDescriptionComponent implements OnInit {
  employeePositionId: string;
  employeePosition: EmployeePosition ={
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
  ;
  employeePositionUpdated: boolean = false;
  employeePositions:EmployeePosition[]=[];
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

  selectedFirstSupervisor:string='';
  selectedSecondSupervisor:string='';
  selectedThirdSupervisor:string='';
  selectedFourthSupervisor:string='';
  selectedFifthSupervisor:string='';
  assignedSupervisors:AssignSupervisor[]=[];

  employeePositionSaved:boolean = false;


  buttons = [
    { label: ' Add Employee ', route: '/employee-registration' },
    { label: '  List Employee ', route: '/employee-list' },
    {label:'Employee History', route:'/history'}
  ];
  constructor(
    private employeePositionService: EmployeePositionService,
    private route: ActivatedRoute,
    private router: Router,
    private divisionService: DivisionService,
    private stepService: StepService,
    private positionService:PositionService ,
    private employeeIdService:EmployeeIdService,
    private branchService:BranchService,
    private dialog: MatDialog,
    private assignSupervisorService:AssignSupervisorService,
    private departmentservice:DepartmentService,
    private levelService:GradeService,
    private snackBar :MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.employeePositionId = params['id'].toString();
      // this.getemployeePositionById()
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


this.assignSupervisorService.getAllAssignSupervisor()
.subscribe({
  next: (assignedSupervisors) => {
    this.assignedSupervisors=assignedSupervisors;
    
  },
  error(response){
    console.log(response)
  }
});



        this.employeePositionService.getAllEmployeePosition().subscribe((employeePositions) => {
          this.employeePositions = employeePositions.filter(employeePositions => employeePositions.empId === this.employeeIdService.employeeId);
         
          // this.selectedDivision =  this.employeePosition.divisionId;
          // this.selectedPosition  =this.employeePosition.position ;
          //  this.selectedStep= this.employeePosition.stepId ;
          //  this.selectedBranch =this.employeePosition.branchId ;;
        });
      
        // Fetch the availabel divisions and populate the divisions array
        this.divisionService.getAllDivisions().subscribe((divisions) => {
          this.divisions = divisions;
        });
      
        // Fetch the availabel positions and populate the positions array
        this.positionService.getAllPosition().subscribe((positions) => {
          this.positions = positions;
        });
      
        // Fetch the availabel branches and populate the branches array
        this.branchService.getAllBranch().subscribe((branches) => {
          this.branches = branches;
        });
      
        // Fetch the availabel steps and populate the steps array
        this.stepService.getAllStep().subscribe((steps) => {
          this.steps = steps;
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
  getemployeePositionById(): void {
    this.employeePositionService.getEmployeePosition(this.employeeIdService.employeeId).subscribe(
      (employeePosition) => {
        this.employeePosition = employeePosition;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  updateEmployeePosition(): void {
 
  
    this.employeePosition.divisionId = this.selectedDivision;
    this.employeePosition.position = this.selectedPosition;
    this.employeePosition.stepId = this.selectedStep;
    this.employeePosition.branchId = this.selectedBranch;
    this.employeePositionService.updateEmployeePosition
    (this.employeePosition, this.employeePosition.id)
    .subscribe({
    
      next: (employeePosition) => { 
        this.showSucessMessage('Sucessfully Updated!!')
        this.employeePositionService.getAllEmployeePosition().subscribe((employeePositions) => {
          this.employeePositions = employeePositions.filter(employeePositions => employeePositions.empId === this.employeeIdService.employeeId);})
         
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
    
  onPositionSelected(): void {
   
    const selectedPosition = this.positions.find(position => position.positionId === this.selectedPosition);
   
    //console.log( this.positions.find(position => position.positionId))
    if (selectedPosition ) {
      
      const selectedDivision = this.divisions.find(division => division.divisionId === selectedPosition.divisionId);
//console.log(this.divisions.find(division => division.divisionId))
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
  } 
  
  getSupervisorName(positionId: string): string {
    const position = this.positions.find((position) => position.positionId === positionId);
    return position ? position.name : '';
  }
  editEmployeePosition(EmployeePosition: EmployeePosition): void {
 
    const contactToEdit = this.employeePositions.find(employeePosition => employeePosition.id === EmployeePosition.id);
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
      this.employeePositionService.deleteEmployeePosition(EmployeePosition.id).subscribe(
        () => {
          // EmployeePosition deleted successfully, we can update the list of EmployeePositions after deletion.
          // Here, we are simply filtering out the deleted EmployeePosition from the EmployeePositions array.
          this.dialog.open(DeletesucessfullmessageComponent)
          this.employeePositionService.getAllEmployeePosition().subscribe((employeePositions) => {
            this.employeePositions = employeePositions.filter(employeePositions => employeePositions.empId === this.employeeIdService.employeeId);})
      
        },
        (error) => {
          console.error(error);
          // If there was an error during deletion, you can show an error message.
          alert('Failed to delete the EmployeePosition. Please try again later.');
        }
      );
    }
  }
  
)}

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
  
  addEmployeePosition(){
    this.employeePosition.empId = this.employeeIdService.employeeId;
    this.employeePosition.divisionId = this.selectedDivision;
    this.employeePosition.position = this.selectedPosition;
    this.employeePosition.stepId = this.selectedStep;
    this.employeePosition.branchId = this.selectedBranch;
    this.employeePositionService.addEmployeePosition(this.employeePosition)
    .subscribe({
    next:()=>{
      this.showSucessMessage('Sucessfully Added!!')
       this.employeePositions.push({ ...this.employeePosition });
  
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
}
