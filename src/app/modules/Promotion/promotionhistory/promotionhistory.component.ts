import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Employee } from 'app/models/employee.model';
import { Branch, Grade, Position } from 'app/models/job-description.model';
import { Promotion, PromotionRelation } from 'app/models/vacancy/promotion.model';
import { EmployeeService } from 'app/service/employee.service';
import { GradeService } from 'app/service/grade.service';
import { PositionService } from 'app/service/position.service';
import { PromotionService } from 'app/service/promotion.service';
import { PromotionRelationService } from 'app/service/promotionrelation.service';
import { ResultModalComponent } from '../result-modal/result-modal.component';
import { VacancyService } from 'app/service/vacancy.service';
import { Vacancy } from 'app/models/vacancy/vacancy.model';
import { BranchService } from 'app/service/branch.service';

@Component({
  selector: 'app-promotionhistory',
  templateUrl: './promotionhistory.component.html',
  styleUrls: ['./promotionhistory.component.css']
})
export class PromotionhistoryComponent {
  buttons = [ 
    { label: 'Promotions ', route: '/promotionhistory' }, 
   { label: 'Vacancy Management', route: '/vacancymanagment' },  
   { label: ' Vacancy', route: '/vacancy' },
   { label: ' Others Vacancy', route: '/otherspromotion' },
   { label: ' Approve Promotion', route: '/approvepromotion' },
 ];  
 Promotions:Promotion[]=[]
 employees:Employee[]=[];
 PromotionSaved: boolean = false;
  PromotionUpdated: boolean = false;
positions:Position[]=[];
vacancies:Vacancy[]=[];
grades:Grade[]=[];
branches:Branch[]=[];
promotionRelation:PromotionRelation[]=[];
 constructor( 

   private router: Router, 
   private dialog: MatDialog, 
   private PromotionService: PromotionService,
   private positionservice: PositionService,
   private gradeservice: GradeService,
   private branchservice: BranchService,
   private employeeService:EmployeeService,
   private promotionRelationService:PromotionRelationService,
   private vacancyService: VacancyService,
 ) {
    
 } 
 ngOnInit(): void { 
  this.employeeService.getAllEmployees() 
.subscribe({ 
  next: (employees) => { 
    this.employees=employees}})


    this.vacancyService.getAllVacancy() 
    .subscribe({ 
      next: (va) => { 
        this.vacancies=va}})
    
    
  this.PromotionService.getAllPromotion()
  .subscribe({
    next: (Promotion) => {
      this.Promotions=Promotion;
    },
    error(response){
      console.log(response)
    }
  });

this.promotionRelationService.getAllPromotionRelation()
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
this.positionservice.getAllPosition()
.subscribe({
  next: (positions) => {
    this.positions=positions;
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


capitalizeFirstLetter(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}
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
  const va = this.vacancies.find((g) => g.vacancyId === vacancyId); 
  return va ? this.getPositionName(va.positionId):''; 
} 
getGrade(vacancyId: string): string { 
  const promotion = this.vacancies.find((g) =>  g.vacancyId === vacancyId); 
  return promotion ? this.getGradeName(promotion.levelId):''; 
} 
getBranch(vacancyId: string): string { 
  const promotion = this.vacancies.find((g) =>  g.vacancyId === vacancyId); 
  return promotion ? this.getBranchName(promotion.branchId):''; 
} 
openResultModal(empId:string, vacancyId:string){
  const dialogRef =this.dialog.open(ResultModalComponent,{
    // Set the width to 100% to maximize
   // Apply your custom CSS class
 })
 dialogRef.componentInstance.openModal(empId,vacancyId)
}
}
