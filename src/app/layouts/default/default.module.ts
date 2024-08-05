
import { CommonModule } from '@angular/common';


import { RouterModule } from '@angular/router';

import {MatButtonModule    } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule, MatPseudoCheckbox, MatPseudoCheckboxModule, MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import{MatSnackBarModule} from '@angular/material/snack-bar'

import{MatProgressSpinnerModule} from '@angular/material/progress-spinner'

import { EmployeeRegistrationComponent } from 'app/modules/employee-registration/employee-registration.component';

import { SharedModule } from 'app/shared/shared.module';
import { DefaultComponent } from './default.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from 'app/modules/dashboard/dashboard.component';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MinNavComponent } from 'app/modules/nav/min-nav/min-nav.component';
import { EmployeeService } from 'app/service/employee.service';
import { ContactComponent } from 'app/modules/contact/contact.component';
import { JobdescriptionComponent } from 'app/modules/jobdescription/jobdescription.component';
import { SharedNavComponent } from 'app/modules/Admin module/shared-nav/shared-nav.component';
import { AdminComponent } from 'app/modules/Admin module/admin/admin.component';
import { EducationLevelComponent } from 'app/modules/Admin module/education-level/education-level.component';
import { PositionComponent } from 'app/modules/Admin module/Job/position/position.component';
import { StepComponent } from 'app/modules/Admin module/Job/step/step.component';
import { GradeComponent } from 'app/modules/Admin module/Job/grade/grade.component';
import { BranchComponent } from 'app/modules/Admin module/Job/branch/branch.component';
import { SupervisorComponent } from 'app/modules/Admin module/Job/supervisor/supervisor.component';
import { EmployeeListComponent } from 'app/modules/employee-list/employee-list.component';
import { QualificationComponent } from 'app/modules/qualification/qualification.component';
import { SpouseComponent } from 'app/modules/spouse/spouse.component';
import { TrainingComponent } from 'app/modules/training/training.component';
import { EmergencycontactComponent } from 'app/modules/emergencycontact/emergencycontact.component';
import { DepositeAuthenticationComponent } from 'app/modules/deposite-authenticaton/deposite-authenticaton.component';
import { EditEmployeeComponent } from 'app/modules/updatemodules/edit-employee/edit-employee.component';
import { EditContactComponent } from 'app/modules/updatemodules/edit-contact/edit-contact.component';
import { EditSpouseComponent } from 'app/modules/updatemodules/edit-spouse/edit-spouse.component';
import { EditJobDescriptionComponent } from 'app/modules/updatemodules/edit-job-description/edit-job-description.component';
import { EditTrainingComponent } from 'app/modules/updatemodules/edit-training/edit-training.component';
import { EditDepositeAuthenticationComponent } from 'app/modules/updatemodules/edit-depositeauthentication/edit-depositeauthentication.component';
import { EditQualificationComponent } from 'app/modules/updatemodules/edit-qualification/edit-qualification.component';
import { WorkexperienceComponent } from 'app/modules/workexperience/workexperience.component';
import { EducationComponent } from 'app/modules/education/education.component';
import { EditWorkexperienceComponent } from 'app/modules/updatemodules/edit-workexperience/edit-workexperience.component';
import { EditEducationComponent } from 'app/modules/updatemodules/edit-education/edit-education.component';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditEmergencyContactComponent } from 'app/modules/updatemodules/edit-emergencycontact/edit-emergencycontact.component';
import { MatIconModule } from '@angular/material/icon';
import { EditNavComponent } from 'app/modules/updatemodules/edit-nav/edit-nav.component';
import { AssignSupervisorComponent } from 'app/modules/Admin module/Job/assign-supervisor/assign-supervisor.component';
import { HistoryComponent } from 'app/modules/history/history.component';
import { DepartmentComponent } from 'app/modules/Admin module/Job/department/department.component';
import { DivisionComponent } from 'app/modules/Admin module/Job/division/division.component';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';

import { LeavetypeComponent } from 'app/modules/Admin module/leavetype/leavetype.component';
import { LeavebalanceComponent } from 'app/modules/leave/leavebalance/leavebalance.component';

import { LeaveApprovalComponent } from 'app/modules/leave/leave-approval/leave-approval.component';
import { AdminLeaverequestComponent,  } from 'app/modules/leave/admin-leaverequest/admin-leaverequest.component';
import { EmployeeLeavebalanceComponent } from 'app/modules/leave/employee-leavebalance/employee-leavebalance.component';
import { LeaverequestComponent } from 'app/modules/leave/leaverequest/leaverequest.component';
import { EmployeeDetailsModalServiceService } from 'app/service/employee-details-modal-service.service';
import { EmployeeDetailsModalComponent } from 'app/modules/leave/employee-details-modal/employee-details-modal.component';
import { VacancyComponent } from 'app/modules/Promotion/vacancy/vacancy.component';

import { PromotionhistoryComponent } from 'app/modules/Promotion/promotionhistory/promotionhistory.component';
import { VacancymanagmentComponent } from 'app/modules/Promotion/vacancymanagment/vacancymanagment.component';
import { ActingAssigmentComponent } from 'app/modules/acting-assigment/acting-assigment.component';
import { ApprovepromotionComponent } from 'app/modules/Promotion/approvepromotion/approvepromotion.component';
import { HolidaysComponent } from 'app/modules/Admin module/holidays/holidays.component';
import { EditLeaveBalanceModalComponent } from 'app/modules/leave/edit-leave-balance-modal/edit-leave-balance-modal.component';
import { EditOtherLeaveBalanceComponent } from 'app/modules/leave/edit-other-leave-balance- modal/edit-other-leave-balance.component';
import { ApprovedleavesComponent } from 'app/modules/leave/approvedleaves/approvedleaves.component';
import { SelfleaveRequestComponent } from 'app/modules/leave/selfleave-request/selfleave-request.component';
import { AttendanceComponent } from 'app/modules/attendace/attendance/attendance.component';
import { EmployeeLeaveDetailComponent } from 'app/modules/leave/employee-leave-detail-modal/employee-leave-detail.component';
import { NewattendanceComponent } from 'app/modules/newattendance/newattendance.component';
import { EvaluationModalComponent } from 'app/modules/Promotion/evaluation-modal/evaluation-modal.component';
import { ResultModalComponent } from 'app/modules/Promotion/result-modal/result-modal.component';
import { OtherspromotionComponent } from 'app/modules/Promotion/otherspromotion/otherspromotion.component';
import { MedicalRequestComponent } from 'app/modules/medical/medical-request/medical-request.component';
import { MedicalBalanceComponent } from 'app/modules/medical/medical-balance/medical-balance.component';
import { MedicalselfrequestComponent } from 'app/modules/medical/medicalselfrequest/medicalselfrequest.component';
import { HrApproveComponent } from 'app/modules/medical/hr-approve/hr-approve.component';
import { FinanceApproveComponent } from 'app/modules/medical/finance-approve/finance-approve.component';
import { SelfMedicalBalanceComponent } from 'app/modules/medical/self-medical-balance/self-medical-balance.component';
import { ReportComponent } from 'app/modules/attendace/report/report.component';
import { PayrollComponent } from 'app/modules/Payroll/payroll/payroll.component';
import { DeductionComponent } from 'app/modules/Payroll/deduction/deduction.component';
import { AllowanceComponent } from 'app/modules/Payroll/allowance/allowance.component';
import { OverTimeComponent } from 'app/modules/Payroll/over-time/over-time.component';
import { TaxComponent } from 'app/modules/Admin module/tax/tax.component';
import { BankComponent } from 'app/modules/Admin module/bank/bank.component';
import { DeductionTypeComponent } from 'app/modules/Admin module/deduction-type/deduction-type.component';
import { AllowanceTypeComponent } from 'app/modules/Admin module/allowance-type/allowance-type.component';
import { MainPayrollComponent } from 'app/modules/Payroll/main-payroll/main-payroll.component';
import { ApprovedMedicalRequestsComponent } from 'app/modules/medical/approved-medical-requests/approved-medical-requests.component';
import { PayrollcontractComponent } from 'app/modules/PayrollContract/payrollcontract/payrollcontract.component';
import { ConttactRegstrationComponent } from 'app/modules/Payroll/contract-regstration/conttact-regstration.component';
import { PayrollReportComponent } from 'app/modules/Payroll/payrollreport/payrollreport.component';
import { MedicalreportComponent } from 'app/modules/medical/medicalreport/medicalreport.component';
import { MedicalPayComponent } from 'app/modules/medical/medical-pay/medical-pay.component';
import { OutsourceComponent } from 'app/modules/PayrollContract/outsource/outsource.component';



@NgModule({
  declarations: [
    DefaultComponent,
     DashboardComponent,
   EmployeeRegistrationComponent,
   ContactComponent,
   JobdescriptionComponent,
    MinNavComponent,
    SharedNavComponent,
    AdminComponent,
    EducationLevelComponent,
    PositionComponent,
    StepComponent,
    GradeComponent,
    BranchComponent,
    SupervisorComponent,
EmployeeListComponent,
QualificationComponent,
SpouseComponent,
TrainingComponent,
SpouseComponent,
EmergencycontactComponent,
DepositeAuthenticationComponent,
EditEmployeeComponent,
EditContactComponent,

EditSpouseComponent,
EditJobDescriptionComponent,
EditTrainingComponent,
EditDepositeAuthenticationComponent,
EditEmergencyContactComponent,
EditQualificationComponent,
WorkexperienceComponent,
    EducationComponent,
    EditWorkexperienceComponent,
    EditEducationComponent,
    DeleteConfirmationComponent,
EditNavComponent,
AssignSupervisorComponent,
HistoryComponent,
DepartmentComponent,
DivisionComponent,
DeletesucessfullmessageComponent,
LeaverequestComponent,
LeavetypeComponent,
LeavebalanceComponent,
EmployeeLeaveDetailComponent,
LeaveApprovalComponent,
AdminLeaverequestComponent,
EmployeeLeavebalanceComponent,
EmployeeDetailsModalComponent,
VacancymanagmentComponent,
VacancyComponent,
PromotionhistoryComponent,
ActingAssigmentComponent,
ApprovepromotionComponent,
EditLeaveBalanceModalComponent,
HolidaysComponent,
AttendanceComponent,
EditOtherLeaveBalanceComponent, 
ApprovedleavesComponent,
SelfleaveRequestComponent,
NewattendanceComponent,
EvaluationModalComponent,
ResultModalComponent,
OtherspromotionComponent,
MedicalRequestComponent,
MedicalBalanceComponent,
MedicalselfrequestComponent,
HrApproveComponent,
FinanceApproveComponent,
SelfMedicalBalanceComponent,
ReportComponent,
PayrollComponent,
DeductionComponent,
AllowanceComponent,
OverTimeComponent,
TaxComponent,
BankComponent,
DeductionTypeComponent,
AllowanceTypeComponent,
MainPayrollComponent,
ApprovedMedicalRequestsComponent,
PayrollcontractComponent,
ConttactRegstrationComponent,
ReportComponent,
PayrollReportComponent,
MedicalreportComponent,
MedicalPayComponent,
OutsourceComponent,

  ],

  imports: [
    MatSnackBarModule,
    CommonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatToolbarModule,
 MatPseudoCheckboxModule,
 MatNativeDateModule,
 MatDatepickerModule,
 MatSlideToggleModule,
 MatMenuModule,
 MatSidenavModule,
 MatDividerModule,
 FlexLayoutModule,
 MatCardModule,
 MatPaginatorModule,
 MatTableModule,
 SharedModule,
 MatDialogModule,
 MatIconModule,
 MatProgressSpinnerModule

  ],

providers: [

  EmployeeService
],

})
export class DefaultModule { }
