import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { Tax } from 'app/models/Payroll/Tax.model';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { TaxService } from 'app/service/tax.service';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent {
  Taxs:Tax[]=[];
  TaxSaved:boolean=false
  addTaxRequest: Tax={
    pId:0,
    id: undefined,
  createdBy: '',
  createdDate: '2023-07-21T13:28:13.132Z',
  updatedDate: '2023-07-21T13:28:13.132Z',
  updatedBy: '',
  status:0,
  name: "",
  salaryStart: 0,
  salaryEnd: 0,
  taxRate: 0,
  deductionAmount: 0,

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
     
     constructor(private TaxService :TaxService,
      private router:Router,private dialog:MatDialog,
      private snackBar :MatSnackBar) { }

     ngOnInit(): void {
       this.TaxService.getAllTax()
       .subscribe({
         next: (Taxs) => {
           this.Taxs=Taxs;
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
     addTax(){
   
       this.TaxService.addTax(this.addTaxRequest)
       .subscribe({
       next:(Tax)=>{
         this.TaxSaved = true;
         setTimeout(() => {
           this.TaxSaved = false;
         }, 2000);
         this.Taxs.push({ ...this.addTaxRequest });
   
         this.addTaxRequest = {

          pId:0,
    id: undefined,
  createdBy: '',
  createdDate: '2023-07-21T13:28:13.132Z',
  updatedDate: '2023-07-21T13:28:13.132Z',
  updatedBy: '',
  status:0,
  name: "",
  salaryStart: 0,
  salaryEnd: 0,
  taxRate: 0,
  deductionAmount: 0,
       
         };
       },
        error(response){
         console.log(response)
       }
       })}
       deleteTax(id: string) {
         const dialogRef = this.dialog.open(DeleteConfirmationComponent);
       
         dialogRef.afterClosed().subscribe((result) => {
           if (result) {
             // User confirmed deletion, proceed with the delete request
             this.TaxService.deleteTax(id).subscribe({
               next: () => {
                 // Remove the deleted education level from the Taxs array using filter
                 this.dialog.open(DeletesucessfullmessageComponent)
                 this.TaxService.getAllTax()
       .subscribe({
         next: (Taxs) => {
           this.Taxs=Taxs;
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

         getTaxName(Id: string): string { 
          const Tax = this.Taxs.find((g) => g.id === Id); 
          return Tax ? `${Tax.name} `:'Unknown EMPLOYEE'; 
        } 
}
