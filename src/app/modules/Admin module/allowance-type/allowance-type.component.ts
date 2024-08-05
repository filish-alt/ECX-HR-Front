import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { AllowanceType } from 'app/models/Payroll/DeductionType.model';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { AllowanceTypeService } from 'app/service/allowance-type.service';

@Component({
  selector: 'app-allowance-type',
  templateUrl: './allowance-type.component.html',
  styleUrls: ['./allowance-type.component.css']
})
export class AllowanceTypeComponent { AllowanceType:AllowanceType[]=[];
AllowanceTypeSaved:boolean=false
   addAllowanceTypeRequest:AllowanceType={
     pId:0,
    id: undefined,
 createdBy: '',
 createdDate: '2023-07-21T13:28:13.132Z',
 updatedDate: '2023-07-21T13:28:13.132Z',
 updatedBy: '',
 status:0,
 name:'',
 
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
      constructor(private AllowanceTypeService :AllowanceTypeService,
        private dialog:MatDialog,  private snackBar :MatSnackBar) { }
 
      ngOnInit(): void {
        this.AllowanceTypeService.getAllAllowanceType()
        .subscribe({
          next: (AllowanceTypes) => {
            this.AllowanceType=AllowanceTypes;
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
      addAllowanceType(){
         this.AllowanceTypeService.addAllowanceType(this.addAllowanceTypeRequest)
        .subscribe({
        next:(DeductionType)=>{
  
          this.showSucessMessage('Sucessfully Added!!')

          this.AllowanceType.push({ ...this.addAllowanceTypeRequest });
    
          this.addAllowanceTypeRequest = {
 
            pId:0,
           id: undefined,
       createdBy: '',
       createdDate: '2023-07-21T13:28:13.132Z',
       updatedDate: '2023-07-21T13:28:13.132Z',
       updatedBy: '',
       status:0,
      name:'',
   
           
        
          };
        },
         error(response){
          console.log(response)
        }
        })}
        deleteAllowanceType(id: string) {
          const dialogRef = this.dialog.open(DeleteConfirmationComponent);
        
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              // User confirmed deletion, proceed with the delete request
              this.AllowanceTypeService.deleteAllowanceType(id).subscribe({
                next: () => {
                  // Remove the deleted education level from theDeductionTypes array using filter
                  this.dialog.open(DeletesucessfullmessageComponent)
                  this.AllowanceTypeService.getAllAllowanceType()
        .subscribe({
          next: (AllowanceType) => {
            this.AllowanceType=AllowanceType;
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
 
          getDeductionTypeName(Id: string){ 
           const DeductionType = this.AllowanceType.find((g) => g.id === Id); 
           return DeductionType ? `${DeductionType.name} `:'Unknown EMPLOYEE'; 
         } 
    }
    