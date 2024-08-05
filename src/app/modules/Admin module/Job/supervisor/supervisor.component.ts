import { Router } from '@angular/router';
import { SupervisorService } from 'app/service/supervisor.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { Component } from '@angular/core';
import { Position } from 'app/models/job-description.model';
import { Supervisor } from 'app/models/employee.model';
import { PositionService } from 'app/service/position.service';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class SupervisorComponent {
  supervisorSaved:boolean=false
  positions:Position[]= [];
  selectedPosition: string='';
  supervisors:Supervisor[]=[];

  addSupervisorRequest: Supervisor={

  id: undefined,
  positionId: '',
createdBy: '',
createdDate: '2023-07-26T11:40:51.509Z',
updatedDate: '2023-07-26T11:40:51.509Z',
updatedBy: '',
status:0,
pId: 0,
supervisorLevel: '',

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

  constructor(private positionservice: PositionService ,
    private dialog:MatDialog, private supervisorservice :SupervisorService ,
    private router:Router,
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
      },
      
    });
    this.supervisorservice.getAllSupervisors()
    .subscribe({
      next: (supervisors) => {
        this.supervisors=supervisors;
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
  addSupervisor(){
    this.addSupervisorRequest.positionId = this.selectedPosition;
    this.supervisorservice.addSupervisor(this.addSupervisorRequest)
    .subscribe({
    next:(supervisor)=>{
      this.supervisorSaved = true;
      setTimeout(() => {
        this.supervisorSaved = false;
      }, 2000);
      // Add the current work experience to the array
      this.supervisors.push({ ...this.addSupervisorRequest });
      // Reset the form fields


      this.addSupervisorRequest = {
       
  id: undefined,
  positionId: '',
createdBy: '',
createdDate: '2023-07-26T11:40:51.509Z',
updatedDate: '2023-07-26T11:40:51.509Z',
updatedBy: '',
status:0,
pId: 0,
supervisorLevel: '',
      };
    },
     error(response){
      console.log(response)
    }
    })}
    getpositionName(positionId: string): string {
      const position = this.positions.find((g) => g.positionId === positionId);
      return position ? `${position.name}`  : 'Unknown position';
    }
    deleteSupervisor(id: string) {
      const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // User confirmed deletion, proceed with the delete request
          this.supervisorservice.deleteSupervisor(id).subscribe({
            next: () => {
              // Remove the deleted supervisor from the supervisors array using filter
              this.dialog.open(DeletesucessfullmessageComponent)
              this.supervisorservice.getAllSupervisors()
              .subscribe({
                next: (supervisors) => {
                  this.supervisors=supervisors;
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