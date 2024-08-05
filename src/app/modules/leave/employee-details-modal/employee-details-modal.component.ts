import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Department } from 'app/models/education.model';
import { CombinedEmployeeData } from 'app/models/employee.model';
import { Branch, Division, EducationLevel, EmployeePosition, Grade, Position, Step } from 'app/models/job-description.model';
import { LeaveType } from 'app/models/leaveType.model';
import { BranchService } from 'app/service/branch.service';
import { DepartmentService } from 'app/service/department.service';
import { DivisionService } from 'app/service/division.service';

import { EmployeePositionService } from 'app/service/employee-position';
import { EmployeeService } from 'app/service/employee.service';
import { GradeService } from 'app/service/grade.service';
import { LeaveRequestService } from 'app/service/leaveRequest.service';
import { PositionService } from 'app/service/position.service';
import { StepService } from 'app/service/step.service';
import { BehaviorSubject, forkJoin } from 'rxjs';

@Component({
  selector: 'app-employee-details-modal',
  templateUrl: './employee-details-modal.component.html',
  styleUrls: ['./employee-details-modal.component.css']
})
export class EmployeeDetailsModalComponent {
 
  @ViewChild('printableCard') printableCard !:ElementRef
  
  divisions:Division[]= [];
  departments:Department[]=[];

  branches:Branch[]= [];
  steps:Step[]= [];
  levels: Grade[]=[];
  educationlevels:EducationLevel[]= [];
  constructor(
    private employeeservice: EmployeeService,
    public dialogRef: MatDialogRef<EmployeeDetailsModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private divisionservice: DivisionService,
      private departmentservice: DepartmentService,
       private positionservice:PositionService ,
        private stepservice: StepService,
        private levelService: GradeService,
      private branchservice: BranchService,) {} // Replace with your actual backend service

      selectedEmployee: string;
      selectedPosition:string;
      selectedDivision:string;
      selectedBranch:string;
      division:Division[];
      positions:Position[]
      employeePostions:EmployeePosition[]
    



ngOnInit(): void {
  this.branchservice.getAllBranch()
.subscribe({
  next: (branchs) => {
    this.branches=branchs;
  },
  error(response){
    console.log(response)
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
  this.stepservice.getAllStep()
.subscribe({
  next: (steps) => {
    this.steps=steps;
  },
  error(response){
    console.log(response)
  }
});
}

private isOpen = new BehaviorSubject<boolean>(false);
isOpen$ = this.isOpen.asObservable();




public employeeName = new BehaviorSubject<string | null>(null); // Corrected property name
employeeName$ = this.employeeName.asObservable();
leaveTypes:LeaveType[]=[] 
getLeaveTypeName(leavetypeId: string): string { 
  const leaveType = this.leaveTypes.find((leave) => leave.leaveTypeId === leavetypeId); 
  return leaveType ? leaveType.leaveTypeName : ''; 
} 
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
  
  const position = this.positions.find((g) => g.positionId === positionId);
  return position ? (position.name )  : 'Unknown position';
  

}
employeeData: CombinedEmployeeData;
openModal(empId: string) {
  this.selectedEmployee=empId
  this.employeeservice.getEmployeeData(this.selectedEmployee).subscribe(
    (data) => {
      this.employeeData = data;
      console.log('Employee:', data.employee);
      console.log('Addresses:', data.addresses);
      console.log('Emergency Contacts:', data.employeePostions);
    
     
    },
    (error) => {
      console.error('Error:', error);
    }
  );

       
  }

closeModal() {
  this.isOpen.next(false);
}
printCard(){
  let printContents=this.printableCard.nativeElement.innerHTML;
  let orginalContent=document.body.innerHTML;
  document.body.innerHTML=printContents
  window.print();
  document.body.innerHTML=orginalContent;
 }
 onCancelClick(): void {
  this.dialogRef.close(true);
}
}
