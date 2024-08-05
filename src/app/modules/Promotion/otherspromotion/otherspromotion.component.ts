import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Department } from 'app/models/education.model';
import { Employee } from 'app/models/employee.model';
import { AssignSupervisor, Branch, Division, EmployeePosition, Grade, Position } from 'app/models/job-description.model';
import { PromotionRelation } from 'app/models/vacancy/promotion.model';
import { Vacancy } from 'app/models/vacancy/vacancy.model';
import { AssignSupervisorService } from 'app/service/AssignSupervisor';
import { BranchService } from 'app/service/branch.service';
import { DepartmentService } from 'app/service/department.service';
import { DivisionService } from 'app/service/division.service';
import { EmployeePositionService } from 'app/service/employee-position';
import { EmployeeService } from 'app/service/employee.service';
import { GradeService } from 'app/service/grade.service';
import { PositionService } from 'app/service/position.service';
import { PromotionRelationService } from 'app/service/promotionrelation.service';
import { VacancyService } from 'app/service/vacancy.service';
import { dateFormats } from 'highcharts';

@Component({
  selector: 'app-otherspromotion',
  templateUrl: './otherspromotion.component.html',
  styleUrls: ['./otherspromotion.component.css']
})
export class OtherspromotionComponent {
  departments :Department[]=[]
  selectedEmployeeDepartment:string;
  selectedDepartment:string='';
  @ViewChild('printableCard') printableCard !:ElementRef
  selectedEmployeepostion:string='';
  selectedPosition:string=''
  
  employeePostions :EmployeePosition[]=[]

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
 selectedEmployee:string;
 employee:Employee[]=[];
 supervisorPositions:AssignSupervisor[]=[]
 supervisorEmployees:Employee[]=[]; 
 supervisoremployees:EmployeePosition[]=[]

 divisions:Division[]= [];
 currentSupervisorPosition:string
 currentEmployee:string='b59d425a-bc45-4992-8844-5e7f76b2dc68';
 
 assignedSupervisors:AssignSupervisor[]=[];
 selectedFirstSupervisor:string='';

  constructor( 
 
    private router: Router, 
    private dialog: MatDialog, 
    private vacancyService: VacancyService,
    private positionservice: PositionService,
    private gradeservice: GradeService,
    private branchService: BranchService,
    private employeeService: EmployeeService,
    private promotionRelationService:PromotionRelationService,
    private divisionservice: DivisionService,
   private formBuilder: FormBuilder,
    private employeepostionservice : EmployeePositionService,
   private assignSupervisorService:AssignSupervisorService,
    private departmentService:DepartmentService,


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
    this.departmentService.getAllDepartment()
    .subscribe({
      next: (dep) => {
        this.departments=dep;
      },
      error(response){
        console.log(response)
      }
    });
    this.divisionservice.getAllDivisions()
    .subscribe({
      next: (division) => {
        this.divisions=division;
      },
      error(response){
        console.log(response)
      }
    });
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
    this.employeeService.getAllEmployees() 
    .subscribe({ 
      next: (employees) => { 
        this.employee=employees; 
      }, 
      error(response){ 
        console.log(response) 
      }, 
       
    }); 
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
   
this.promotionRelationService.getPromotionRelation(this.selectedEmployee).subscribe({
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
    this.positionservice.getAllPosition()
    .subscribe({
      next: (positions) => {
        this.positions=positions;
        
      },
      error(response){
        console.log(response)
      }
    });
    this.assignSupervisorService.getAllAssignSupervisor()
.subscribe({
  next: (assignedSupervisors) => {



    this.employeepostionservice.getAllEmployeePosition()  
.subscribe({  
  next: (employeePostions) => { 
    // this.leaveRequest.empId = this.selectedEmployee; 
   
    const supervisoremployeePostions=employeePostions.find(emp=>emp.empId === this.currentEmployee)
console.log("s",supervisoremployeePostions)
    this.currentSupervisorPosition=supervisoremployeePostions.position
    console.log("spostion", this.currentSupervisorPosition)

    
    this.assignedSupervisors=assignedSupervisors;
     this.supervisorPositions=assignedSupervisors.filter(sup=>sup.firstSupervisor===this.currentSupervisorPosition)
    console.log("list of pos",assignedSupervisors)
   console.log("sec list of pos",this.currentSupervisorPosition)

   console.log("supervisorpostion",this.supervisorPositions)
  //this.positionsOfSupervisor=this.supervisorPositions.positionId;
    //console.log("sup pos",this.positionsOfSupervisor)
    this.employeePostions=employeePostions 
  this.supervisorPositions.forEach(element => {
      this.supervisoremployees=employeePostions.filter(emp=>emp.position === element.positionId)
   
      console.log(" employees", this.supervisoremployees)

     
});
    

   this.employeeService.getAllEmployees()  
   .subscribe({  
     next: (employees) => { 
       // this.leaveRequest.empId = this.selectedEmployee; 
       this.employee=employees 
       this.supervisoremployees.forEach(element=> {
      const sup=employees.find(emp => emp.empId === element.empId);
       this.supervisorEmployees.push(sup)


       
       }); console.log(" suvemp", this.supervisorEmployees)
           }, 
     error: (response) => { 
       console.log(response); 
     } 
   }); 
   
   

 
   }, 
  error: (response) => { 
    console.log(response); 
  } 
}); 


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
    const promotionRelation = this.promotionRelations.find((pr) => pr.vacancyId === vacancyId && pr.empId ==this.selectedEmployee);

    return !promotionRelation || promotionRelation.promotionStatus === 'Pendding';
  }

  
  apply(vacancy :Vacancy){

    this.promotionRelation.empId = this.selectedEmployee;
    this.promotionRelation.createdBy=this.currentEmployee;
  
  this.promotionRelation.empId=this.selectedEmployee;
  this.promotionRelation.vacancyId=vacancy.vacancyId;
  this.promotionRelation.promotionStatus="Applied";
    this.promotionRelationService.addPromotionRelation(this.promotionRelation)
    .subscribe({
      next: (employee) => {
        this.promotionRelationSaved = true;
          setTimeout(() => {
        this.promotionRelationSaved = false;
      }, 2000);
     


      
    this.promotionRelationService.getPromotionRelation(this.selectedEmployee).subscribe({
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
        empId:"2b500348-4371-4f1a-a62d-461d9f822e25",
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
   getSupervisorName(positionId: string): string {
    const position = this.positions.find((position) => position.positionId === positionId);
    return position ? position.name : '';
  }

  
        getDepartmentName(departmentId: string): string {
          const department = this.departments.find((division) => division.departmentId === departmentId);
          return department ? department.description : '';
        }
   onemployeeselected() :void{
    this.promotionRelationService.getPromotionRelation(this.selectedEmployee).subscribe({
      next: (promotionRelation) => {
        this.promotionRelations = promotionRelation;
    
      },
      error: (response) => {
        console.log(response);
      }
    });
    this.vacancy
    console.log( "emp",this.employeePostions)
    const postion= this.employeePostions.find((balance) => balance.empId === this.selectedEmployee) 
    this.selectedPosition = this.getPositionName( postion.position)
    this.selectedEmployeepostion=postion.position
      
    const selectedDivision=postion.divisionId 
    const division=this.divisions.find(division => division.divisionId === selectedDivision);
    console.log("deps",division)
    const selectedDepartment = this.departments.find(department => department.departmentId === division.departmentId)

   
      this.selectedDepartment = selectedDepartment.departmentId;
      this.selectedEmployeeDepartment=this.getDepartmentName(this.selectedDepartment )
   console.log("deppartment",  this.selectedEmployeeDepartment);
 
    const selectedPosition = this.selectedEmployeepostion;
   
   
    if (selectedPosition ) {
      
      //const selectedDivision = this.divisions.find(division => division.divisionId === selectedPosition.divisionId);

console.log(this.assignedSupervisors)
const selectedassignedSupervisor= this.assignedSupervisors.find(assignedSupervisor => assignedSupervisor.positionId === selectedPosition);
console.log("Selected Position:", selectedPosition);
console.log("Selected Assigned Supervisor:", selectedassignedSupervisor);

if(selectedassignedSupervisor){
  this.selectedFirstSupervisor=selectedassignedSupervisor.firstSupervisor;

}
}
}
}