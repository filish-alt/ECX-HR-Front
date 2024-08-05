import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveRequestService } from 'app/service/leaveRequest.service';
import { OtherLeaveBalanceService } from 'app/service/otherleavebalance.service';
import { EmployeeLeaveDetailComponent } from '../employee-leave-detail-modal/employee-leave-detail.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CombinedLeaveData, OtherLeaveBalance } from 'app/models/leaverequestmodel';
import { BehaviorSubject } from 'rxjs';
import { Employee } from 'app/models/employee.model';

@Component({
  selector: 'app-edit-other-leave-balance',
  templateUrl: './edit-other-leave-balance.component.html',
  styleUrls: ['./edit-other-leave-balance.component.css']
})
export class EditOtherLeaveBalanceComponent {
constructor(
    private leaveService: LeaveRequestService,
    private route :Router,
    private otherleaveBalanceService:OtherLeaveBalanceService,
    public dialogRef: MatDialogRef<EmployeeLeaveDetailComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, ) {} // Replace with your actual backend service

      selectedEmployee: string;
      selectedEmployeeLeaveBalance: OtherLeaveBalance[] | null = null;
    
      private isOpen = new BehaviorSubject<boolean>(false);
isOpen$ = this.isOpen.asObservable();

filteredLeaveBalances: OtherLeaveBalance[]=[]; 
successMessage: string | null = null; // Add this property

      leaveData: CombinedLeaveData;
      editedLeaveData: OtherLeaveBalance={  
        pId:0,
        id : undefined,
      createdBy: '',
      
      updatedBy: '',
      status:0,
      empId: '',
      startDate:'',
      endDate: '',
      isExpired:0,
    sickDefaultBalance:0,
    sickRemainingBalance: 0,
    maternityDefaultBalance: 0,
    maternityRemainingBalance:0,
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
    sickEndDate: "",
    sickStartDate: "",
     
      createdDate: '2023-07-21T08:09:41.138Z',
updatedDate: '2023-07-21T08:09:41.138Z',
otherLeaveRemainingBalance: 0,
      }
    
      ngOnInit(): void{
    
       }


      openModal(empId: string) {
        this.selectedEmployee = empId;
        
        // Fetch the AnnualLeaveBalance data for the selected employee
        this.otherleaveBalanceService.getOtherLeaveBalance(empId).subscribe(
          (leaveBalances: OtherLeaveBalance[]) => {
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
  saveEditedData(empId:string,leaveBalance :OtherLeaveBalance) {
    // Call a service method to save the edited data
    // This is where you would send the edited data back to your server
console.log(this.editedLeaveData.empId)


console.log(leaveBalance)
    this.otherleaveBalanceService.updateOtherLeaveBalance(leaveBalance,empId).subscribe(
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
