import { Component,Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { PayRoll, TempPayroll,  } from 'app/models/Payroll/payroll.model';
import { DepositeAuthentication } from 'app/models/deposite-authentication.model';
import { Department } from 'app/models/education.model';
import { Employee } from 'app/models/employee.model';
import { Branch, Division, EmployeePosition, Grade, Position, Step } from 'app/models/job-description.model';
import { BranchService } from 'app/service/branch.service';
import { DepartmentService } from 'app/service/department.service';
import { DepositeAuthenticationService } from 'app/service/deposite-authentcation.service';
import { DivisionService } from 'app/service/division.service';
import { EmployeePositionService } from 'app/service/employee-position';
import { EmployeeService } from 'app/service/employee.service';
import { GradeService } from 'app/service/grade.service';
import { PayrollService } from 'app/service/payroll.service';
import { PositionService } from 'app/service/position.service';
import { StepService } from 'app/service/step.service';

import { TempPayrollService,  } from 'app/service/temppayroll.service copy';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'
@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css'],
  styles: [`
  ::ng-deep .mat-snack-bar-container{
    color: #155724 !important;
    background-color: #d4edda !important;
    border-color: #c3e6cb !important;
  }
  ::ng-deep .mat-simple-snackbar-action {
    color: red;
  }
`]
})
export class PayrollComponent {
  selectedMonth:string;
  selectedYear:string;
  PayRollSaved:boolean=false
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
  filteredTempPayRolls:TempPayroll[]=[];
  filteredemployees;
 paySaved:boolean = false;
  searchTerm: string = ''; 
  TempPayRoll:boolean;
  
  showPayRollForm: boolean = false;
  TempPayRollSaved:boolean;
  TempPayRolls:TempPayroll[]=[]
  PayRolls:PayRoll[]=[]
  depositAuths:DepositeAuthentication[]=[]
  employees:Employee[]=[]; 
  branches:Branch[]=[]
  selectedEmployee:string
  selectedPayRollId:string
  employee:Employee
  TempPayRollUpdate:boolean=false
  filteredPayRolls: PayRoll[]; // Array to hold filtered PayRolls
  fromDate: string; // Variable to store the "From" date
  toDate: string;
  isLoading:boolean=false;
  Positions:Position[]= [];
  empPostions:EmployeePosition[]= [];
  emppostion:EmployeePosition;
  depositAuthntication:DepositeAuthentication;
  divisions:Division[]= [];
  grades:Grade[]=[];
  steps:Step[];
  errormessage:boolean=false;
  departments:Department[]=[];
  incompleteEmployee:string=null;
  end:string;



 pay:TempPayroll={
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
    private tempPayrollService: TempPayrollService,
    private payrollService: PayrollService,
    private employeeService:EmployeeService,
    private employeePositionService:EmployeePositionService,
    private depositAuthenticationservice:DepositeAuthenticationService,
    private positionservice:PositionService ,
    private dialog: MatDialog ,
    private departmentService:DepartmentService,
    private divisionservice: DivisionService,
    private stepservice: StepService,
    private branchservice: BranchService,
    private gradeservice: GradeService,
    private snackBar :MatSnackBar,
    private renderer:Renderer2,
    private router: Router
 ) {
  router.events.subscribe((event: RouterEvent) => {
    this.navigationInterceptor(event)
  })
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

this.tempPayrollService.getAllTempPayroll().subscribe({
  next: (at) => { 
    // this.leaveRequest.empId = this.selectedEmployee; 
    this.TempPayRolls=at ;
    this.filteredTempPayRolls=at;
    var start=new Date (at.find(t=>new Date(t.payRollEndDate)!=undefined).payRollEndDate)
    this.end=new Intl.DateTimeFormat('en-US',{month:'long'}).format(new Date (2022,start.getMonth()-1,1))

    
   }, 
  error: (response) => { 
    console.log(response); 
  } 

})

     
this.payrollService.getAllPayRoll().subscribe({
  next: (at) => { 
    // this.leaveRequest.empId = this.selectedEmployee; 
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
        this.employees.forEach(element => {
     

          this.employeePositionService.getEmployeePosition(element.empId).subscribe({
    
            next: (ep) => { 
              this.emppostion=ep;
              console.log("this.emppostion",this.emppostion)
              if(this.emppostion==null ){
                this.incompleteEmployee = element.empId;
            
               }
             
       
            }})
          
        this.depositAuthenticationservice.getDepositeAuthentication(element.empId).subscribe
        ({
    
          next: (da) => { 
            this.depositAuthntication=da;
             console.log("this.depositAuthntication",this.depositAuthntication)
             if(this.depositAuthntication==null){
              this.incompleteEmployee = element.empId;
              
     
             }
          }})
           
        
      });
           }, 
      error: (response) => { 
        console.log(response); 
      } 
    }); 
    
  
}
navigationInterceptor(event: RouterEvent): void {
  if (event instanceof NavigationStart) {
    this.isLoading = true;
  }
  if (event instanceof NavigationEnd) {
    this.isLoading = false;
  }

  // Set loading state to false in both of the below events to hide the spinner in case a request fails
  if (event instanceof NavigationCancel) {
    this.isLoading = false;
  }
  if (event instanceof NavigationError) {
    this.isLoading = false;
  }
}
showSucessMessage(message:string) : void{
  this.snackBar.open(message,'Close',
  {duration:3000,
    panelClass: ['success-snackbar'],
  horizontalPosition:'end',
    verticalPosition:'top',

    })
   
    }
capitalizeFirstLetter(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

    filterByMonth() {


      if (this.fromDate && this.toDate) {
        let fromDate = new Date(this.fromDate);
        let toDate = new Date(this.toDate);
    
        // Subtract one day from the "From" date
        fromDate.setDate(fromDate.getDate() - 1);
    
        this.filteredTempPayRolls = this.TempPayRolls.filter(p => {
          const PayRollDate = new Date(p.payRollStartDate);
                    this.isLoading=true;
          setTimeout(() => {
            this.isLoading= false;
          }, 2000);
        
        

       return  PayRollDate >= fromDate && PayRollDate <= toDate  ;
        });
      } else {
        // If both dates are not selected, show all PayRolls
        this.filteredPayRolls = this.TempPayRolls;
        this.isLoading=false;
        this.TempPayRoll=true;
        setTimeout(() => {
          this.TempPayRoll= false;
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
    onSearch() {


      // this.filteredEmployees = this.employees; 
       if (this.searchTerm.trim() ==='') {
    
         this.filteredTempPayRolls =this.TempPayRolls;
       } else {
      
         this.filteredTempPayRolls = this.TempPayRolls.filter(at => {
   
           return (
               this.getEmployeeName(at.empId).toLowerCase().startsWith(this.searchTerm.toLowerCase()) 
              );
           
           
         });
       }
      
       }
     

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  

    addTempPayroll()
    {
      this.isLoading=true;

          if(  this.incompleteEmployee!=null ){
            this.isLoading=false;
            this.errormessage=true;
            setTimeout(() => {
             this.errormessage= false;
           }, 1000)
   
           }
        
  console.log("incompleteEmployee",this.incompleteEmployee)
 if(this.incompleteEmployee==null)
 {
  console.log("gebtual",this.incompleteEmployee)
  
   this.tempPayrollService.addTempPayroll(this.pay)
     .subscribe({
     next:(All)=>{
    

        this.isLoading= false;
 
        this.showSucessMessage('Sucessfully Calculated!!')


       
      //  this.TempPayRolls.push({ ...this.pay });
      this.tempPayrollService.getAllTempPayroll()
      .subscribe({
      next:(all)=>{
        this.TempPayRolls=all
        this.filteredTempPayRolls=all
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
     })
 
 }

else{
  this.errormessage=true;

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