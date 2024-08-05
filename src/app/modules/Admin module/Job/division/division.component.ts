import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { Department } from 'app/models/education.model';
import { Division } from 'app/models/job-description.model';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { DepartmentService } from 'app/service/department.service';
import { DivisionService } from 'app/service/division.service';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss']
})
export class DivisionComponent implements OnInit {
  divisionSaved:boolean=false
  departments:Department[]= [];
selectedDepartment:string;


divisions:Division[]=[];

  addDivisionRequest:Division={
    pid: 0,
    divisionId: undefined,
    departmentId: "",
    description: '',
    createdBy: '',
    createdDate: "2023-07-21T13:28:13.132Z",
    updatedDate: "2023-07-21T13:28:13.132Z",
    updatedBy: '',
    status: 0,


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
  filteredDivision: Division[] = []; 
  searchTerm: string = ''; 
 
constructor(private departmentservice: DepartmentService,
  private divisionservice: DivisionService,
  private dialog:MatDialog,
  private router:Router,
  private snackBar :MatSnackBar){}
ngOnInit():void {
  this.departmentservice.getAllDepartment()
.subscribe({
  next: (department) => {
    this.departments=department;
  },
  error(response){
    console.log(response)
  }
});

  this.divisionservice.getAllDivisions()
 
  .subscribe({
    next: (Divisions) => {
      this.divisions=Divisions;
      this.filteredDivision=this.divisions;
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
addDivision(){
  console.log(this.addDivisionRequest)
  this.addDivisionRequest.departmentId = this.selectedDepartment;
this.divisionservice.addDivision(this.addDivisionRequest)
.subscribe({
next:(Division)=>{

  this.showSucessMessage('Sucessfully Added!!')

  this.divisions.push({ ...this.addDivisionRequest });

  this.addDivisionRequest = {
    pid: 0,
    divisionId: undefined,
    departmentId: "",
    description: '',
    createdBy: '',
    createdDate: "2023-07-21T13:28:13.132Z",
    updatedDate: "2023-07-21T13:28:13.132Z",
    updatedBy: '',
    status: 0,

  };
},
 error(response){
  console.log(response)
}
})}
getDepartmentName(departmentId: String): string {
  const Department = this.departments.find((g) => g.departmentId === departmentId);
  return Department ? (Department.description )  : 'Unknown Department';
}
onSearch() {
  this.filteredDivision = this.divisions;
  if (this.searchTerm.trim() === '') {
 
    this.filteredDivision = this.divisions;
  } else {
 
    this.filteredDivision = this.divisions.filter(division => {
      
      return (
        division.description.toLowerCase().startsWith(this.searchTerm.toLowerCase()) 
       
      );
    });
  }
  }
deleteDivision(id: string) {
  const dialogRef = this.dialog.open(DeleteConfirmationComponent);

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      // User confirmed deletion, proceed with the delete request
      this.divisionservice.deleteDivision(id).subscribe({
        next: () => {
          // Remove the deleted Division from the Divisions array using filter
          this.dialog.open(DeletesucessfullmessageComponent)
          this.divisionservice.getAllDivisions()
 
          .subscribe({
            next: (Divisions) => {
              this.divisions=Divisions;
              this.filteredDivision=this.divisions;
            },
         // this.divisions = this.divisions.filter((division) => division.divisionId !== id);
           } )  },
        error(response) {
          console.log(response);
        },
      });
    }
  });
}
}

