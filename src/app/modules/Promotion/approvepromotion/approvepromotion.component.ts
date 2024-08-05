import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Employee } from 'app/models/employee.model';
import { Grade, Position } from 'app/models/job-description.model';
import { Promotion, PromotionRelation } from 'app/models/vacancy/promotion.model';
import { Vacancy } from 'app/models/vacancy/vacancy.model';
import { EmployeeDetailsModalComponent } from 'app/modules/leave/employee-details-modal/employee-details-modal.component';
import { EmployeeService } from 'app/service/employee.service';
import { GradeService } from 'app/service/grade.service';
import { PositionService } from 'app/service/position.service';
import { PromotionService } from 'app/service/promotion.service';
import { PromotionRelationService } from 'app/service/promotionrelation.service';
import { VacancyService } from 'app/service/vacancy.service';
import { EvaluationModalComponent } from '../evaluation-modal/evaluation-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-approvepromotion',
  templateUrl: './approvepromotion.component.html',
  styleUrls: ['./approvepromotion.component.css']
})
export class ApprovepromotionComponent {
  buttons = [ 
    { label: 'Promotions ', route: '/promotionhistory' }, 
   { label: 'Vacancy Management', route: '/vacancymanagment' },  
   { label: ' Vacancy', route: '/vacancy' },
   { label: ' Others Vacancy', route: '/otherspromotion' },
  
   { label: ' Approve Promotion', route: '/approvepromotion' },
 ]; 


 Promotions:Promotion[]=[]
 employees:Employee[]=[];
 PromotionApproved: boolean = false;
 promotionSaved:boolean = false;
 downloadFileUrl: string=''; 
  pdfUrl:string='' 
  FileNull:boolean = false;
  id:string;
positions:Position[]=[];
grades:Grade[]=[];
promotionStatus="Applied"
promotionRelationPenddings:PromotionRelation[]=[]
showPromotionForm: boolean = false;
vacancies:Vacancy[]=[]
selectedDate:string;
promotion: Promotion = {
  pId: 0,
  id: undefined,
  createdBy: "",
  createdDate: "2023-07-26T06:13:52.512Z",
  updatedDate: "2023-07-26T06:13:52.512Z",
  updatedBy: "",
  status: 0,
vacancyId:undefined,
empId:"",
positionId: '',
levelId: '',
startDate: '',
branchId:""


};
 constructor( 

   private router: Router, 
   private dialog: MatDialog, 
   private PromotionService: PromotionService,
   private PromotionRelationService: PromotionRelationService,
   private positionservice: PositionService,
   private gradeservice: GradeService,
   private employeeService:EmployeeService,
   private vacancyService: VacancyService,
   private snackBar :MatSnackBar
 ) {
    
 } 
 selectedPromotionRelationPending: any; 
 ngOnInit(): void { 
  this.vacancyService.getAllVacancy()
  .subscribe({
    next: (vacancy) => {
      this.vacancies=vacancy;
      console.log("VA",this.vacancies)
    },
    error(response){
      console.log(response)
    }
  });
  this.employeeService.getAllEmployees() 
.subscribe({ 
  next: (employees) => { 
    this.employees=employees}})

    this.PromotionRelationService.getpromotionRelationByStatus(this.promotionStatus).subscribe({
      next: (promotionRelationPendding) => {
        this.promotionRelationPenddings = promotionRelationPendding
        ;
      },
      error: (response) => {
        console.log(response);
      }
    });
    
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
this.gradeservice.getAllGrade()
.subscribe({
  next: (grades) => {
    this.grades=grades;
  },
  error(response){
    console.log(response)
  }
});
}
fetchAndDisplayPDF(promotion: PromotionRelation): void {
  const promotionRelationToEdit = this.promotionRelationPenddings.find(
    (prmotionrelation) => prmotionrelation.id === promotion.id
  );


  this.PromotionRelationService.getPromotionFile(promotionRelationToEdit.vacancyId, promotionRelationToEdit.empId)
  .subscribe(
    (pdf: Blob) => {
 
      var file = new Blob([pdf], { type: 'application/pdf' });

      this.downloadFileUrl = window.URL.createObjectURL(file);
      window.open(this.downloadFileUrl, '_blank');    
    },
    (error) => {
      this.FileNull=true
      console.error('Error loading PDF:', error);
     this.id= promotionRelationToEdit.id
    }
  );
}
// shouldDisplayApplyButton(vacancyId: string): boolean {
  // Find the corresponding PromotionRelation
//   const promotionRelation = this.promotionRelations.find((pr) => pr.vacancyId === vacancyId);

//   return !promotionRelation || promotionRelation.promotionStatus === 'Pendding';
// }
showSucessMessage(message:string) : void{
  this.snackBar.open(message,'Close',
  {duration:3000,
  
  horizontalPosition:'end',
    verticalPosition:'top',
      panelClass:['cardhead']
    })
    
    }
getdeadate(vacancyId:string){
var date=Date.now();

  const promt= this.vacancies.find((g)=>g.vacancyId == vacancyId)
  console.log("vacancies",)
  if(promt){
    const dead = new Date(promt.deadline);
    const today = new Date(date);
    
  }
 // if(dead < today){
  //   return true;
  // }
  console.log("hhh",  promt==undefined?false:true)
return promt==undefined?false:true
}
 getEmployeeName(empId: string): string { 
  const employee = this.employees.find((g) => g.empId === empId); 
  return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
} 
getBranch(vacancyId:string){
  const vacancy = this.vacancies.find((g) => g.vacancyId === vacancyId); 
  return vacancy ? vacancy.branchId:null; 
}
getTitle(vacancyId:string)
{
  const vacancy = this.vacancies.find((g) => g.vacancyId === vacancyId); 
  return vacancy ? `${this.getPosition(vacancy.positionId)}`:'Unknown '; 

}
getPosition(position:string)
{
  const po = this.positions.find((g) => g.positionId === position); 
  return po ? `${po.name}`:'Unknown '; 

}
getPo(vacancyId:string)
{
  const vacancy = this.vacancies.find((g) => g.vacancyId === vacancyId); 
  return vacancy ? vacancy.positionId:null; 

}
getLevel(vacancyId:string)
{
  const vacancy = this.vacancies.find((g) => g.vacancyId === vacancyId); 
  return vacancy ? `${vacancy.levelId}`:'Unknown '; 

}
approvePromotionPendding(){
  var promotionRelation=this.selectedPromotionRelationPending
    
  var Id=promotionRelation.id
  promotionRelation.promotionStatus="Promoted"
  console.log("promotionRelation",promotionRelation)
  this.PromotionRelationService
  .updatePromotionRelation(promotionRelation,Id)
  .subscribe(() =>{
    this.showSucessMessage('Sucessfully Approved!!')

    
      this.vacancyService.getAllVacancy()
      .subscribe({
        next: (vacancy) => {
          this.vacancies=vacancy;
        },
        error(response){
          console.log(response)
        }
      });
      this.employeeService.getAllEmployees() 
    .subscribe({ 
      next: (employees) => { 
        this.employees=employees}})
    
        this.PromotionRelationService.getpromotionRelationByStatus(this.promotionStatus).subscribe({
          next: (promotionRelationPendding) => {
            this.promotionRelationPenddings = promotionRelationPendding
            ;
          },
          error: (response) => {
            console.log(response);
          }
        });
        
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
    this.gradeservice.getAllGrade()
    .subscribe({
      next: (grades) => {
        this.grades=grades;
      },
      error(response){
        console.log(response)
      }
    });
      
  });
}
togglePromotionForm(promotionRelationPending) {
  this.showPromotionForm = !this.showPromotionForm;
  this.selectedPromotionRelationPending = promotionRelationPending;

}
addPromotion(){
  console.log("THERE")
  if (this.selectedPromotionRelationPending) {

  this.promotion.startDate=this.selectedDate;

  this.promotion.empId=this.selectedPromotionRelationPending.empId;
  this.promotion.vacancyId=this.selectedPromotionRelationPending.vacancyId;
  this.promotion.positionId=this.getPo(this.selectedPromotionRelationPending.vacancyId);
  this.promotion.levelId=this.getLevel(this.selectedPromotionRelationPending.vacancyId);
  this.promotion.branchId=this.getBranch(this.selectedPromotionRelationPending.vacancyId);
  console.log("pro",this.promotion)
    this.PromotionService.addPromotion(this.promotion)
    .subscribe({
      next: (employee) => {
        this.promotionSaved = true;
        console.log("in",this.promotion)
          setTimeout(() => {
        this.promotionSaved = false;
      }, 2000);
     

  
        this.promotion = {
          pId: 0,
          id: undefined,
          createdBy: "",
          createdDate: "2023-07-26T06:13:52.512Z",
          updatedDate: "2023-07-26T06:13:52.512Z",
          updatedBy: "",
          status: 0,
        vacancyId:undefined,
        empId:"",
        positionId: '',
        levelId: '',
        startDate: '',
        branchId:""
        };
      },
      error(response) {
        console.log(response)
      }
    });
    this.showPromotionForm = false;
  }}
  openEmployeeDetailsModal(empId: string) {
    const dialogRef =this.dialog.open(EmployeeDetailsModalComponent,{
       // Set the width to 100% to maximize
      // Apply your custom CSS class
    })
    dialogRef.componentInstance.openModal(empId)
  
  }

  openEvaluationModal(empId:string, vacancyId:string){
    const dialogRef =this.dialog.open(EvaluationModalComponent,{
      // Set the width to 100% to maximize
     // Apply your custom CSS class
   })
   dialogRef.componentInstance.openModal(empId,vacancyId)
  }
}
