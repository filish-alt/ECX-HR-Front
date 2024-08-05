
import { Router } from '@angular/router';
import { EducationLevel } from 'app/models/job-description.model';
import { EducationLevelService } from 'app/service/educationlevel.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { Component, OnInit } from '@angular/core';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-education-level',
  templateUrl: './education-level.component.html',
  styleUrls: ['./education-level.component.css']
})
export class EducationLevelComponent implements OnInit {
  educationLevels:EducationLevel[]=[];
  educationLevelSaved:boolean=false
  addEducationLevelRequest: EducationLevel={
    educationName:'',
     pid:0,
  id: undefined,
createdBy: '',
createdDate: '2023-07-21T13:28:13.132Z',
updatedDate: '2023-07-21T13:28:13.132Z',
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
  constructor(private educationLevelService :EducationLevelService,
    private router:Router,private dialog:MatDialog,
    private snackBar :MatSnackBar) { }

  ngOnInit(): void {
    this.educationLevelService.getAllEducationLevels()
    .subscribe({
      next: (educationlevels) => {
        this.educationLevels=educationlevels;
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
  addEducationLevel(){

    this.educationLevelService.addEducationLevel(this.addEducationLevelRequest)
    .subscribe({
    next:(educationLevel)=>{
 
      this.showSucessMessage('Sucessfully Added!!')

      this.educationLevels.push({ ...this.addEducationLevelRequest });

      this.addEducationLevelRequest = {
        educationName:'',
        pid:0,
     id: undefined,
   createdBy: '',
   createdDate: '2023-07-21T13:28:13.132Z',
   updatedDate: '2023-07-21T13:28:13.132Z',
   updatedBy: '',
   status:0,
       
    
      };
    },
     error(response){
      console.log(response)
    }
    })}
    deleteEducationLevel(id: string) {
      const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // User confirmed deletion, proceed with the delete request
          this.educationLevelService.deleteEducationLevel(id).subscribe({
            next: () => {
              // Remove the deleted education level from the educationLevels array using filter
              this.dialog.open(DeletesucessfullmessageComponent)
              this.educationLevelService.getAllEducationLevels()
    .subscribe({
      next: (educationlevels) => {
        this.educationLevels=educationlevels;
      },
      error(response){
        console.log(response)
      }
    });    },
            error(response) {
              console.log(response);
            },
          });
        }
      });}
}
