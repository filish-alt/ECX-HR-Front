
import { Router } from '@angular/router';
import { Grade, Step} from 'app/models/job-description.model';
import { GradeService } from 'app/service/grade.service';
import { StepService } from 'app/service/step.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { Component, OnInit } from '@angular/core';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {
  stepSaved:boolean=false
  grades:Grade[]= [];
  selectedGrade: string='';
steps:Step[]=[];


  addStepRequest:Step={
    pId: 0,
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
    salary:0,
   salaryTypeId: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
   levelId: '',
    description:'',
    createdBy: '',
    createdDate: "2023-07-21T13:28:13.132Z",
  updatedDate: "2023-07-21T13:28:13.132Z",
    updatedBy: '',
    status:0,
   
}

buttons = [
  { label: 'Structure',
  dropdownOptions: [
     { label: 'Position',route:"/admin/position"  },
     { label: 'Department',  route:"/admin/department"  },
     { label: 'Division',  route:"/admin/division"  },
     { label: 'Branch',  route:"/admin/branch"  }
 
   ]},
   { label: 'Level',
   dropdownOptions: [
       { label: 'Step', route:"/admin/step" },
          { label: 'Grade', route:"/admin/grade" },
    ]},
    { label: 'Supervisor',
    dropdownOptions: [
     { label: 'Supervisor', route:"/admin/supervisor" },
      { label: 'Assign-Supervisor', route:"/admin/assign-supervisor" },
     ]},
     { label: 'Leave',
     dropdownOptions: [
      { label: 'Holiday', route:"/holiday" },
      { label: 'Leave-Type', route:"/leave/leave-type" },
     ]},
 { label: 'Education-Level' , route:"/admin/education-level"},
 { label: 'PayRoll',
 dropdownOptions: [
  { label: 'Tax',route:"/admin/tax"  },
  { label: 'Bank',  route:"/admin/bank"  },
  { label: 'DeductionType',route:"/admin/deductionType" },
  { label: 'AllowanceType',  route:"/admin/allowanceType"  }
  

  ]}, ];
  constructor( private gradeservice: GradeService,
    private dialog:MatDialog, 
    private stepservice: StepService,
    private router:Router,
    private snackBar :MatSnackBar) { }

  ngOnInit(): void {
    this.gradeservice.getAllGrade()
    .subscribe({
      next: (grades) => {
        this.grades=grades;
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
  showSucessMessage(message:string) : void{
    this.snackBar.open(message,'Close',
    {duration:3000,
    
    horizontalPosition:'end',
      verticalPosition:'top',
        panelClass:['cardhead']
      })
      
      }
  addstep(){
    this.addStepRequest.levelId = this.selectedGrade;
  this.addStepRequest.description="G".concat(this.getGradeName(this.selectedGrade).charAt(6)).concat(" ").concat(this.addStepRequest.description);
    this.stepservice.addStep(this.addStepRequest)
    .subscribe({
    next:(step)=>{

      this.showSucessMessage('Sucessfully Added!!')

      this.steps.push({ ...this.addStepRequest });

      this.addStepRequest={
        pId: 0,
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
        salary:0,
       salaryTypeId: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
       levelId: '',
        description:'',
        createdBy: '',
        createdDate: "2023-07-21T13:28:13.132Z",
      updatedDate: "2023-07-21T13:28:13.132Z",
        updatedBy: '',
        status:0,
       
    
      }
    },
     error(response){
      console.log(response)
    }
    })}
    getGradeName(levelId: string): string {
      const grade = this.grades.find((g) => g.levelId === levelId);
      return grade ? grade.description : 'Unknown Grade';
    }

    deleteStep(id: string) {
      const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // User confirmed deletion, proceed with the delete request
          this.stepservice.deleteStep(id).subscribe({
            next: () => {
              // Remove the deleted step from the steps array using filter
              this.dialog.open(DeletesucessfullmessageComponent)
              this.stepservice.getAllStep()
              .subscribe({
                next: (steps) => {
                  this.steps=steps;
                },
                error(response){
                  console.log(response)
                }
              });
            
            },
            error(response) {
              console.log(response);
            },
          });
        }
      });
    }
}
