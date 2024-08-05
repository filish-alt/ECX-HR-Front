import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PromotionRelation } from 'app/models/vacancy/promotion.model';

import { EmployeeService } from 'app/service/employee.service';
import { PromotionRelationService } from 'app/service/promotionrelation.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-evaluation-modal',
  templateUrl: './evaluation-modal.component.html',
  styleUrls: ['./evaluation-modal.component.css']
})
export class EvaluationModalComponent {
  selectedId: string;
  constructor(
    private route :Router,
       
    private employeeservice: EmployeeService,
    private promtionRelationService : PromotionRelationService,
    public dialogRef: MatDialogRef<EvaluationModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,){

      }
      successMessage: string | null = null; // Add this property

 
    
      ngOnInit(): void {

      }


      private isOpen = new BehaviorSubject<boolean>(false);
isOpen$ = this.isOpen.asObservable();




public employeeName = new BehaviorSubject<string | null>(null); // Corrected property name
employeeName$ = this.employeeName.asObservable();
selectedPromotion: PromotionRelation | null = null;
selectedEvaluation:string;
promtionEvaluation: PromotionRelation[];
openModal(id: string, VacancyId:string) {
  this.selectedId=id
  this.promtionRelationService.getPromotionRelation(this.selectedId).subscribe(
    (data) => {
      this.selectedPromotion = data.find(d=>d.vacancyId=VacancyId);
        this.selectedId=this.selectedPromotion.empId;
    
     
    },
    (error) => {
      console.error('Error:', error);
    }
  );

       
  }
  saveEditedData(empId:string,promotion :PromotionRelation) {
    


    this.promtionRelationService.updatePromotionRelation(promotion,empId).subscribe(
      (response) => {
        // Handle the response if needed
        console.log('Data saved successfully:', response);
        // Close the modal
        this.successMessage = 'Data saved successfully';
        setTimeout(() => {
          //this.dialogRef.close('refresh');
        }, 2000); 
      },
      (error) => {
        // Handle any errors
        console.error('Error saving data:', error);
        this.successMessage = null; 
      }
    );
  // this.route.navigate(['/leave-balance'])
  }


closeModal() {
  this.isOpen.next(false);
}
printEvaluation() {
  // Implement printing functionality here
  // You can use browser-specific printing techniques or a library like ngx-print to handle printing.
  window.print();
  console.log();
}

onCancelClick(): void {
 
  this.dialogRef.close('refresh');
}
}
