
import { Router } from '@angular/router';
import { DepositeAuthentication } from 'app/models/deposite-authentication.model';
import { DepositeAuthenticationService } from 'app/service/deposite-authentcation.service';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { BankService } from 'app/service/bank.service';
import { Bank } from 'app/models/Payroll/Bank.model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-deposite-authenticaton',
  templateUrl: './deposite-authenticaton.component.html',
  styleUrls: ['./deposite-authenticaton.component.scss']
})


  export class DepositeAuthenticationComponent implements OnInit {
    depositeauthenticationSaved: boolean = false;
    depositeauthentications: DepositeAuthentication[] = []; 
    Banks:Bank[]=[];
    depositeAuthenticationUpdated: boolean = false;
selectedBank:string;
    depositeAuthentication:DepositeAuthentication={
      pId:0,
      id: undefined,
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
  
  }
  
  constructor(
    private formBuilder: FormBuilder,
    private bankService: BankService,
  
    private depositeauthenticationservice: DepositeAuthenticationService,
    private employeeIdService: EmployeeIdService,
    private router:Router,
    private dialog: MatDialog,
    private snackBar :MatSnackBar ){}


  ngOnInit():void {
    this.depositeauthenticationservice.getAllDepositeAuthentication() 
    .subscribe({ 
      next: (depositeauthentications) => { 
        this.depositeauthentications = depositeauthentications.filter(deposite => deposite.empId === this.employeeIdService.employeeId);
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



  depositeauthenticationForm: FormGroup = this.formBuilder.group({
    phoneNumber: ['', Validators.required],
  });
  
  buttons = [
    { label: ' Add Employee ', route: '/employee-registration' },
    { label: '  List Employee ', route: '/employee-list' },
    {label:'Employee History', route:'/history'}
  ];
  showSucessMessage(message:string) : void{
    this.snackBar.open(message,'Close',
    {duration:3000,
    
    horizontalPosition:'end',
      verticalPosition:'top',
        panelClass:['cardhead']
      })
      
      }
  addDepositeAuthentication() {
    this.depositeAuthentication.bankId=this.selectedBank
    this.depositeAuthentication.empId = this.employeeIdService.employeeId;
    this.depositeauthenticationservice.addDepositeAuthentication(this.depositeAuthentication)
    .subscribe({
      next: (employee) => {
        this.showSucessMessage('Sucessfully Added!!')
        // Add the current work experience to the array
        this.depositeauthentications.push({ ...this.depositeAuthentication });
        // Reset the form fields
        this.depositeauthenticationservice.getAllDepositeAuthentication() 
        .subscribe({ 
          next: (depositeauthentications) => { 
            this.depositeauthentications = depositeauthentications.filter(deposite => deposite.empId === this.employeeIdService.employeeId);
            ; 
                }, 
          error(response) { 
            console.log(response); 
          }, 
      });
this.selectedBank=""
        this.depositeAuthentication = {
          pId:0,
          id:  undefined,
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
  updateDepositeAuthentication(): void {
    this.depositeAuthentication.bankId=this.selectedBank

    this.depositeauthenticationservice.updateDepositeAuthentication(this.depositeAuthentication, this.depositeAuthentication.id).subscribe({
      next: () => {
        this.showSucessMessage('Sucessfully Updated!!')
      },
      error: (response) => {
        console.log(response);
      }
    });
    this.depositeauthenticationservice.getAllDepositeAuthentication() 
    .subscribe({ 
      next: (depositeauthentications) => { 
        this.depositeauthentications = depositeauthentications.filter(deposite => deposite.empId === this.employeeIdService.employeeId);
        ; 
            }, 
      error(response) { 
        console.log(response); 
      }, 
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
    const depositeAuthenticationToEdit = this.depositeauthentications.find(depositeAuthentication => depositeAuthentication.id === DepositeAuthentication.id);
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
      this.depositeauthenticationservice.deleteDepositeAuthentication(depositeAuthentication.id).subscribe(
        () => {
          this.dialog.open(DeletesucessfullmessageComponent)
          this.depositeauthenticationservice.getAllDepositeAuthentication() 
          .subscribe({ 
            next: (depositeauthentications) => { 
              this.depositeauthentications = depositeauthentications.filter(deposite => deposite.empId === this.employeeIdService.employeeId);
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
getBankName(id: string): string {
  const Bank = this.Banks.find((Bank) => Bank.id === id);
  return Bank ? Bank.bankName : '';
}

}
  
  
  