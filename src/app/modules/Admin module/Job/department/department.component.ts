import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { Department } from 'app/models/education.model';

import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { DepartmentService } from 'app/service/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
departments:Department[]=[];
departmentSaved:boolean=false
filteredDepartment: Department[] = []; 
searchTerm: string = ''; 

  addDepartmentRequest: Department={
    description:'',
     pid:0,
     departmentId:undefined,
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
  constructor(
    private departmentService :DepartmentService,
    private router:Router,private dialog:MatDialog,
    private snackBar :MatSnackBar) { }

  ngOnInit(): void {
    this.departmentService.getAllDepartment()
    .subscribe({
      next: (departments) => {
        this.departments=departments;
        this.filteredDepartment=departments
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
  addDepartment(){

    this.departmentService.addDepartment(this.addDepartmentRequest)
    .subscribe({
    next:(department)=>{

      this.showSucessMessage('Sucessfully Added!!')

      this.departments.push({ ...this.addDepartmentRequest });

      this.addDepartmentRequest = {
        description:'',
        pid:0,
        departmentId:undefined,
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
    onSearch() {
      this.filteredDepartment = this.departments;
      if (this.searchTerm.trim() === '') {
     
        this.filteredDepartment = this.departments;
      } else {
     
        this.filteredDepartment = this.departments.filter(department => {
          
          return (
            department.description.toLowerCase().startsWith(this.searchTerm.toLowerCase()) 
           
          );
        });
      }
      }
    deleteDepartment(id: string) {
      const dialogRef: MatDialogRef<DeleteConfirmationComponent> 
      = this.dialog.open(DeleteConfirmationComponent);
    
      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          // User confirmed deletion, proceed with the delete request
          this.departmentService.deleteDepartment(id).subscribe({
            next: () => {
              this.dialog.open(DeletesucessfullmessageComponent)
              this.departmentService.getAllDepartment().subscribe((departments) => {
                this.filteredDepartment = departments;
              });
    
            },
            error(response) {
              console.log(response);
            },
          });
        }
      });}

      
}
