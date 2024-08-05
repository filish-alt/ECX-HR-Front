import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LeaveRequestService } from 'app/service/leaveRequest.service';
import { EmployeeLeaveDetailComponent } from '../employee-leave-detail-modal/employee-leave-detail.component';
import { BehaviorSubject } from 'rxjs';
import { LeaveType } from 'app/models/leaveType.model';
import { AnnualLeaveBalance, CombinedLeaveData } from 'app/models/leaverequestmodel';
import { LeaveBalanceService } from 'app/service/leavebalance.service';
import { Employee } from 'app/models/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-leave-balance-modal',
  templateUrl: './edit-leave-balance-modal.component.html',
  styleUrls: ['./edit-leave-balance-modal.component.css']
})
export class EditLeaveBalanceModalComponent {
  constructor(
    private leaveService: LeaveRequestService,
    private route :Router,
    private leaveBalanceService:LeaveBalanceService,
    public dialogRef: MatDialogRef<EmployeeLeaveDetailComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, private leaveRequestService: LeaveRequestService) {} // Replace with your actual backend service

      selectedEmployee: string;
      selectedEmployeeLeaveBalance: AnnualLeaveBalance[] | null = null;
    
      private isOpen = new BehaviorSubject<boolean>(false);
isOpen$ = this.isOpen.asObservable();

filteredLeaveBalances: AnnualLeaveBalance[]=[]; 
successMessage: string | null = null; // Add this property

      leaveData: CombinedLeaveData;
      editedLeaveData: AnnualLeaveBalance={  
        pId:0,
        id : undefined,
      createdBy: '',
      
      updatedBy: '',
      status:0,
      empId: '',
      startDate:'',
      endDate: '',
      isExpired:0,
      previousTwoYear: 0,
      previousYearAnnualBalance: 0,
      totalRemaining: 0,
      totalRequest: 0,
      annualDefaultBalance: 0,
      annualRemainingBalance: 0,
      unusedDays:0,
      createdDate: '2023-07-21T08:09:41.138Z',
updatedDate: '2023-07-21T08:09:41.138Z',
      
      }
    
      ngOnInit(): void{
    
       }


      openModal(empId: string) {
        this.selectedEmployee = empId;
        
        // Fetch the AnnualLeaveBalance data for the selected employee
        this.leaveBalanceService.getLeaveBalance(empId).subscribe(
          (leaveBalances: AnnualLeaveBalance[]) => {
            this.selectedEmployeeLeaveBalance = leaveBalances;
            console.log(this.selectedEmployeeLeaveBalance)
          },
          (error) => {
            console.error('Error fetching leave balance data', error);
          }
        );
      
 

}
employees:Employee[]=[]
getEmployeeName(empId: string): string { 
  const employee = this.employees.find((g) => g.empId === empId); 
  return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
}  
 
  // Method to save the edited data
  saveEditedData(empId:string,leaveBalance :AnnualLeaveBalance) {
    // Call a service method to save the edited data
    // This is where you would send the edited data back to your server
console.log(this.editedLeaveData.empId)


console.log("ll",leaveBalance)
    this.leaveBalanceService.updateLeaveBalance(leaveBalance,empId).subscribe(
      (response) => {
        // Handle the response if needed
        console.log('Data saved successfully:', response);
        // Close the modal
        this.successMessage = 'Data saved successfully';
        setTimeout(() => {
          this.dialogRef.close('refresh');
        }, 2000); 
      },
      (error) => {
        // Handle any errors
        console.error('Error saving data:', error);
        this.successMessage = null; 
      }
    );
  this.route.navigate(['/leave-balance'])
  }

  onCancelClick(): void {
 
    this.dialogRef.close('refresh');
  }

printEmployeeDetails() {
  // Implement printing functionality here
  // You can use browser-specific printing techniques or a library like ngx-print to handle printing.
  window.print();
  console.log(this.selectedEmployee);
}
}
