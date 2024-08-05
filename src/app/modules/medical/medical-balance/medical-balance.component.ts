import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Employee } from 'app/models/employee.model';
import { EmployeeService } from 'app/service/employee.service';
import { PositionService } from 'app/service/position.service';
import { EmployeePositionService } from 'app/service/employee-position';
import { EmployeePosition, Position } from 'app/models/job-description.model';
import { MedicalBalance } from 'app/models/medical/medical.model';
import { MedicalBalancesService } from 'app/service/medicalbalance.service';
import { Spouse } from 'app/models/spouse.model';
import { SpouseService } from 'app/service/spouse.service';
@Component({
  selector: 'app-medical-balance',
  templateUrl: './medical-balance.component.html',
  styleUrls: ['./medical-balance.component.css']
})
export class MedicalBalanceComponent {
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
  medicalBalanceSaved: boolean = false;
  medicalBalanceUpdated: boolean = false;
 medicalBalances:MedicalBalance[]=[]
 othermedicalBalanceSaved: boolean = false;
 othermedicalBalanceUpdated: boolean = false;

 employees:Employee[]=[]
  spouses:Spouse[]=[]
   selectedmedicalType: string='';
   employeepostion;
   selectedEmployee: Employee[]=[];
   positions:Position[];
   employeePostions :EmployeePosition[]=[];
  empIdsWithmedicalBalances;
  empIdsWithOthermedicalBalances;

 
  medicalBalance:MedicalBalance={

 empId: " ",
 medicalRequestId: undefined,
 spouseId: "",
 selfBalance: 0,
 familyBalance: 0,
 startDate: "2023-07-26T06:13:52.512Z",
 endDate: "2023-07-26T06:13:52.512Z",
 status:0,
 pId:0,
 id: "",
createdBy: "", 
createdDate: "2023-07-26T06:13:52.512Z", 
updatedDate: "2023-07-26T06:13:52.512Z", 
 updatedBy: " ",
 
   }
   
  
  searchTerm: string = ''; 
 
   filteredmedicalBalances: MedicalBalance[]=[]; 
 
      employeePostion: EmployeePosition;
 constructor(

   private medicalBalanceService: MedicalBalancesService,
      private employeeService:EmployeeService,
    private postionService :PositionService,
    private spouseService :SpouseService,
    private employeepostionService : EmployeePositionService,
   private dialog: MatDialog,
   private router:Router){}
 ngOnInit(): void{
 

   this.employeeService.getAllEmployees() 
 .subscribe({ 
   next: (employees) => { 
     this.employees=employees
 
     this.employeepostionService.getAllEmployeePosition()
     .subscribe({
       next: (employeepositions) => {
         this.employeePostions=employeepositions;
       },
       error(response){
         console.log(response)
       }
     });    
     this.medicalBalanceService.getAllMedicalBalances()
     .subscribe({
       next: (medicalBalances) => {
         this.medicalBalances =medicalBalances;
         this.filteredmedicalBalances=medicalBalances;
         const empIdsWithmedicalBalances = medicalBalances.map((lb) => lb.empId);
      console.log("this" ,this.filteredmedicalBalances)
    
            
       },
       error(response){
         console.log(response)
       }
     });
 
   },
   error(response){
     console.log(response)
   }
 });

 this.spouseService.getAllSpouse()
.subscribe({
next: (s) => {
  this.spouses=s;
},
error(response){
  console.log(response)
}
});

 }
 
 
 addmedicalBalancesForSelectedEmployees() {
   for (const employee of this.selectedEmployee) {
     const newmedicalBalance: MedicalBalance = {
       pId:this.medicalBalance.pId,
       empId: employee.empId,
       status: this.medicalBalance.status,
       startDate: this.medicalBalance.startDate,
       endDate: this.medicalBalance.endDate,
       createdBy: this.medicalBalance.createdBy,
       createdDate: this.medicalBalance.createdDate,
       updatedDate: this.medicalBalance.updatedDate,
       updatedBy: this.medicalBalance.updatedBy,   
      medicalRequestId: this.medicalBalance.medicalRequestId,
      spouseId: this.medicalBalance.spouseId,
     selfBalance: this.medicalBalance.selfBalance,
     familyBalance: this.medicalBalance.familyBalance,
         id: this.medicalBalance.id,

 
     };
 
     this.medicalBalanceService.addMedicalBalances(newmedicalBalance).subscribe({
       next: (employees) => {
   
       
         this.medicalBalanceSaved = true;
         setTimeout(() => {
           this.medicalBalanceSaved = false;
         }, 2000);
 
         // Fetch updated medical balances
        
 
         // Add the current medical balance to the array
         this.filteredmedicalBalances.push({ ...newmedicalBalance });
       },
       error(response) {
         console.log(response);
       }
     });
   
 
 
   
 

 }
 }
 capitalizeFirstLetter(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}
 onSearch() {
 // this.filteredEmployees = this.employees; 
    if (this.searchTerm.trim() === '') {
   
      this.filteredmedicalBalances = this.medicalBalances;
     
    } else {
   
     this.filteredmedicalBalances = this.medicalBalances.filter(medicalBalance => {
       return this.getEmployeeName(medicalBalance.empId)
         .toLowerCase()
         .includes(this.searchTerm.toLowerCase());
     });
 
  
 
    }
   
    }
    getSpouseName(Id: string): string {  
      const spouse = this.spouses.find((g) => g.id === Id);  
      return spouse ? spouse.name:"";  
    }   
  
    getpostion(empId:string){
   
     this.employeepostionService.getEmployeePosition(empId)
     .subscribe({
       next: (employeepositions) => {
         this.employeePostion =employeepositions
         console.log('this'+this.employeePostion.position)
       },})
     
   }
 
 
 
   getEmployeeName(empId: string): string { 
     const employee = this.employees.find((g) => g.empId === empId); 
     //console.log(employee.firstName)
     return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
   }
    
   
     
   

 }
