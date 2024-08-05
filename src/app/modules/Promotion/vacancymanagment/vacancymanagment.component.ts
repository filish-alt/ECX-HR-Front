import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Branch, Grade, Position } from 'app/models/job-description.model';
import { Vacancy } from 'app/models/vacancy/vacancy.model';
import { BranchService } from 'app/service/branch.service';
import { GradeService } from 'app/service/grade.service';
import { PositionService } from 'app/service/position.service';
import { VacancyService } from 'app/service/vacancy.service';

@Component({
  selector: 'app-vacancymanagment',
  templateUrl: './vacancymanagment.component.html',
  styleUrls: ['./vacancymanagment.component.scss']
})
export class VacancymanagmentComponent {
  showVacancyForm: boolean = false;
 vacancies:Vacancy[]=[]
 vacancySaved: boolean = false;
  vacancyUpdated: boolean = false;
positions:Position[]=[];
grades:Grade[]=[];
branches:Branch[]=[];
selectedPosition:string="";
selectedBranch:string="";
selectedGrade:string="";
  vacancy: Vacancy = {
    pId: 0,

    createdBy: "",
    createdDate: "2023-07-26T06:13:52.512Z",
    updatedDate: "2023-07-26T06:13:52.512Z",
    updatedBy: "",
    status: 0,
releaseDate:"",
deadline:"",
positionId:"",
levelId:"",
title:"",
branchId: "",
 
availability: "",
purpose: "",
responsibility:"",
requirement:"",
vacancyId:undefined
  
  };
  constructor( 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private dialog: MatDialog, 
    private vacancyService: VacancyService,
    private positionservice: PositionService,
    private gradeservice: GradeService,
    private branchService: BranchService,
    private snackBar :MatSnackBar
  ) {
     
  } 
  showSucessMessage(message:string) : void{
    this.snackBar.open(message,'Close',
    {duration:3000,
    
    horizontalPosition:'end',
      verticalPosition:'top',
        panelClass:['cardhead']
      })
      
      }
  capitalizeFirstLetter(text: string): string {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
 
  ngOnInit(): void { 
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

    this.branchService.getAllBranch()
    .subscribe({
      next: (branch) => {
        this.branches=branch;
      },
      error(response){
        console.log(response)
      }
    });

    this.vacancyService.getAllVacancy()
    .subscribe({
      next: (vacancy) => {
        this.vacancies=vacancy;
      },
      error(response){
        console.log(response)
      }
    });
  }

  buttons = [ 
     { label: 'Promotions ', route: '/promotionhistory' }, 
    { label: 'Vacancy Management', route: '/vacancymanagment' },  
    { label: ' Vacancy', route: '/vacancy' },
    { label: ' Others Vacancy', route: '/otherspromotion' },
  
    { label: ' Approve Promotion', route: '/approvepromotion' },
 
  ];  
  toggleVacancyForm() {
    this.showVacancyForm = !this.showVacancyForm;
    this.selectedBranch="";
    this.selectedPosition="";
    this.selectedGrade=""
    this.vacancy = {
      pId: 0,

      createdBy: "",
      createdDate: "2023-07-26T06:13:52.512Z",
      updatedDate: "2023-07-26T06:13:52.512Z",
      updatedBy: "",
      status: 0,
  releaseDate:"",
  deadline:"",
  positionId:"",
  levelId:"",
  title:"",
  requirement:"",
  branchId: "",

availability: "",
purpose: "",
responsibility:"",
  vacancyId:undefined
    };
  }

  addVacancy() {
    this.vacancy.branchId =this.selectedBranch;
    this.vacancy.positionId = this.selectedPosition;
    this.vacancy.levelId = this.selectedGrade;
    this.vacancyService.addVacancy(this.vacancy)
    .subscribe({
      next: (employee) => {
        this.showSucessMessage('Sucessfully Added!!')

      this.vacancyService.getAllVacancy() 
      .subscribe({ 
        next: (vacancy) => { 
          this.vacancies = vacancy;
  
              }, 
        error(response) { 
          console.log(response); 
        }, 
    });
        // Add the current work experience to the array
        this.vacancies.push({ ...this.vacancy });
        // Reset the form fields
        this.vacancy = {
          pId: 0,
 
          createdBy: "",
          createdDate: "2023-07-26T06:13:52.512Z",
          updatedDate: "2023-07-26T06:13:52.512Z",
          updatedBy: "",
          status: 0,
      releaseDate:"",
      deadline:"",
      positionId:"",
      levelId:"",
      title:"",
      requirement:"",
      branchId: "",
 
  availability: "",
  purpose: "",
  responsibility:"",
      vacancyId:undefined
        };
      },
      error(response) {
        console.log(response)
      }
    });
  }
updatevacancy(){
  this.vacancy.positionId = this.selectedPosition;
  this.vacancy.levelId = this.selectedGrade;
  this.vacancyService.updateVacancy(this.vacancy,this.vacancy.vacancyId).subscribe(
    () => {       
        this.showSucessMessage('Sucessfully Updated!!')

      this.vacancyService.getAllVacancy() 
      .subscribe({ 
        next: (vacancy) => { 
          this.vacancies = vacancy;
  
              }, 
        error(response) { 
          console.log(response); 
        }, 
    });
    },
    (error) => {
      console.error(error);
    }
  );
  this.vacancy = {
    pId: 0,

    createdBy: "",
    createdDate: "2023-07-26T06:13:52.512Z",
    updatedDate: "2023-07-26T06:13:52.512Z",
    updatedBy: "",
    status: 0,
releaseDate:"",
deadline:"",
positionId:"",
levelId:"",
title:"",
branchId: "",
 
availability: "",
purpose: "",
responsibility:"",
requirement:"",
vacancyId:""
  
  };
}
   
getPositionName(positionId: string): string {
  const position = this.positions.find((g) => g.positionId === positionId);
  return position ? position.name : 'Unknown Grade';
}
getBranchName(branchId: string): string {
  const branch = this.branches.find((g) => g.id === branchId);
  return branch ? branch.name : 'Unknown branch';
}
getGradeName(levelId: string): string {
  const grade = this.grades.find((g) => g.levelId === levelId);
  return grade ? grade.description : 'Unknown Grade';
} 
editVacancy(vacancy:
  Vacancy): void { 
    this.toggleVacancyForm();
      const vacancyEdit = this.vacancies.find(vac => vac.vacancyId === vacancy.vacancyId); 
      this.vacancy = vacancyEdit; 
      this.selectedBranch=vacancyEdit.branchId ;
      this.selectedGrade=vacancyEdit.levelId 
      this.selectedPosition=vacancyEdit.positionId 
      
       console.log("this.selectedBranch", this.vacancy)
     
    
      this.vacancyService.getVacancy(vacancyEdit.vacancyId).subscribe({ 
        next: (va) => { 
          this.vacancy = va; 
           
         
        }, 
        error: (response) => { 
          console.log(response); 
        } 
      }); 
    } 
}
