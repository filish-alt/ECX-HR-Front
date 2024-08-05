import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Bank } from 'app/models/Payroll/Bank.model';
import { DepositeAuthentication } from 'app/models/deposite-authentication.model';
import { Department } from 'app/models/education.model';
import { Employee } from 'app/models/employee.model';
import { Branch, Division, EmployeePosition, Grade, Position, Step } from 'app/models/job-description.model';
import { MedicalRequests } from 'app/models/medical/medical.model';
import { Spouse } from 'app/models/spouse.model';
import { BankService } from 'app/service/bank.service';
import { BranchService } from 'app/service/branch.service';
import { DepartmentService } from 'app/service/department.service';
import { DepositeAuthenticationService } from 'app/service/deposite-authentcation.service';
import { DivisionService } from 'app/service/division.service';
import { EmployeePositionService } from 'app/service/employee-position';
import { EmployeeService } from 'app/service/employee.service';
import { GradeService } from 'app/service/grade.service';
import { MedicalRequestService } from 'app/service/medicalrequest.service';
import { PositionService } from 'app/service/position.service';
import { SpouseService } from 'app/service/spouse.service';
import { StepService } from 'app/service/step.service';

@Component({
  selector: 'app-medicalreport',
  templateUrl: './medicalreport.component.html',
  styleUrls: ['./medicalreport.component.css']
})
export class MedicalreportComponent {
  @ViewChild('printableCard') printableCard !:ElementRef
  spouses:Spouse[]=[]
  selectedMonth:string;
  selectedYear:number;
  MedicalRequestsaved:boolean=false
  generate:boolean=true
  see:boolean=false
  approvalStatus:string="Admin-Approved"
  buttons = [
    { label: ' Medical Request ',
    dropdownOptions: [
     { label: ' Medical Request ', route: '/medicalRequest' }, 
     { label: 'Self Medical Request', route: '/medicalSelfRequest' },  ]},
    
     {label:'Medical Balance',
     dropdownOptions: [{ label: ' Medical Balance ', route: '/medicalBalance' }, 
     { label: 'Self Medical Balance', route: '/selfMedBalance' }, 
   ]
     },
       { label: 'Approval',
     dropdownOptions: [

     { label: ' HR-Approval ', route: '/medicalHr' }, 
     { label: ' Finance-Approval ', route: '/medicalFinance' }, ]
     },
     { label: ' MedicalReport', route: '/medicalReport' }, 
     { label: ' ApprovedMedicalPays ', route: '/medicalPay' }, 
     { label: ' PaidMedicalFunds ', route: '/approvedMedical' }, 

  ];

  filteredemployees;

  searchTerm: string = ''; 
  MedicalRequest:boolean;
  showMedicalRequestForm: boolean = false;


  employees:Employee[]=[]; 
  branches:Branch[]=[]
  selectedEmployee:string
  selectedMedicalRequestId:string
  employee:Employee
  MedicalRequestUpdate:boolean=false
  MedicalRequests:MedicalRequests[]=[]
  filteredMedicals:MedicalRequests[]=[]
  DepositeAuthentication:DepositeAuthentication[]=[]
 // Array to hold filtered MedicalRequests
  fromDate: string; // Variable to store the "From" date
  toDate: string;
  isLoading:boolean=false;
  Positions:Position[]= [];
  divisions:Division[]= [];
  grades:Grade[]=[];
  steps:Step[];
  departments:Department[]=[]
  endDate:Date;
  Banks:Bank[]=[]
  selectedBank:string
 med:MedicalRequests={
    pId: 0, 
      medicalRequestId:undefined, 
      createdBy: "", 
      createdDate: "2023-07-26T06:13:52.512Z", 
      updatedDate: "2023-07-26T06:13:52.512Z", 
      updatedBy: "", 
      status: 0, 
      empId:'', 
      institutionName: "",
      address: "",
      remark: "",
      approvalStatus: "",
      medicalExamination: 0,
      laboratory: 0,
      medicine: 0,
      hospitalBed: 0,
      otherRelated: 0,
      total: 0,
      file: "",
      receiptFile:"",
      date: "2023-07-26T06:13:52.512Z",
      supervisor:"",
      spouseId: "",
      totalFund:0
}
  uploadSuccessMessage: string = '';
  uploadErrorMessage: string = '';
  selectedFile: File | null = null;

  constructor(
    private MedicalRequestservice: MedicalRequestService,
    private employeeService:EmployeeService,
    private spouseService:SpouseService,

    private positionservice:PositionService ,
    private bankservice:BankService ,
    private dialog: MatDialog ,
    private departmentService:DepartmentService,
    private divisionservice: DivisionService,
    private stepservice: StepService,
    private branchservice: BranchService,
    private gradeservice: GradeService,
    private depositeAuthenticationservice:DepositeAuthenticationService

 ) {}
    
   
    
    ngOnInit(): void { 
      this.bankservice.getAllBank()
      .subscribe({
        next: (bn) => {
          this.Banks=bn;
        console.log("banksssss",this.Banks)
        },
        error(response){
          console.log(response)
        }
      });
      this.spouseService.getAllSpouse()
.subscribe({
next: (s) => {
  this.spouses=s.filter(s => s.empId === this.selectedEmployee);;
},
error(response){
  console.log(response)
}
});
this.depositeAuthenticationservice.getAllDepositeAuthentication()
.subscribe({
next: (s) => {
  this.DepositeAuthentication=s;;
},
error(response){
  console.log(response)
}
});
      this.MedicalRequestservice.getAllMedicalRequest()
      .subscribe({
      next:(all)=>{
        this.MedicalRequests=all.filter(p=>p.approvalStatus==this.approvalStatus)
       
   this.filteredMedicals=all.filter(p=>p.approvalStatus==this.approvalStatus)
       
        
        console.log("this.filteredMedicals",all,this.approvalStatus)
      }})
      
      this.divisionservice.getAllDivisions()
      .subscribe({
        next: (division) => {
          this.divisions=division;
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
      this.stepservice.getAllStep()
      .subscribe({
        next: (st) => {
          this.steps=st;
        },
        error(response){
          console.log(response)
        }
      });
      this.departmentService.getAllDepartment()
      .subscribe({
        next: (dep) => {
          this.departments=dep;
        },
        error(response){
          console.log(response)
        }
      });
      this.gradeservice.getAllGrade()
      .subscribe({
        next: (gr) => {
          this.grades=gr;
        },
        error(response){
          console.log(response)
        }
      });

              
          this.positionservice.getAllPosition()
          .subscribe({
            next: (positions) => {
              this.Positions=positions;
                },
            error(response){
              console.log(response)
            }
          });


     

      this.employee = {
        pId: 0, // You can add any specific validation rule here, like Validators.required 
        createdBy: "string",
        createdDate:  "2023-07-25T09:28:33.440Z", 
        updatedDate: "2023-07-25T09:28:33.440Z", 
        updatedBy: 'string', 
        empId: "635f3d70-cf5e-49b7-8c2b-9fe69fd3f970", // You can add any specific validation rule here, like Validators.required 
        ecxId: 'ecx/pi', 
        adId: 'ad/pi', 
        firstName:'', 
        middleName: '', 
        lastName: '',
        joinDate: '2023-07-25T09:28:33.440Z', 
        sex: '', 
        dateOfBityh: '2023-07-25T09:28:33.440Z', 
        placeOfBith: '', 
        martialStatus: '', 
        salutation: '', 
        nationality: '', 
        pensionNo: '', 
        imageData: '', 
        crime: false, 
        crimeDescription: " ", 
       attendanceId:undefined,
        status: 0, 
      };
  
    this.employeeService.getAllEmployees()  
    .subscribe({  
      next: (employees) => { 
        // this.leaveRequest.empId = this.selectedEmployee; 
        this.employees=employees 
           }, 
      error: (response) => { 
        console.log(response); 
      } 
    }); 
    }
    capitalizeFirstLetter(text: string): string {
      if (!text) return text;
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
    getSpouseName(Id: string): string {  
      const spouse = this.spouses.find((g) => g.id === Id);  
      return spouse ? spouse.name:"";  
    }  
      
  printCard(){
    this.see=true;
    if(this.see==true){
    let printContents=this.printableCard.nativeElement.innerHTML;
    
    let orginalContent=document.body.innerHTML;
    document.body.innerHTML=printContents
    window.print();

    document.body.innerHTML=orginalContent;
    }
   }
 
    
  
    toggleMedicalRequestForm() {
      this.showMedicalRequestForm = !this.showMedicalRequestForm;
    }
    onEmployeeSelected(){
      this.employeeService.getEmployee(this.selectedEmployee)
.subscribe({
    
  next: (employees) => { 
    
    this.employee=employees;
    
  
  }})
    }
    onSearch() {


      // this.filteredEmployees = this.employees; 
       if (this.searchTerm.trim() ==='') {
    
         this.filteredMedicals =this.MedicalRequests;
         
       } else {
      
         this.filteredMedicals = this.MedicalRequests.filter(at => {
          
           return (
               this.getEmployeeName(at.empId).toLowerCase().startsWith(this.searchTerm.toLowerCase()) 
               
           )})
         }
         }
        
          
        
       
   
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  

  
 

getEmployeeName(empId: string): string { 
  const employee = this.employees.find((g) => g.empId === empId); 
  //console.log(employee.firstName)
  return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
}

getStepName(id: string): string {
  const ss = this.steps.find((s) => s.id === id);
  return ss ? ss.description : '';
}

getGradeName(id: string): string {
  const grade = this.grades.find((g) => g.levelId === id);
  return grade ? grade.description : '';
}

getPositionName(positionId: string): string {


  const position = this.Positions.find((position) => position.positionId === positionId);  
 
  return position ? position.name  : '';
}
getBranchName(Id: string): string {


  const branch = this.branches.find((dd) => dd.id === Id);  
  return branch ? branch.name  : '';
}
getDepartmentName(departmentId: string): string {
  const department = this.departments.find((division) => division.departmentId === departmentId);
  return department ? department.description : '';
}
getBankName(emp:string)
{ 
   var deposite=this.DepositeAuthentication.find(d=>d.empId==emp)

  ;

   return  deposite? this.getBank(deposite.bankId) : '';
}

getBank(id:string)
{ 
    const bank = this.Banks.find((bn) => bn.id ===id);

   return bank ? bank.bankName : '';
}


getBankBranch(emp:string){
  var deposite=this.DepositeAuthentication.find(d=>d.empId==emp)

  const bankB = deposite;
  return bankB ? bankB.bankBranch : '';
}
getAccountNumber(emp:string){
  var deposite=this.DepositeAuthentication.find(d=>d.empId==emp)

  const bankA = deposite;;
  return bankA ? bankA.bankAccount : '';
}}