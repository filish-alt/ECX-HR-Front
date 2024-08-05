import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { Bank } from 'app/models/Payroll/Bank.model';
import { DepositeAuthentication } from 'app/models/deposite-authentication.model';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { BankService } from 'app/service/bank.service';
import { DepositeAuthenticationService } from 'app/service/deposite-authentcation.service';
import { EmployeeIdService } from 'app/service/employee-id.service';

@Component({
  selector: 'app-edit-depositeauthentication',
  templateUrl: './edit-depositeauthentication.component.html',
  styleUrls: ['./edit-depositeauthentication.component.scss']
})
export class EditDepositeAuthenticationComponent implements OnInit {
  depositeAuthenticationId: string;
  selectedBank: string ;
  Banks:Bank[]=[];
  depositeAuthentication: DepositeAuthentication ={
    pId:0,
    id:undefined,
   createdBy: '', 
     createdDate: "2023-07-20T13:56:00.062Z", 
     updatedDate: "2023-07-20T13:56:00.062Z", 
     updatedBy: '', 
     empId: "",
     status:0,
   bankId: '',
   bankBranch: '',
   bankAccount:0,
   tinNumber: '',

};
  depositeAuthenticationUpdated: boolean = false;
  depositeauthenticationSaved: boolean = false;
  depositeAuthentications:DepositeAuthentication[]=[];

  
  constructor(
    private depositeAuthenticationService: DepositeAuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private employeeIdService: EmployeeIdService,
    private dialog: MatDialog,
    private bankService: BankService,
    private snackBar :MatSnackBar
  ) {}
  buttons = [
    { label: ' Add Employee ', route: '/employee-registration' },
    { label: '  List Employee ', route: '/employee-list' },
    {label:'Employee History', route:'/history'}
  ];
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.depositeAuthenticationId = params['id'].toString();
    
    
  })

  this.depositeAuthenticationService.getAllDepositeAuthentication() 
  .subscribe({ 
    next: (depositeauthentications) => { 
      this.depositeAuthentications = depositeauthentications.filter(deposite => deposite.empId === this.employeeIdService.employeeId);
      ; 
          }, 
    error(response) { 
      console.log(response); 
    }, 
});
this.bankService.getAllBank() 
.subscribe({ 
  next: (bank) => { 
    this.Banks = bank;
    ; 
        }, 
  error(response) { 
    console.log(response); 
  }, 
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
getBankName(id: string): string {
  const Bank = this.Banks.find((Bank) => Bank.id === id);
  return Bank ? Bank.bankName : '';
} 
  updateDepositeAuthentication(): void {
    this.depositeAuthentication.bankId=this.selectedBank
    this. depositeAuthenticationUpdated=true;
    this.depositeAuthenticationService.updateDepositeAuthentication(this.depositeAuthentication, this.depositeAuthentication.id).subscribe({
      next: () => {
        this.depositeAuthenticationUpdated = true;

        this.showSucessMessage('Sucessfully Updated!!')
      },
      error: (response) => {
        console.log(response);
      }
    });
    this.selectedBank=""
this.depositeAuthentication ={
  pId:0,
  id:  undefined,
 createdBy: '', 
   createdDate: "2023-07-20T13:56:00.062Z", 
   updatedDate: "2023-07-20T13:56:00.062Z", 
   updatedBy: '', 
   empId: "",
   status:0,
 bankId: '',
 bankBranch: '',
 bankAccount:0,
 tinNumber: '',

};
  }
  editDepositeAuthentication(DepositeAuthentication: DepositeAuthentication): void {
    const depositeAuthenticationToEdit = this.depositeAuthentications.find(depositeAuthentication => depositeAuthentication.id === DepositeAuthentication.id);
    this.depositeAuthentication = depositeAuthenticationToEdit;
  }

  deleteDepositeAuthentication(depositeAuthentication: DepositeAuthentication): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '300px', // Set the desired width of the dialog
      data: { message: 'Are you sure you want to delete this DepositeAuthentication?' } // Pass any data you want to the delete confirmation component
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // The result will be true if the user confirmed the deletion, otherwise false
      if (result === true) {
        // If the user confirmed the deletion, you can proceed with the delete logic here
        this.depositeAuthenticationService.deleteDepositeAuthentication(depositeAuthentication.id).subscribe(
          () => {
            this.dialog.open(DeletesucessfullmessageComponent)
            this.depositeAuthenticationService.getAllDepositeAuthentication() 
            .subscribe({ 
              next: (depositeauthentications) => { 
                this.depositeAuthentications = depositeauthentications.filter(deposite => deposite.empId === this.employeeIdService.employeeId);
                ; 
                    }, 
              error(response) { 
                console.log(response); 
              }, 
          });
          },
          (error) => {
            console.error(error);
            // If there was an error during deletion, you can show an error message.
            console.log('Failed to delete the DepositeAuthentication. Please try again later.');
          }
        );
      }
    });
  }
  
  addDepositeAuthentication() {
    this.depositeAuthentication.bankId=this.selectedBank

    this.depositeAuthentication.empId = this.employeeIdService.employeeId;
    this.depositeAuthenticationService.addDepositeAuthentication(this.depositeAuthentication)
    .subscribe({
      next: (employee) => {
        this.showSucessMessage('Sucessfully Added!!')
        // Add the current work experience to the array
        this.depositeAuthentications.push({ ...this.depositeAuthentication });
        // Reset the form fields
        this.selectedBank=""
        this.depositeAuthentication = {
          pId:0,
          id: undefined,
         createdBy: '', 
           createdDate: "2023-07-20T13:56:00.062Z",   
           updatedDate: "2023-07-20T13:56:00.062Z", 
           updatedBy: '', 
           empId: "A78C1592-6804-4FB3-81EA-26BB1FF7F7A5",
           status:0,
         bankId: '',
         bankBranch: '',
         bankAccount:0,
         tinNumber: '',
        };
      },
   error(response){
    console.log(response)
  }
  })}
}
