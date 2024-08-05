import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Employee } from 'app/models/employee.model';
import { LeaveType } from 'app/models/leaveType.model';
import { AnnualLeaveBalance, OtherLeaveBalance } from 'app/models/leaverequestmodel';
import { EmployeeService } from 'app/service/employee.service';
import { LeaveTypeService } from 'app/service/leaveType.service';
import { LeaveBalanceService } from 'app/service/leavebalance.service';
import { OtherLeaveBalanceService } from 'app/service/otherleavebalance.service';
import { EmployeeLeaveDetailComponent } from '../employee-leave-detail-modal/employee-leave-detail.component';
import { EditLeaveBalanceModalComponent } from '../edit-leave-balance-modal/edit-leave-balance-modal.component';
import { EditOtherLeaveBalanceComponent } from '../edit-other-leave-balance- modal/edit-other-leave-balance.component';
import { PositionService } from 'app/service/position.service';
import { EmployeePositionService } from 'app/service/employee-position';
import { EmployeePosition, Position } from 'app/models/job-description.model';



@Component({
  selector: 'app-leavebalance',
  templateUrl: './leavebalance.component.html',
  styleUrls: ['./leavebalance.component.scss']
})
export class LeavebalanceComponent {
 leaveBalanceSaved: boolean = false;
 leaveBalanceUpdated: boolean = false;
leaveBalances:AnnualLeaveBalance[]=[]
otherleaveBalanceSaved: boolean = false;
otherleaveBalanceUpdated: boolean = false;
otherleaveBalances:OtherLeaveBalance[]=[]
employees:Employee[]=[]
  leaveTypes:LeaveType[]= [];
  selectedLeaveType: string='';
  employeepostion;
  selectedEmployee: Employee[]=[];
  positions:Position[];
  employeePostions :EmployeePosition[]=[];
 empIdsWithLeaveBalances;
 empIdsWithOtherLeaveBalances;
  buttons = [ 
    { label: ' Leave Request Form ', route: '/leave/leave-request-form' }, 
    { label: ' Leave Balance ', route: '/leave/leave-balance' }, 
    { label: ' Leave Approval ', route: '/leave/leave-approve' }, 
    { label: ' Employee Leave Balance ', route: '/leave/employeeleavebalance' }, 
    { label: 'Admin Leave Approval ', route: '/leave/leave-requests' }, 
    { label: 'Approved Leaves ', route: '/leave/approvedleaves' }, 
  ]; 

 leaveBalance:AnnualLeaveBalance={
    pId:0,
    empId:"",
    id:undefined,
isExpired:0,
  status:0,
  startDate: '2023-07-21T08:09:41.138Z',
  endDate: '2023-07-21T08:09:41.138Z',
createdBy: '',
createdDate: '2023-07-21T08:09:41.138Z',
updatedDate: '2023-07-21T08:09:41.138Z',
updatedBy: '',

previousTwoYear: 0,
previousYearAnnualBalance: 0,
totalRemaining: 0,
totalRequest: 0,
annualDefaultBalance: 0,
annualRemainingBalance: 0,
unusedDays:0,

  }
  
 otherleaveBalance:OtherLeaveBalance={
  pId:0,
  empId:"",
  id:undefined,
isExpired:0,
status:0,
startDate: '2023-07-21T08:09:41.138Z',
endDate: '2023-07-21T08:09:41.138Z',
createdBy: '',
createdDate: '2023-07-21T08:09:41.138Z',
updatedDate: '2023-07-21T08:09:41.138Z',
updatedBy: '',

sickDefaultBalance: 0,
sickRemainingBalance: 0,
maternityDefaultBalance: 0,
maternityRemainingBalance: 0,
paternityDefaultBalance: 0,
paternityRemainingBalance: 0,
compassinateDefaultBalance: 0,
compassinateRemainingBalance: 0,
educationDefaultBalance: 0,
educationRemainingBalance: 0,
marriageDefaultBalance: 0,
marriageRemainingBalance: 0,
leaveWotPayDefaultBalance: 0,
leaveWotPayRemainingBalance: 0,
courtLeaveDefaultBalance: 0,
courtLeaveRemainingBalance: 0,
abortionLeaveDefaultBalance: 0,
abortionLeaveRemainingBalance: 0,
sickEndDate: '2023-07-21T08:09:41.138Z',
sickStartDate: '2023-07-21T08:09:41.138Z',
otherLeaveRemainingBalance:0,

}
 

 searchTerm: string = ''; 

  filteredLeaveBalances: AnnualLeaveBalance[]=[]; 

  filteredotherLeaveBalances: OtherLeaveBalance[]=[]; 
  employeePostion: EmployeePosition;
constructor(
  private leaveTypeService: LeaveTypeService,
  private leaveBalanceService: LeaveBalanceService,
  private otherleaveBalanceService: OtherLeaveBalanceService,
  private employeeService:EmployeeService,
   private postionService :PositionService,
   private employeepostionService : EmployeePositionService,
  private dialog: MatDialog,
  private router:Router){}
ngOnInit(): void{

  this.leaveTypeService.getAllLeaveType().
subscribe({
  next: (leaveType) => {
    // this.leaveRequest.leaveTypeId = this.selectedLeaveType;
    this.leaveTypes= leaveType
    ;
  },
  error: (response) => {
    console.log(response);
  }
});
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
    this.leaveBalanceService.getAllLeaveBalance()
    .subscribe({
      next: (leaveBalances) => {
        this.leaveBalances =leaveBalances;
        this.filteredLeaveBalances=leaveBalances;
        const empIdsWithLeaveBalances = leaveBalances.map((lb) => lb.empId);
     console.log("this" ,this.filteredLeaveBalances)
        this.otherleaveBalanceService.getAllOtherLeaveBalance()
        .subscribe({
          next: (otherleaveBalance) => {
            this.otherleaveBalances =otherleaveBalance;
            this.filteredotherLeaveBalances=otherleaveBalance;
            console.log(this.filteredotherLeaveBalances)
        
            const empIdsWithOtherLeaveBalances=otherleaveBalance.map((lb) => lb.empId);
            this.selectedEmployee = this.employees.filter((employee) => !(empIdsWithOtherLeaveBalances && empIdsWithLeaveBalances).includes(employee.empId));
      
            this.postionService.getAllPosition()
            .subscribe({
              next: (positions) => {
                this.positions=positions;
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
}


addLeaveBalancesForSelectedEmployees() {
  for (const employee of this.selectedEmployee) {
    const newLeaveBalance: AnnualLeaveBalance = {
      pId:this.leaveBalance.pId,
      empId: employee.empId,

      isExpired: this.leaveBalance.isExpired,
      status: this.leaveBalance.status,
      startDate: this.leaveBalance.startDate,
      endDate: this.leaveBalance.endDate,
      createdBy: this.leaveBalance.createdBy,
      createdDate: this.leaveBalance.createdDate,
      updatedDate: this.leaveBalance.updatedDate,
      updatedBy: this.leaveBalance.updatedBy,   
annualDefaultBalance: this.leaveBalance.annualDefaultBalance,
annualRemainingBalance: this.leaveBalance.annualRemainingBalance,
previousYearAnnualBalance: this.leaveBalance.previousYearAnnualBalance,

previousTwoYear:this.leaveBalance.previousTwoYear,

totalRemaining: this.leaveBalance.totalRemaining,
totalRequest: this.leaveBalance.totalRequest,
unusedDays:0

    };

    this.leaveBalanceService.addLeaveBalance(newLeaveBalance).subscribe({
      next: (employees) => {
  
      
        this.leaveBalanceSaved = true;
        setTimeout(() => {
          this.leaveBalanceSaved = false;
        }, 2000);

        // Fetch updated leave balances
       

        // Add the current leave balance to the array
        this.filteredLeaveBalances.push({ ...newLeaveBalance });
      },
      error(response) {
        console.log(response);
      }
    });
  


  const newotherLeaveBalance: OtherLeaveBalance = {
    pId:this.otherleaveBalance.pId,
    empId: employee.empId,

    isExpired: this.otherleaveBalance.isExpired,
    status: this.otherleaveBalance.status,
    startDate: this.otherleaveBalance.startDate,
    endDate: this.otherleaveBalance.endDate,
    createdBy: this.otherleaveBalance.createdBy,
    createdDate: this.otherleaveBalance.createdDate,
    updatedDate: this.otherleaveBalance.updatedDate,
    updatedBy: this.otherleaveBalance.updatedBy,   
    sickDefaultBalance: this.otherleaveBalance.sickDefaultBalance,
    sickRemainingBalance: this.otherleaveBalance.sickRemainingBalance,
    maternityDefaultBalance: this.otherleaveBalance.maternityDefaultBalance,
    maternityRemainingBalance: this.otherleaveBalance.marriageRemainingBalance,
    paternityDefaultBalance: this.otherleaveBalance.paternityDefaultBalance,
    paternityRemainingBalance: this.otherleaveBalance.paternityRemainingBalance,
    compassinateDefaultBalance: this.otherleaveBalance.compassinateDefaultBalance,
    compassinateRemainingBalance: this.otherleaveBalance.compassinateRemainingBalance,
    educationDefaultBalance: this.otherleaveBalance.educationDefaultBalance,
    educationRemainingBalance: this.otherleaveBalance.educationRemainingBalance,
    marriageDefaultBalance: this.otherleaveBalance.marriageDefaultBalance,
    marriageRemainingBalance: this.otherleaveBalance.marriageRemainingBalance,
    leaveWotPayDefaultBalance: this.otherleaveBalance.leaveWotPayDefaultBalance,
    leaveWotPayRemainingBalance: this.otherleaveBalance.leaveWotPayRemainingBalance,
    courtLeaveDefaultBalance: this.otherleaveBalance.courtLeaveDefaultBalance,
    courtLeaveRemainingBalance: this.otherleaveBalance.courtLeaveRemainingBalance,
    abortionLeaveDefaultBalance: this.otherleaveBalance.abortionLeaveDefaultBalance,
    abortionLeaveRemainingBalance: this.otherleaveBalance.abortionLeaveRemainingBalance,
    sickEndDate: this.otherleaveBalance.sickEndDate,
    sickStartDate: this.otherleaveBalance.sickStartDate,
    otherLeaveRemainingBalance: this.otherleaveBalance.otherLeaveRemainingBalance,
  };

  this.otherleaveBalanceService.addOtherLeaveBalance(newotherLeaveBalance).subscribe({
    next: (employees) => {

    
      this.otherleaveBalanceSaved = true;
      setTimeout(() => {
        this.otherleaveBalanceSaved = false;
      }, 2000);

      // Fetch updated leave balances
   

      // Add the current leave balance to the array



      this.employeeService.getAllEmployees() 
      .subscribe({ 
        next: (employees) => { 
          this.employees=employees
      
      
          this.leaveBalanceService.getAllLeaveBalance()
          .subscribe({
            next: (leaveBalances) => {
              this.leaveBalances =leaveBalances;
              this.filteredLeaveBalances=leaveBalances;
              const empIdsWithLeaveBalances = leaveBalances.map((lb) => lb.empId);
              
              this.otherleaveBalanceService.getAllOtherLeaveBalance()
              .subscribe({
                next: (otherleaveBalance) => {
                  this.otherleaveBalances =otherleaveBalance;
                  this.filteredotherLeaveBalances=otherleaveBalance;
              
                  const empIdsWithOtherLeaveBalances=otherleaveBalance.map((lb) => lb.empId);
                  this.selectedEmployee = this.employees.filter((employee) => !(empIdsWithOtherLeaveBalances && empIdsWithLeaveBalances).includes(employee.empId));
            
                       
          
                       
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
      
        },
        error(response){
          console.log(response)
        }
      });
      
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
  
     this.filteredLeaveBalances = this.leaveBalances;
     this.filteredotherLeaveBalances = this.otherleaveBalances;

   } else {
  
    this.filteredLeaveBalances = this.leaveBalances.filter(leaveBalance => {
      return this.getEmployeeName(leaveBalance.empId)
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
    });

    this.filteredotherLeaveBalances = this.otherleaveBalances.filter(otherLeaveBalance => {
      return this.getEmployeeName(otherLeaveBalance.empId)
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
    });

   }
  
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
  getLeaveTypeName(Id: string): string { 
    const leaveType = this.leaveTypes.find((g) => g.leaveTypeId === Id); 
    return leaveType ? `${leaveType.leaveTypeName} `:'Unknown EMPLOYEE'; 
  }  
  openLeaveDetailsModal(empId: string) {
    const dialogRef =this.dialog.open(EditLeaveBalanceModalComponent)
    
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        // Perform the refresh action here
        window.location.reload();
      }  })
  
    dialogRef.componentInstance.openModal(empId)
  
    
  }
  openOtherLeaveDetailsModal(empId: string) {
    const dialogRef =this.dialog.open(EditOtherLeaveBalanceComponent)
    
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        // Perform the refresh action here
        window.location.reload();
      }  })
  
    dialogRef.componentInstance.openModal(empId)
  
    
  }
}