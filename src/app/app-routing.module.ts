
import { RouterModule, Routes } from '@angular/router';
import { EmployeeRegistrationComponent } from './modules/employee-registration/employee-registration.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DefaultComponent } from './layouts/default/default.component';
import { ContactComponent } from './modules/contact/contact.component';
import { JobdescriptionComponent } from './modules/jobdescription/jobdescription.component';
import { PositionComponent } from './modules/Admin module/Job/position/position.component';
import { StepComponent } from './modules/Admin module/Job/step/step.component';
import { GradeComponent } from './modules/Admin module/Job/grade/grade.component';
import { EducationLevelComponent } from './modules/Admin module/education-level/education-level.component';
import { BranchComponent } from './modules/Admin module/Job/branch/branch.component';
import { SupervisorComponent } from './modules/Admin module/Job/supervisor/supervisor.component';
import { EmployeeListComponent } from './modules/employee-list/employee-list.component';
import { QualificationComponent } from './modules/qualification/qualification.component';
import { SpouseComponent } from './modules/spouse/spouse.component';
import { TrainingComponent } from './modules/training/training.component';
import { EmergencycontactComponent } from './modules/emergencycontact/emergencycontact.component';
import { DepositeAuthenticationComponent } from './modules/deposite-authenticaton/deposite-authenticaton.component';
import { EditEmployeeComponent } from './modules/updatemodules/edit-employee/edit-employee.component';
import { EditContactComponent } from './modules/updatemodules/edit-contact/edit-contact.component';
import { EditJobDescriptionComponent } from './modules/updatemodules/edit-job-description/edit-job-description.component';
import { EditSpouseComponent } from './modules/updatemodules/edit-spouse/edit-spouse.component';
import { EditEmergencyContactComponent } from './modules/updatemodules/edit-emergencycontact/edit-emergencycontact.component';
import { EditTrainingComponent } from './modules/updatemodules/edit-training/edit-training.component';
import { EditDepositeAuthenticationComponent } from './modules/updatemodules/edit-depositeauthentication/edit-depositeauthentication.component';
import { EditQualificationComponent } from './modules/updatemodules/edit-qualification/edit-qualification.component';
import { WorkexperienceComponent } from './modules/workexperience/workexperience.component';
import { EducationComponent } from './modules/education/education.component';
import { EditWorkexperienceComponent } from './modules/updatemodules/edit-workexperience/edit-workexperience.component';
import { EditEducationComponent } from './modules/updatemodules/edit-education/edit-education.component';
import { ApplicationRef, NgModule } from '@angular/core';
import { AssignSupervisorComponent } from './modules/Admin module/Job/assign-supervisor/assign-supervisor.component';
import { HistoryComponent } from './modules/history/history.component';
import { DepartmentComponent } from './modules/Admin module/Job/department/department.component';
import { DivisionComponent } from './modules/Admin module/Job/division/division.component';
import { LeaverequestComponent } from './modules/leave/leaverequest/leaverequest.component';
import { LeavetypeComponent } from './modules/Admin module/leavetype/leavetype.component';
import { LeavebalanceComponent } from './modules/leave/leavebalance/leavebalance.component';


import { LeaveApprovalComponent } from './modules/leave/leave-approval/leave-approval.component';
import { EmployeeLeavebalanceComponent } from './modules/leave/employee-leavebalance/employee-leavebalance.component';
import { PromotionhistoryComponent } from './modules/Promotion/promotionhistory/promotionhistory.component';
import { VacancymanagmentComponent } from './modules/Promotion/vacancymanagment/vacancymanagment.component';
import { VacancyComponent } from './modules/Promotion/vacancy/vacancy.component';
import { ApprovepromotionComponent } from './modules/Promotion/approvepromotion/approvepromotion.component';
import { AdminLeaverequestComponent } from './modules/leave/admin-leaverequest/admin-leaverequest.component';
import { HolidaysComponent } from './modules/Admin module/holidays/holidays.component';
import { ApprovedleavesComponent } from './modules/leave/approvedleaves/approvedleaves.component';
import { SelfleaveRequestComponent } from './modules/leave/selfleave-request/selfleave-request.component';
import { AttendanceComponent } from './modules/attendace/attendance/attendance.component';
import { NewattendanceComponent } from './modules/newattendance/newattendance.component';
import { OtherspromotionComponent } from './modules/Promotion/otherspromotion/otherspromotion.component';
import { MedicalRequestComponent } from './modules/medical/medical-request/medical-request.component';
import { MedicalBalanceComponent } from './modules/medical/medical-balance/medical-balance.component';
import { MedicalselfrequestComponent } from './modules/medical/medicalselfrequest/medicalselfrequest.component';
import { FinanceApproveComponent } from './modules/medical/finance-approve/finance-approve.component';
import { HrApproveComponent } from './modules/medical/hr-approve/hr-approve.component';
import { SelfMedicalBalanceComponent } from './modules/medical/self-medical-balance/self-medical-balance.component';
import { BankComponent } from './modules/Admin module/bank/bank.component';
import { TaxComponent } from './modules/Admin module/tax/tax.component';
import { PayrollComponent } from './modules/Payroll/payroll/payroll.component';
import { DeductionComponent } from './modules/Payroll/deduction/deduction.component';
import { AllowanceComponent } from './modules/Payroll/allowance/allowance.component';
import { OverTimeComponent } from './modules/Payroll/over-time/over-time.component';
import { DeductionTypeComponent } from './modules/Admin module/deduction-type/deduction-type.component';
import { AllowanceTypeComponent } from './modules/Admin module/allowance-type/allowance-type.component';
import { MainPayrollComponent } from './modules/Payroll/main-payroll/main-payroll.component';
import { ApprovedMedicalRequestsComponent } from './modules/medical/approved-medical-requests/approved-medical-requests.component';
import { PayrollcontractComponent } from './modules/PayrollContract/payrollcontract/payrollcontract.component';
import { ConttactRegstrationComponent } from './modules/Payroll/contract-regstration/conttact-regstration.component';
import { ReportComponent } from './modules/attendace/report/report.component';
import { PayrollReportComponent } from './modules/Payroll/payrollreport/payrollreport.component';
import { MedicalreportComponent } from './modules/medical/medicalreport/medicalreport.component';
import { MedicalPayComponent } from './modules/medical/medical-pay/medical-pay.component';
import { OutsourceComponent } from './modules/PayrollContract/outsource/outsource.component';

const routes: Routes = [
  {path: '',
  component: DefaultComponent,
children:
   [
{path:'',
component:DashboardComponent,
},
{path:'dashboard',
component:DashboardComponent,
},


{path:'employee-registration',
component:EmployeeRegistrationComponent}
,
{path:'employee-registration/contact',
component: ContactComponent},
{path:'employee-registration/job-description',
component: JobdescriptionComponent},
{path:'employee-registration/education',
component: EducationComponent},
{path:'employee-registration/work-experience',
component: WorkexperienceComponent},
{path:'employee-registration/spouse',
component: SpouseComponent},
{path:'employee-registration/training',
component: TrainingComponent},
{path:'employee-registration/emergency-contact',
component: EmergencycontactComponent},
{path:'employee-registration/deposite-authentication',
component: DepositeAuthenticationComponent},

{path:'admin',
component: PositionComponent},
{path:'admin/position',
component: PositionComponent},
{path:'admin/assign-supervisor',
component: AssignSupervisorComponent},

{path:'admin/step',
component: StepComponent},
{path:'admin/grade',
component: GradeComponent},
{path:'admin/department',
component: DepartmentComponent},
{path:'admin/division',
component: DivisionComponent},
{path:'admin/education-level',
component: EducationLevelComponent},
{path:'admin/branch',
component: BranchComponent},
{path:'admin/supervisor',
component: SupervisorComponent},
{path:'admin/bank',
component:BankComponent},
{path:'admin/tax',
component:TaxComponent},
{path:'admin/allowanceType',
component:AllowanceTypeComponent},
{path:'admin/deductionType',
component:DeductionTypeComponent},
{path:'employee-list',
component: EmployeeListComponent},
{path:'history',
component: HistoryComponent},
{path:'contract-regstration',
component:ConttactRegstrationComponent},

{path:'edit-employee/:empId',
component: EditEmployeeComponent},
{path:'edit-contact/:empId',
component: EditContactComponent},
{path:'edit-education/:empId',
component: EditEducationComponent},
{path:'edit-workExperience/:empId',
component: EditWorkexperienceComponent},
{path:'edit-employeePosition/:empId',
component: EditJobDescriptionComponent},
{path:'edit-emergencyContact/:empId',
component: EditEmergencyContactComponent},

{path:'edit-spouse/:empId',
component: EditSpouseComponent},
{path:'edit-training/:empId',
component: EditTrainingComponent},
{path:'edit-depositeAuthentication/:empId',
component: EditDepositeAuthenticationComponent},
{path:'leave/leave-request-form',
component: LeaverequestComponent},
{path:'leave/leave-requests',
component: AdminLeaverequestComponent},
{path:'leave/leave-approve',
component: LeaveApprovalComponent},
{path:'leave/leave-type',
component: LeavetypeComponent},
{path:'leave/leave-balance',
component: LeavebalanceComponent},
{path:'leave/employeeleavebalance',
component: EmployeeLeavebalanceComponent},
{path:'leave/approvedleaves',
component: ApprovedleavesComponent},
{path:'leave/self-leave',
component: SelfleaveRequestComponent},
{path:'promotionhistory',
component:PromotionhistoryComponent},
{path:'vacancymanagment',
component:VacancymanagmentComponent},
{path:'vacancy',
component:VacancyComponent},
{path:'approvepromotion',
component:ApprovepromotionComponent},
{path:'otherspromotion',
component:OtherspromotionComponent},
{path:'holiday',
component:HolidaysComponent},
{path:'attendance',
component:AttendanceComponent},
{path:'medicalRequest',
component:MedicalRequestComponent},
{path:'medicalBalance',
component:MedicalBalanceComponent},
{path:'medicalSelfRequest',
component:MedicalselfrequestComponent},
{path:'medicalFinance',
component:FinanceApproveComponent},
{path:'approvedMedical',
component:ApprovedMedicalRequestsComponent},
{path:'medicalHr',
component:HrApproveComponent},
{path:'medicalReport',
component:MedicalreportComponent},
{path:'medicalPay',
component:MedicalPayComponent},
{path:'selfMedBalance',
component:SelfMedicalBalanceComponent},
{path:'payroll',
component:PayrollComponent},
{path:'payroll/deduction',
component:DeductionComponent},

{path:'payroll/allowance',
component:AllowanceComponent},

{path:'payroll/overtime',
component:OverTimeComponent},
{path:'payroll/mainPayroll',
component:MainPayrollComponent},
{path:'payroll/contract',
component:PayrollcontractComponent},
{path:'payroll/report',
component:PayrollReportComponent},
{path:'payroll/outsource',
component:OutsourceComponent},

]

}]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
