import { Employee } from "./employee.model";

export interface LeaveRequest{
    pId:number;
    leaveRequestId?: string;
  createdBy: string,
  createdDate: string,
  updatedDate: string,
  updatedBy: string,
  employeePositionId:string;
  departmentId:string,
  status:number,
  empId: string,
  leaveTypeId: string,
  startDate:Date,
  endDate: Date,
  approvedBy: string,
  approveDate:string,
  leaveStatus:string,
  reason: string,
  file: string,
  workingDays: number,
  sickStartDate: string,
  sickEndDate: string,
  supervisor:string

}
export interface AnnualLeaveBalance{
  pId:number;
  id?: string;
createdBy: string,
createdDate: string,
updatedDate: string,
updatedBy: string,
status:number,
empId: string,
startDate:string,
endDate: string,
isExpired:number,
previousTwoYear: number,
previousYearAnnualBalance: number,
totalRemaining: number,
totalRequest: number,
annualDefaultBalance: number,
annualRemainingBalance: number,
unusedDays:number,





}



export interface OtherLeaveBalance{
  pId:number;
  id?: string;
createdBy: string,
createdDate: string,
updatedDate: string,
updatedBy: string,
status:number,
empId: string,
startDate:string,
endDate: string,
isExpired:number,

sickDefaultBalance: number,
sickRemainingBalance: number,
maternityDefaultBalance: number,
maternityRemainingBalance: number,
paternityDefaultBalance: number,
paternityRemainingBalance: number,
compassinateDefaultBalance: number,
compassinateRemainingBalance: number,
educationDefaultBalance: number,
educationRemainingBalance: number,
marriageDefaultBalance: number,
marriageRemainingBalance
: number,
leaveWotPayDefaultBalance: number,
leaveWotPayRemainingBalance: number,
courtLeaveDefaultBalance: number,
courtLeaveRemainingBalance: number,
abortionLeaveDefaultBalance: number,
abortionLeaveRemainingBalance: number,
sickEndDate: string,
sickStartDate: string,
otherLeaveRemainingBalance: number,



}

export interface CombinedLeaveData {
  employee: Employee;
  leaveRequests:LeaveRequest[];
  annualLeaveBalances:AnnualLeaveBalance[];
  otherLeaveBalances:OtherLeaveBalance[];

  // Add other properties as needed to match the API response
}