import { Component } from '@angular/core';
import { sortDescendingPriority } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PayRoll, TempPayroll } from 'app/models/Payroll/payroll.model';
import { Department } from 'app/models/education.model';
import { Employee } from 'app/models/employee.model';
import { Branch, Division, Grade, Position, Step } from 'app/models/job-description.model';
import { BranchService } from 'app/service/branch.service';
import { DepartmentService } from 'app/service/department.service';
import { DivisionService } from 'app/service/division.service';
import { EmployeeService } from 'app/service/employee.service';
import { GradeService } from 'app/service/grade.service';
import { PayrollService } from 'app/service/payroll.service';
import { PositionService } from 'app/service/position.service';
import { StepService } from 'app/service/step.service';
import { TempPayrollService } from 'app/service/temppayroll.service copy';
import { last } from 'rxjs';


@Component({
  selector: 'app-main-payroll',
  templateUrl: './main-payroll.component.html',
  styleUrls: ['./main-payroll.component.css']
})
export class MainPayrollComponent {
  selectedMonth:string;
  selectedYear:number;
  PayRollSaved:boolean=false
  generate:boolean=true
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
  selectedMonthStatus:string;
  end:string
  filteredPayRolls:PayRoll[]=[];
  filteredemployees;
 paySaved:boolean = false;
  searchTerm: string = ''; 
  PayRoll:boolean;
  showPayRollForm: boolean = false;
  PayRolls:PayRoll[]=[]
  TempPayRolls:TempPayroll[]=[]
  employees:Employee[]=[]; 
  branches:Branch[]=[]
  selectedEmployee:string
  selectedPayRollId:string
  employee:Employee
  PayRollUpdate:boolean=false
 // Array to hold filtered PayRolls
  fromDate: string; // Variable to store the "From" date
  toDate: string;
  isLoading:boolean=false;
  Positions:Position[]= [];
  divisions:Division[]= [];
  grades:Grade[]=[];
  steps:Step[];
  departments:Department[]=[]
  endDate:Date;
  years:number[]=[];

 pay:PayRoll={
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
hardShipA: 0,
telephoneA: 0,
transportA: 0,
taxExcemptedTA: 0,
housingA: 0,
livingA: 0,
otherTaxA: 0,
overTime: 0,
otDay: 0,
otNight: 0,
otWeekend: 0,
otHoliday: 0,
salaryAdvance: 0,
grossEarnings: 0,
taxableAmount: 0,
incomeTax: 0,
pensionContribution7: 0,
pensionContribution11: 0,
courtAndOtherD: 0,
creditAssociationD: 0,
registrationD: 0,
shareD: 0,
savingForCreditAssD: 0,
savingForHousingD: 0,
loanRefund: 0,
penality: 0,
costShareD: 0,
forStreetChildrenD: 0,
gebetaLehagerD: 0,
absentD:0,
totalDeduction: 0,
netPay: 0,
amtTransfer: 0,
promotionStatus: "",
actingStatus: "",
previousNet: 0,
payRollStartDate:"2023-07-20T13:56:00.062Z",
payRollEndDate: "2023-07-20T13:56:00.062Z",


}
  uploadSuccessMessage: string = '';
  uploadErrorMessage: string = '';
  selectedFile: File | null = null;

  constructor(
    private PayrollService: PayrollService,
    private payrollService: PayrollService,
    private employeeService:EmployeeService,
    private positionservice:PositionService ,
    private dialog: MatDialog ,
    private departmentService:DepartmentService,
    private divisionservice: DivisionService,
    private stepservice: StepService,
    private branchservice: BranchService,
    private gradeservice: GradeService,
    private tempPayrollService:TempPayrollService,
    private snackBar :MatSnackBar
 ) {

  this.generateYears()
 }
    
   
    
    ngOnInit(): void { 
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
          this.tempPayrollService.getAllTempPayroll().subscribe({
            next: (at) => { 
              // this.leaveRequest.empId = this.selectedEmployee; 
              this.TempPayRolls=at ;
         console.log("temp", this.TempPayRolls)
             }, 
            error: (response) => { 
              console.log(response); 
            } 
          
          })
this.PayrollService.getAllPayRoll().subscribe({
  next: (at) => { 
    // this.leaveRequest.empId = this.selectedEmployee; 
   // this.PayRolls=at ;
   // this.filteredPayRolls=at;
         
    console.log("allpayroll",this.PayRolls)
    var allpayroll=at.map(d =>new Date( d.payRollStartDate)
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

    this.end=new Intl.DateTimeFormat('en-US',{month:'long'}).format(new Date (2022,start.getMonth(),1))
 this.filteredPayRolls=at.filter(p => new Date(p.payRollStartDate).getMonth() == start.getMonth()&&
    new Date(p.payRollStartDate).getFullYear() == start.getFullYear()
    );
    this.PayRolls=at
  
   }, 
  error: (response) => { 
    console.log(response); 
  } 

})

     

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
    showSucessMessage(message:string) : void{
      this.snackBar.open(message,'Close',
      {duration:3000,
      
      horizontalPosition:'end',
        verticalPosition:'top',
      panelClass:['cardhead']
        })
        
        }
        getMonth(st:string){
          const stt=new Date(st)
           this.end=new Intl.DateTimeFormat('en-US',{month:'long'}).format(new Date (2022,stt.getMonth(),1));
          return this.end;
         }
    filterByMonth() {
      this.selectedMonthStatus=this.selectedMonth;
     

      if (true) {
  
 
    
        this.filteredPayRolls = this.PayRolls.filter(p => {
          const PayRollDate = new Date(p.payRollStartDate);
          const PayRollEndDate = new Date(p.payRollEndDate);
                    this.isLoading=true;
          setTimeout(() => {
            this.isLoading= false;
          }, 2000);
        
 var  re=( this.getMonth(p.payRollStartDate) == this.selectedMonth)
 && PayRollDate.getFullYear() == this.selectedYear
  && (PayRollDate.getDate() >= 16
   && PayRollEndDate.getDate() <= 15) 
console.log("re",this.getMonth(p.payRollStartDate))
                 return re    ;
        });
    
        
        if(this.filteredPayRolls.length==0){

          this.isLoading= false;
          
          this.PayRoll=true;
          setTimeout(() => {
          this.PayRoll= false;
          }, 2000);} }
           else {
        // If both dates are not selected, show all PayRolls
        this.filteredPayRolls = this.PayRolls;
        this.isLoading=false;
        this.PayRoll=true;
        setTimeout(() => {
          this.PayRoll= false;
        }, 1000);}

      }
      
      
    
    
  
    togglePayRollForm() {
      this.showPayRollForm = !this.showPayRollForm;
    }
    onEmployeeSelected(){
      this.employeeService.getEmployee(this.selectedEmployee)
.subscribe({
    
  next: (employees) => { 
    
    this.employee=employees;
    
  
  }})
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


      // this.filteredEmployees = this.employees; 
       if (this.searchTerm.trim() ==='') {
        var allpayroll=this.PayRolls.map(d =>new Date( d.payRollStartDate)
        )
       
        ;
      const sorted=allpayroll.sort((a,b)=>b.getMonth()- a.getMonth())
      
      const sortedAll =sorted.sort((a, b)=> a.getFullYear()-b.getFullYear())
      
            const currentDate =new Date();
        const start =sortedAll.find(d => d < currentDate)
        this.end=start.getMonth().toString();
         this.filteredPayRolls =this.PayRolls;
       } else {
      
         this.filteredPayRolls = this.PayRolls.filter(at => {
   
           return (this.end="",
               this.getEmployeeName(at.empId).toLowerCase().startsWith(this.searchTerm.toLowerCase()) 
              );
           
           
         });
       }
      
       }
     

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  

  
 
     addPayroll()
     {

      this.isLoading= true;
    const allpayroll = this.filteredPayRolls.map(d =>new Date( d.payRollEndDate))
      

  
    let fromDate = new Date();
    let toDate = new Date(this.toDate);
    
const sorted=allpayroll.sort((a,b)=>b.getMonth()- a.getMonth())

const sortedAll =sorted.sort((a, b)=> b.getFullYear()-a.getFullYear())


    const currentDate =new Date();
    const start =sortedAll.find(d => d < currentDate)
  
     const end=new Date(start)
  
   end.setDate(end.getDate()+30)


     if(end > currentDate || this.TempPayRolls.length ==0){
      this.isLoading=false;
   this.generate=false;

     }

 if(this.generate==true){
    this.payrollService.addPayRoll(this.pay)
      .subscribe({
      next:(All)=>{
        
        this.isLoading= false;
        this.showSucessMessage('Sucessfully Added!!')
       //  this.PayRolls.push({ ...this.pay });
       this.payrollService.getAllPayRoll()
       .subscribe({
       next:(all)=>{
         this.PayRolls=all
         this.filteredPayRolls=all
       }})
 
        this.pay = { 
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
 hardShipA: 0,
 telephoneA: 0,
 transportA: 0,
 taxExcemptedTA: 0,
 housingA: 0,
 livingA: 0,
 otherTaxA: 0,
 overTime: 0,
 otDay: 0,
 otNight: 0,
 otWeekend: 0,
 otHoliday: 0,
 salaryAdvance: 0,
 grossEarnings: 0,
 taxableAmount: 0,
 incomeTax: 0,
 pensionContribution7: 0,
 pensionContribution11: 0,
 courtAndOtherD: 0,
 creditAssociationD: 0,
 registrationD: 0,
 shareD: 0,
 savingForCreditAssD: 0,
 savingForHousingD: 0,
 loanRefund: 0,
 penality: 0,
 costShareD: 0,
 forStreetChildrenD: 0,
 gebetaLehagerD: 0,
 absentD:0,
 totalDeduction: 0,
 netPay: 0,
 amtTransfer: 0,
 promotionStatus: "",
 actingStatus: "",
 previousNet: 0,
 payRollStartDate:"2023-07-20T13:56:00.062Z",
 payRollEndDate: "2023-07-20T13:56:00.062Z",
 
 
       }
     ;
      },
      
       error(response){
        console.log(response)
      }
      }
     )}
    else{
      this.isLoading=false;
    }}
  
 


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
} }