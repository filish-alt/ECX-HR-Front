import { Component, ElementRef, Pipe, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Branch, Grade, Position } from 'app/models/job-description.model';
import { PromotionRelation } from 'app/models/vacancy/promotion.model';
import { Vacancy } from 'app/models/vacancy/vacancy.model';
import { BranchService } from 'app/service/branch.service';
import { GradeService } from 'app/service/grade.service';
import { PositionService } from 'app/service/position.service';
import { PromotionRelationService } from 'app/service/promotionrelation.service';
import { VacancyService } from 'app/service/vacancy.service';
import { dateFormats } from 'highcharts';

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.css']
})

export class VacancyComponent {
@ViewChild('printableCard') printableCard !:ElementRef
  vacancies:Vacancy[]=[]
  vacancy:Vacancy
  deaddate:number;
  showVacancyForm: boolean = false;
  vacancySaved: boolean = false;
   vacancyUpdated: boolean = false;
   promotionRelationSaved:boolean = false;
 positions:Position[]=[];
 grades:Grade[]=[];
 branchs:Branch[]=[]
  constructor( 
 
    private router: Router, 
    private dialog: MatDialog, 
    private vacancyService: VacancyService,
    private positionservice: PositionService,
    private gradeservice: GradeService,
    private branchService: BranchService,
   
    private promotionRelationService:PromotionRelationService,
    private snackBar :MatSnackBar
  ) {
     
  } 
  buttons = [ 
    { label: 'Promotions ', route: '/promotionhistory' }, 
   { label: 'Vacancy Management', route: '/vacancymanagment' },  
   { label: ' Vacancy', route: '/vacancy' },
   { label: ' Others Vacancy', route: '/otherspromotion' },
  
   { label: ' Approve Promotion', route: '/approvepromotion' },

 ];  
promotionRelations:PromotionRelation[]=[];
 promotionRelation: PromotionRelation = {
  pId: 0,
  id: undefined,
  createdBy: "",
  createdDate: "2023-07-26T06:13:52.512Z",
  updatedDate: "2023-07-26T06:13:52.512Z",
  updatedBy: "",
  status: 0,
  evaluation:"",
  File:"",
vacancyId:undefined,
empId:"c6b2f0a9-8af0-473b-820b-73e47628189f",
approvedDate: "2023-09-13T07:12:00.970Z",
promotionStatus: "Pendding",

};

  ngOnInit(): void { 

    // this.promotionRelationService.getPromotionRelation("2b500348-4371-4f1a-a62d-461d9f822e25").subscribe({
    //   next: (promotionRelation) => {
    //     this.promotionRelations = promotionRelation
       
    //     console.log( this.promotionRelations)
    //     ;
    //   },
    //   error: (response) => {
    //     console.log(response);
    //   }
    // });
    
    this.vacancyService.getAllVacancy()
    .subscribe({
      next: (vacanc) => {
        this.vacancies=vacanc.filter(v=>new Date(v.deadline) > new Date(Date.now()));
console.log("this.vacancies",this.vacancies)
//         const dd  = Date.now()
// const dead= new Date(this.vacancy.deadline);

//    const current =new Date(dd);
   
//    if(dead >= current){
//     this.vacancies=vacanc;
//    }
      },
      error(response){
        console.log(response)
      }
    });
    // Assuming this.vacancies and this.promotionRelations are arrays of objects

this.promotionRelationService.getPromotionRelation("c6b2f0a9-8af0-473b-820b-73e47628189f").subscribe({
  next: (promotionRelation) => {
    this.promotionRelations = promotionRelation;

  },
  error: (response) => {
    console.log(response);
  }
});
this.branchService.getAllBranch()
.subscribe({
  next: (br) => {
    this.branchs=br;
  },
  error(response){
    console.log(response)
  }
});
    this.promotionRelationService.getAllPromotionRelation()
    .subscribe({
      next: (vacancy) => {
        this.promotionRelations=vacancy;
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
 id:string ;
    toggleVacancyForm( vacancy:Vacancy) {
      console.log(this.id)
this.showVacancyForm=!this.showVacancyForm
this.id=vacancy.vacancyId;

  }

  selectedFile: File | null = null; 
  onFileSelected(event: any) { 
   
    const file: File = event.target.files[0]; 
    const reader = new FileReader(); 
    reader.onload = () => { 
        const base64String = reader.result.toString().split(',')[1]; // Extract the base64 part 
        this.promotionRelation.File = base64String; 
    }; 
    reader.readAsDataURL(file); 
  } 
  showSucessMessage(message:string) : void{
    this.snackBar.open(message,'Close',
    {duration:3000,
    
    horizontalPosition:'end',
      verticalPosition:'top',
        panelClass:['cardhead']
      })
      
      }
  updateVacanciesWithAppliedStatus(): void {
    // Iterate through vacancies and set an "applied" property based on the promotion relations
    this.promotionRelations.forEach((vacancy) => {
      vacancy.promotionStatus = this.isVacancyApplied(vacancy);
    });}
  capitalizeFirstLetter(text: string): string {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  isVacancyApplied(vacancy: any): string {
    const isApplied = this.promotionRelations.some(
      (promotion) => promotion.vacancyId === vacancy.id
    );
  console.log()
    return isApplied ? 'Applied' : 'Not Applied';
  }
  
  getPositionName(positionId: string): string {
    const position = this.positions.find((g) => g.positionId === positionId);
    return position ? position.name : 'Unknown Grade';
  }
  getGradeName(levelId: string): string {
    const grade = this.grades.find((g) => g.levelId === levelId);
    return grade ? grade.description : 'Unknown Grade';
  }
  getBranchName(branch:string){
    const bra = this.branchs.find((g) => g.id === branch);
    return bra ? bra.name : 'Unknown Grade';
  }
  shouldDisplayApplyButton(vacancyId: string): boolean {
    // Find the corresponding PromotionRelation
    const promotionRelation = this.promotionRelations.find((pr) => pr.vacancyId === vacancyId);

    return !promotionRelation || promotionRelation.promotionStatus === 'Pendding';
  }

  
  apply(vacancy :Vacancy){
  this.promotionRelation.empId="c6b2f0a9-8af0-473b-820b-73e47628189f";
  this.promotionRelation.vacancyId=vacancy.vacancyId;
  this.promotionRelation.promotionStatus="Applied";
    this.promotionRelationService.addPromotionRelation(this.promotionRelation)
    .subscribe({
      next: (employee) => {
        this.showSucessMessage('Sucessfully Applied!!')
     


      
    this.promotionRelationService.getPromotionRelation("c6b2f0a9-8af0-473b-820b-73e47628189f").subscribe({
      next: (promotionRelation) => {
        this.promotionRelations = promotionRelation
       
        console.log( this.promotionRelations)
        ;
      },
      error: (response) => {
        console.log(response);
      }
    });

        this.promotionRelation = {
          pId: 0,
          id: undefined,
          createdBy: "",
          createdDate: "2023-07-26T06:13:52.512Z",
          updatedDate: "2023-07-26T06:13:52.512Z",
          updatedBy: "",
          status: 0,
          evaluation:"",
        vacancyId:undefined,
        empId:"c6b2f0a9-8af0-473b-820b-73e47628189f",
        approvedDate: "2023-09-13T07:12:00.970Z",
        promotionStatus: "Pendding",
        File:"",
        };
    
      },
      error(response) {
        console.log(response)
      }
    });
  }
  app(Vacancy:Vacancy){

    if( this.promotionRelation.vacancyId=== Vacancy.vacancyId){

    }
  }
   printCard(){
    let printContents=this.printableCard.nativeElement.innerHTML;
    let orginalContent=document.body.innerHTML;
    document.body.innerHTML=printContents
    window.print();
    document.body.innerHTML=orginalContent;
   }
 

}
