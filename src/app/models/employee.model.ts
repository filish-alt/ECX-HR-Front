import { Contact } from "./contact.model";
import { EmergencyContact } from "./emergency-contact.model";
import { EmployeePosition } from "./job-description.model";
import { AnnualLeaveBalance, LeaveRequest, OtherLeaveBalance } from "./leaverequestmodel";
import { Spouse } from "./spouse.model";
import { Training } from "./training.model";
import { Education, WorkExperience } from "./work-experience.model";

export interface Employee{
     pId: Number;
     createdBy: string;
     createdDate: string | null; // Make createdDate nullabel
     updatedDate: string| null;
    updatedBy: String, 
    empId: string, 
    ecxId: String, 
    adId: String, 
    firstName: string, 
    middleName: string, 
    lastName: string, 
    joinDate: String, 
    sex: String, 
    dateOfBityh: String,
    placeOfBith: String, 
    martialStatus: String, 
    salutation: String, 
    nationality: String, 
    pensionNo: String, 
    imageData: String, 
    crime: Boolean, 
    crimeDescription: String ,
    attendanceId:string,
  
    status:number;
}
export interface Supervisor{

    createdBy: String, 
    createdDate:String, 
    updatedDate: String, 
    updatedBy: String, 
    id: string, 
    pId: number;
  positionId: string,
  supervisorLevel: string;
  status:number;

}
export interface CombinedEmployeeData {
  employee: Employee;
  addresses?: Contact;
  emergencyContacts?: EmergencyContact[];
  employeePostions?: EmployeePosition;
  educations?: Education[];
  trainings?: Training[];
  spouses?:Spouse[];
  
  workExperiences:WorkExperience[];
  // Add other properties as needed to match the API response
}




  