import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar,MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { Bank } from 'app/models/Payroll/Bank.model';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { BankService } from 'app/service/bank.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent {
  Banks:Bank[]=[];
  BankSaved:boolean=false
  addBankRequest: Bank={
    pId:0,
    id: undefined,
  createdBy: '',
  createdDate: '2023-07-21T13:28:13.132Z',
  updatedDate: '2023-07-21T13:28:13.132Z',
  updatedBy: '',
  status:0,
  bankName: "",

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
     
     constructor(private BankService :BankService,
      private router:Router,private dialog:MatDialog,
      private snackBar :MatSnackBar) { }

      showSucessMessage(message:string) : void{
        const config=new MatSnackBarConfig();
        config.panelClass=['custom-snackbar',`custom-snackbar-${config.verticalPosition}`];
        config.horizontalPosition="end"
        config.verticalPosition="top"
        this.snackBar.open(message,'Close',config
        )
          
          }

     ngOnInit(): void {
       this.BankService.getAllBank()
       .subscribe({
         next: (Banks) => {
           this.Banks=Banks;
         },
         error(response){
           console.log(response)
         }
       });
     }
   
     addBank(){
     this.addBankRequest.bankName=this.capitalizeFirstLetter(this.addBankRequest.bankName)
       this.BankService.addBank(this.addBankRequest)
       .subscribe({
       next:(Bank)=>{
     
  this.showSucessMessage('Sucessfully Added!!')

         this.Banks.push({ ...this.addBankRequest });
   
         this.addBankRequest = {

          pId:0,
    id: undefined,
  createdBy: '',
  createdDate: '2023-07-21T13:28:13.132Z',
  updatedDate: '2023-07-21T13:28:13.132Z',
  updatedBy: '',
  status:0,
  bankName: "",
 
         };
       },
        error(response){
         console.log(response)
       }
       })}
       deleteBank(id: string) {
         const dialogRef = this.dialog.open(DeleteConfirmationComponent);
       
         dialogRef.afterClosed().subscribe((result) => {
           if (result) {
             // User confirmed deletion, proceed with the delete request
             this.BankService.deleteBank(id).subscribe({
               next: () => {
                 // Remove the deleted education level from the Banks array using filter
                 this.dialog.open(DeletesucessfullmessageComponent)
                 this.BankService.getAllBank()
       .subscribe({
         next: (Banks) => {
           this.Banks=Banks;
         },
         error(response){
           console.log(response)
         }
       });  },
               error(response) {
                 console.log(response);
               },
             });
           }
         });}

         getBankName(Id: string): string { 
          const Bank = this.Banks.find((g) => g.id == Id); 
          return Bank ? `${Bank.bankName} `:'Unknown EMPLOYEE'; 
        } 

        capitalizeFirstLetter(text: string): string {
        const te= text.split(' ');
          if (!text) return text;
           const capitalizeWords= te.map(t=>t.charAt(0).toUpperCase() + t.slice(1));
           return capitalizeWords.join(' ');
        }
}
