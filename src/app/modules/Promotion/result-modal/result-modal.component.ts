import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Promotion, PromotionRelation } from 'app/models/vacancy/promotion.model';
import { EmployeeService } from 'app/service/employee.service';
import { PromotionRelationService } from 'app/service/promotionrelation.service';
import { EvaluationModalComponent } from '../evaluation-modal/evaluation-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Employee } from 'app/models/employee.model';
import { GradeService } from 'app/service/grade.service';
import { PositionService } from 'app/service/position.service';
import { VacancyService } from 'app/service/vacancy.service';
import { Branch, Grade, Position } from 'app/models/job-description.model';
import { Vacancy } from 'app/models/vacancy/vacancy.model';
import { BranchService } from 'app/service/branch.service';
import { PromotionService } from 'app/service/promotion.service';

@Component({
  selector: 'app-result-modal',
  templateUrl: './result-modal.component.html',
  styleUrls: ['./result-modal.component.css']
})
export class ResultModalComponent {

  selectedId: string;
  employees:Employee[]=[];
  Promotions:Promotion[]=[]
  //employees:Employee[]=[];
  PromotionSaved: boolean = false;
   PromotionUpdated: boolean = false;
 positions:Position[]=[];
 vacancies:Vacancy[]=[];
 grades:Grade[]=[];
 branches:Branch[]=[];
 selectedvacancyId:string;
 promotionRelation:PromotionRelation[]=[];
  constructor(
    
   
    private PromotionService: PromotionService,
    private PromotionRelationService: PromotionRelationService,
    private positionservice: PositionService,
    private gradeservice: GradeService,
    private employeeService:EmployeeService,
    private vacancyService: VacancyService,
    private branchservice: BranchService,
   
    private employeeservice: EmployeeService,
    private promtionRelationService : PromotionRelationService,
    public dialogRef: MatDialogRef<EvaluationModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,){
        this.employeeservice.getAllEmployees() 
        .subscribe({ 
          next: (employees) => { 
            this.employees=employees}})
            this.vacancyService.getAllVacancy() 
            .subscribe({ 
              next: (va) => { 
                this.vacancies=va
              this.selectedvacancyId= this.vacancies.findIndex[0].vacancyId}})
            
            
          this.PromotionService.getAllPromotion()
          .subscribe({
            next: (Promotion) => {
              this.Promotions=Promotion;
            },
            error(response){
              console.log(response)
            }
          });
          this.positionservice.getAllPosition()
        .subscribe({
          next: (positions) => {
            this.positions=positions;
          },
          error(response){
            console.log(response)
          }
        });
        this.PromotionRelationService.getAllPromotionRelation()
        .subscribe({
          next: (promotion) => {
            this.promotionRelation=promotion;
          },
          error(response){
            console.log(response)
          }
        });
        this.gradeservice.getAllGrade()
        .subscribe({
          next: (grades) => {
            this.grades=grades;
          },
          error(response){
            console.log(response)
          }
        });
        this.branchservice.getAllBranch()
        .subscribe({
          next: (br) => {
            this.branches=br;
          },
          error(response){
            console.log(response)
          }
        });
        
      }
      successMessage: string | null = null; // Add this property

 
    
      ngOnInit(): void {

      }


      private isOpen = new BehaviorSubject<boolean>(false);
isOpen$ = this.isOpen.asObservable();




public employeeName = new BehaviorSubject<string | null>(null); // Corrected property name
employeeName$ = this.employeeName.asObservable();
selectedPromotion: PromotionRelation[]=[] ;
    
promtionEvaluation: PromotionRelation[];
openModal(id: string, VacancyId:string) {
  this.selectedId=id
  this.selectedvacancyId=VacancyId
  
  this.promtionRelationService.getAllPromotionRelation().subscribe(
    (data) => {
      this.selectedPromotion = data.filter(d=>d.vacancyId==VacancyId ).sort((a,b)=>parseInt(b.evaluation)-parseInt(a.evaluation)).slice(0,3);

      
    
     
    },
    (error) => {
      console.error('Error:', error);
    }
  );

       
  }
  saveEditedData(empId:string,promotion :PromotionRelation) {
    
console.log(promotion)
    this.promtionRelationService.updatePromotionRelation(promotion,empId).subscribe(
      (response) => {
     
        // Close the modal
        this.successMessage = 'Data saved successfully';
        setTimeout(() => {
   
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
compareEvaluation(){

}
onCancelClick(): void {
 
  this.dialogRef.close('refresh');
}
// 
getPositionName(positionId: string): string {
  const position = this.positions.find((g) => g.positionId === positionId);


  return position ? position.name : '';
}
getGradeName(levelId: string): string {
  const grade = this.grades.find((g) => g.levelId === levelId);
  return grade ? grade.description : '';
}
getBranchName(id: string): string {
  const grade = this.branches.find((g) => g.id === id);
  return grade ? grade.name : '';
}
getEmployeeName(empId: string): string { 
  const employee = this.employees.find((g) => g.empId === empId); 
  return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
} 
getEvaluation(empId: string): string { 
  const promotion = this.promotionRelation.find((g) => g.empId === empId); 
  return promotion ? promotion.evaluation:''; 
} 
getPosition(vacancyId: string): string { 

  const va = this.Promotions.find((g) => g.vacancyId === vacancyId); 
  console.log(this.vacancies)
  return va ?  this.getPositionName(va.positionId):''; 
} 
getGrade(vacancyId: string): string { 
  const promotion = this.Promotions.find((g) =>  g.vacancyId === vacancyId); 
  return promotion ? this.getGradeName(promotion.levelId):''; 
} 
getBranch(vacancyId: string): string { 
  const promot = this.Promotions.find((g) =>  g.vacancyId === vacancyId); 
  return promot ? this.getBranchName(promot.branchId):''; 
} 
open
}
