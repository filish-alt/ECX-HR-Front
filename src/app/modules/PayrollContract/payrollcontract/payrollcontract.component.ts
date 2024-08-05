import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContractRegistration, PayrollContract } from 'app/models/Payroll/contract.model';
import { DepositeAuthentication } from 'app/models/deposite-authentication.model';
import { Department } from 'app/models/education.model';
import { Employee } from 'app/models/employee.model';
import { Branch, Division, EmployeePosition, Grade, Position, Step } from 'app/models/job-description.model';
import { BranchService } from 'app/service/branch.service';
import { ContractRegistrationService } from 'app/service/contractRegistrationservice';
import { DepartmentService } from 'app/service/department.service';
import { DepositeAuthenticationService } from 'app/service/deposite-authentcation.service';
import { DivisionService } from 'app/service/division.service';
import { EmployeePositionService } from 'app/service/employee-position';
import { EmployeeService } from 'app/service/employee.service';
import { GradeService } from 'app/service/grade.service';
import { PayrollContractService } from 'app/service/payrollContract.service';
import { PositionService } from 'app/service/position.service';
import { StepService } from 'app/service/step.service';

@Component({
  selector: 'app-payrollcontract',
  templateUrl: './payrollcontract.component.html',
  styleUrls: ['./payrollcontract.component.css']
})
export class PayrollcontractComponent {
end:string
  PayRollContract:boolean
  selectedMonth:string;
  selectedMonthStatus:string;
  selectedYear:number;
  PayRollContractSaved:boolean=false
  depositAuths:DepositeAuthentication[]=[]
  generate:boolean=true
  branches:Branch[]=[]
  selectedEmployee:string
  selectedPayRollId:string
  employees:ContractRegistration[]=[]
  PayRollContractUpdate:boolean=false
  filteredPayRollContracts: PayrollContract[]; // Array to hold filtered PayRolls
  PayRollContracts: PayrollContract[]; // Array to hold filtered PayRolls
 
  fromDate: string; // Variable to store the "From" date
  toDate: string;
  isLoading:boolean=false;
  Positions:Position[]= [];
  empPostions:EmployeePosition[]= [];
  searchTerm:string;
  depositAuthntication:DepositeAuthentication;
  divisions:Division[]= [];
  grades:Grade[]=[];
  steps:Step[];
  errormessage:boolean=false;
  departments:Department[]=[];
  incompleteEmployee:string=null;
  years:number[]=[];

  buttons = [
    { label: ' Monthly Payroll', route: '/payroll' },
    { label: ' Payroll', route: '/payroll/mainPayroll' },

    { label: ' Allowance', route: '/payroll/allowance' },
    { label: ' OverTime', route: '/payroll/overtime' },
    { label: ' Deduction', route: '/payroll/deduction' },
    
    { label: ' OtherPayroll', 
    dropdownOptions: [
   { label: ' Outsource', route: '/payroll/outsource' },
    { label: ' Contract', route: '/payroll/contract' },
   
    ]
   },    
    { label: ' Report', route: '/payroll/report' },

  ];

  payContract:PayrollContract={
    pId:0,
    id: undefined,
    createdBy: '', 
     createdDate: "2023-07-20T13:56:00.062Z", 
     updatedDate: "2023-07-20T13:56:00.062Z", 
     updatedBy: '', 
     empId: "635f3d70-cf5e-49b7-8c2b-9fe69fd3f970",
     status:0,
ecxId: "ecx/pi",
dateOfEmployeement: "2023-07-20T13:56:00.062Z",
positionID: "e90df1d0-024d-4629-b187-bdfdcef07479",
departmentID:"22b31b50-3f00-4376-920a-375a4f4d7604",
gradeID: "c81e28d3-e025-4224-9ad6-1ba2322c9792",
stepID: "38e3dd67-7124-4718-b8c7-097265bc28ab",
branchID: "34c48f29-5acf-484a-97e3-2385557f7058",
basicSalary: 0,
bank: "be8ed909-9bb9-400e-93ce-696f92c10bce",
bankBranch: "",
bankAccountNumber: 0,
tinNumber: "",
grossEarnings: 0,
taxableAmount: 0,
incomeTax: 0,
pensionContribution7: 0,
pensionContribution11: 0,
netPay: 0,
contractStartDate:"2023-07-20T13:56:00.062Z",
contractEndDate: "2023-07-20T13:56:00.062Z",
payRollEndDate:"2023-07-20T13:56:00.062Z",
payRollStartDate:"2023-07-20T13:56:00.062Z",

}
  constructor(
    private contractEmployeeService:ContractRegistrationService,
  
    private payrollContract:PayrollContractService,
    private employeePositionService:EmployeePositionService,
    private depositAuthenticationservice:DepositeAuthenticationService,
    private positionservice:PositionService ,
    private dialog: MatDialog ,
    private departmentService:DepartmentService,
    private divisionservice: DivisionService,
    private stepservice: StepService,
    private branchservice: BranchService,
    private gradeservice: GradeService,
    private snackBar :MatSnackBar
 ) {
  this.generateYears()
 }
    
   
    
    ngOnInit(): void { 
      this.payrollContract.getAllPayrollContract()
      .subscribe({
      next:(all)=>{
        this.PayRollContracts=all;
        var allpayroll=all.map(d =>new Date( d.payRollStartDate)
        )
       

        const sortedAll =allpayroll.sort((a, b)=>{

        if(a.getFullYear() !== b.getFullYear()){
     return b.getFullYear() -a.getFullYear()
        }

        
        if(a.getMonth() !== b.getMonth()){
          return b.getMonth() -a.getMonth()
             }
             

    return b.getDate() -a.getDate();
      
      });
      console.log("sorted", sortedAll)

            const currentDate =new Date();
        const start =sortedAll.find(d => d < currentDate)
    this.end=new Intl.DateTimeFormat('en-US',{month:'long'}).format(new Date (2022,start.getMonth(),1));
 
     this.filteredPayRollContracts=all.filter(p => new Date(p.payRollStartDate).getMonth() == start.getMonth()&&
        new Date(p.payRollStartDate).getFullYear() == start.getFullYear()
        );
      //this.PayRollContracts=this.filteredPayRollContracts
    
   
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
        
      this.contractEmployeeService.getAllContractRegistration()
      .subscribe({
        next: (em) => {
          this.employees=em;
     
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


          this.depositAuthenticationservice.getAllDepositeAuthentication()
          .subscribe({
            next: (deposit) => {
              this.depositAuths=deposit;
         
            },
            error(response){
              console.log(response)
            }
          });

          this.employeePositionService.getAllEmployeePosition()
          .subscribe({
            next: (emppostion) => {
              this.empPostions=emppostion;
         
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
addContractPayroll()
{
  this.isLoading=true;
  const allpayroll = this.filteredPayRollContracts.map(d =>new Date( d.payRollStartDate)
    )

    console.log("allpayroll",allpayroll)
  let fromDate = new Date();
  let toDate = new Date(this.toDate);

  ;
const sorted=allpayroll.sort((a,b)=>b.getMonth()- a.getMonth())

const sortedAll =sorted.sort((a, b)=> b.getFullYear()-a.getFullYear())

  console.log("sortedAll",sortedAll)
  const currentDate =new Date();
  const start =sortedAll.find(d => d < currentDate)

   const end=new Date(start)
 
 end.setDate(end.getDate()+30)

console.log("end",end)
   if(end > currentDate){
    this.isLoading=false;
 this.generate=false;

   }

if(this.generate==true ||this.PayRollContracts.length ==0){


      if(  this.incompleteEmployee!=null ){

        this.errormessage=true;
        setTimeout(() => {
         this.errormessage= false;
       }, 1000)

       }
    
console.log("incompleteEmployee",this.incompleteEmployee)
if(this.incompleteEmployee==null)
{
console.log("gebtual",this.incompleteEmployee)

this.payrollContract.addPayrollContract(this.payContract)
 .subscribe({
 next:(All)=>{


    this.isLoading= false;
    this.showSucessMessage('Sucessfully Added!!')

   
  //  this.TempPayRolls.push({ ...this.pay });
  this.payrollContract.getAllPayrollContract()
  .subscribe({
  next:(all)=>{
    this.PayRollContracts=all
    this.filteredPayRollContracts=all
  }})

   this.payContract = { 
    pId:0,
    id: undefined,
    createdBy: '', 
     createdDate: "2023-07-20T13:56:00.062Z", 
     updatedDate: "2023-07-20T13:56:00.062Z", 
     updatedBy: '', 
     empId: "635f3d70-cf5e-49b7-8c2b-9fe69fd3f970",
     status:0,
ecxId: "ecx/pi",
dateOfEmployeement: "2023-07-20T13:56:00.062Z",
positionID: "e90df1d0-024d-4629-b187-bdfdcef07479",
departmentID:"22b31b50-3f00-4376-920a-375a4f4d7604",
gradeID: "c81e28d3-e025-4224-9ad6-1ba2322c9792",
stepID: "38e3dd67-7124-4718-b8c7-097265bc28ab",
branchID: "34c48f29-5acf-484a-97e3-2385557f7058",
basicSalary: 0,
bank: "be8ed909-9bb9-400e-93ce-696f92c10bce",
bankBranch: "",
bankAccountNumber: 0,
tinNumber: "",
grossEarnings: 0,
taxableAmount: 0,
incomeTax: 0,
pensionContribution7: 0,
pensionContribution11: 0,
netPay: 0,
contractStartDate:"2023-07-20T13:56:00.062Z",
contractEndDate: "2023-07-20T13:56:00.062Z",
payRollEndDate:"2023-07-20T13:56:00.062Z",
payRollStartDate:"2023-07-20T13:56:00.062Z",


  }
;
 },
 
  error(response){
   console.log(response)
 }
 })

}

else{
this.errormessage=true;

}} else{
  this.isLoading=false;
}}
capitalizeFirstLetter(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}
getMonth(st:string){
  const stt=new Date(st)
   this.end=new Intl.DateTimeFormat('en-US',{month:'long'}).format(new Date (2022,stt.getMonth(),1));
  return this.end;
 }
filterByMonth() {
  this.selectedYear
  this.selectedMonthStatus=this.selectedMonth;
 

  if (true){



    this.filteredPayRollContracts = this.PayRollContracts.filter(p => {
      const PayRollDate = new Date(p.payRollStartDate);
      const PayRollEndDate = new Date(p.payRollEndDate);
                this.isLoading=true;
      setTimeout(() => {
        this.isLoading= false;
      }, 2000);
    
var re=( this.getMonth(p.payRollStartDate) == this.selectedMonth)
 && PayRollDate.getFullYear() == this.selectedYear
  && (PayRollDate.getDate() >= 16
   && PayRollEndDate.getDate() <= 15) 
console.log("re",re)

             return re    ;
    },
    //console.log("RE", this.filteredPayRollContracts)
    );
    if(this.filteredPayRollContracts.length==0){

      this.isLoading= false;
      
      this.PayRollContract=true;
      setTimeout(() => {
      this.PayRollContract= false;
      }, 2000);}  


  } else {
    
    this.isLoading=false;
}

  }

  generateYears(){
    const currentyear= new Date().getFullYear();
    const startyear=2000;

    for(let year=currentyear; year >= startyear; year--){
      this.years.push(year);
      console.log("years",this.years)
    }
  }
onSearch() {

this.selectedMonth=""

  // this.filteredEmployees = this.employees; 
   if (this.searchTerm.trim() ==='') {
    var allpayroll=this.PayRollContracts.map(d =>new Date( d.payRollStartDate)
    )
   
    ;
  const sorted=allpayroll.sort((a,b)=>b.getMonth()- a.getMonth())
  
  const sortedAll =sorted.sort((a, b)=> a.getFullYear()-b.getFullYear())
  
        const currentDate =new Date();
    const start =sortedAll.find(d => d < currentDate)
this.end=start.getMonth().toString();
     this.filteredPayRollContracts =this.PayRollContracts;
   } else {
  
     this.filteredPayRollContracts = this.PayRollContracts.filter(at => {

       return (this.end="",
           this.getEmployeeName(at.empId).toLowerCase().includes(this.searchTerm.toLowerCase()) 
          );
       
       
     });
   }
  
   }
 }
