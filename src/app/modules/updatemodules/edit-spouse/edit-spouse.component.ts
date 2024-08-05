// edit-spouse.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { Spouse } from 'app/models/spouse.model';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { SpouseService } from 'app/service/spouse.service';

@Component({
  selector: 'app-edit-spouse',
  templateUrl: './edit-spouse.component.html',
  styleUrls: ['./edit-spouse.component.scss']
})
export class EditSpouseComponent implements OnInit {
  spouseId: string;
  spouse: Spouse= {
    pId: 0,
    id: undefined,
    name: "",
    createdBy: "",
    createdDate: "2023-07-26T06:13:52.512Z",
    updatedDate: "2023-07-26T06:13:52.512Z",
    updatedBy: "",
    status: 0,
    empId: " ",
   dateOfBirth:" ",
  relationship: '',

  };

  spouses:Spouse[]=[]
 spouseUpdated: boolean = false;
 spouseSaved:boolean = false;
  buttons = [
    { label: ' Add Employee ', route: '/employee-registration' },
    { label: '  List Employee ', route: '/employee-list' },
    {label:'Employee History', route:'/history'}
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spouseService: SpouseService,
    private dialog: MatDialog,
    private employeeIdService:EmployeeIdService,
    private snackBar :MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.spouseId = params['id'],toString();
    });

    this.spouseService.getAllSpouse() 
    .subscribe({ 
      next: (spouse) => { 
        this.spouses = spouse.filter(spouse => spouse.empId === this.employeeIdService.employeeId);
console.log(this.spouses)
            }, 
      error(response) { 
        console.log(response); 
      }, })
    
  }


  showSucessMessage(message:string) : void{
    this.snackBar.open(message,'Close',
    {duration:3000,
    
    horizontalPosition:'end',
      verticalPosition:'top',
        panelClass:['cardhead']
      })
      
      }
  updateSpouse(): void {
    this.spouseService.updateSpouse(this.spouse, this.spouse.id).subscribe(
      () => {
   
        this.showSucessMessage('Sucessfully Updated!!')
          this.spouseService.getAllSpouse() 
          .subscribe({ 
            next: (spouse) => { 
              this.spouses = spouse.filter(spouse => spouse.empId === this.employeeIdService.employeeId);
      
                  }, 
            error(response) { 
              console.log(response); 
            }, })

          this.spouses.push({ ...this.spouse });
      },
      (error) => {
        console.error(error);
      }
    );
    this.spouse= {
      pId: 0,
      id: undefined,
      name: "",
      createdBy: "",
      createdDate: "2023-07-26T06:13:52.512Z",
      updatedDate: "2023-07-26T06:13:52.512Z",
      updatedBy: "",
      status: 0,
      empId: " ",
     dateOfBirth:" ",
    relationship: '',
  
    };
  
  }
  editSpouse(spouse: Spouse): void {
    // Here, we will navigate to the edit page for the selected Spouse.
    const contactToEdit = this.spouses.find(contact => contact.id === spouse.id);
    this.spouse = contactToEdit;
  }
  deleteSpouse(spouse: Spouse): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
  
    if (result===true) {
      // If the user confirms the deletion, we can call the service to delete the Spouse.
      this.spouseService.deleteSpouse(spouse.id).subscribe(
        () => {
          this.dialog.open(DeletesucessfullmessageComponent)
          this.spouseService.getAllSpouse() 
          .subscribe({ 
            next: (spouse) => { 
              this.spouses = spouse.filter(spouse => spouse.empId === this.employeeIdService.employeeId);
      
                  }, 
            error(response) { 
              console.log(response); 
            }, })

        },
        (error) => {
          console.error(error);
          // If there was an error during deletion, you can show an error message.
          alert('Failed to delete the Spouse. Please try again later.');
        }
      );
    }
  }
)}


addSpouse() {
  this.spouse.empId = this.employeeIdService.employeeId
  this.spouseService.addSpouse(this.spouse).subscribe({
    next: (employee) => {
      this.showSucessMessage('Sucessfully Added!!')
      this.spouses.push({ ...this.spouse });

     this.spouse= {
    pId: 0,
    id: undefined,
    name: "",
    createdBy: "",
    createdDate: "2023-07-26T06:13:52.512Z",
    updatedDate: "2023-07-26T06:13:52.512Z",
    updatedBy: "",
    status: 0,
    empId: " ",
   dateOfBirth:" ",
  relationship: '',

  };
    },
    error(response) {
      console.log(response)
    }
  });
}
}
