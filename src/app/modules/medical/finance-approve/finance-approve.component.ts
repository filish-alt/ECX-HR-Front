import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Department } from 'app/models/education.model';
import { Employee } from 'app/models/employee.model';
import { Division, EmployeePosition, Position } from 'app/models/job-description.model';
import { MedicalRequests } from 'app/models/medical/medical.model';
import { DepartmentService } from 'app/service/department.service';
import { DivisionService } from 'app/service/division.service';
import { EmployeeDetailsModalServiceService } from 'app/service/employee-details-modal-service.service';
import { EmployeePositionService } from 'app/service/employee-position';
import { EmployeeService } from 'app/service/employee.service';
import { MedicalRequestService } from 'app/service/medicalrequest.service';
import { PositionService } from 'app/service/position.service';

@Component({
  selector: 'app-finance-approve',
  templateUrl: './finance-approve.component.html',
  styleUrls: ['./finance-approve.component.css']
})
export class FinanceApproveComponent {

  selectedEmployee: string='';
  employees:Employee[]=[];
medicalApproved: boolean = false;
medicalRejected: boolean = false;
medicalRequests:MedicalRequests[]=[]; 
downloadFileUrl: string=''; 
divisions:Division[]= [];
  departments:Department[]=[];
   positions:Position[]= [];
   employeePosition:EmployeePosition;
   employeePositions:EmployeePosition[]=[];
   FileNull:boolean = false;
   id:string;

 empId="17320a72-e4bd-46b9-894a-dfe5bf3d967c";
 supervisor:string="";
 medicalStatus:string="First-Approved";
 ApprovemedicalStatus:string="Paid";
 medicalrejectStatus:string="Reject";
 AdminApprovedStatus:string="Admin-Approved";
  medicalPenddings:MedicalRequests[]=[]
  Approvedmedicals:MedicalRequests[]=[]
  medicalpendding:MedicalRequests;
  Approvedmedical:MedicalRequests;
  constructor(
   public employeeDetailsModalService: EmployeeDetailsModalServiceService,
    private medicalRequestservice: MedicalRequestService,
    private router: Router,
    private employeeService:EmployeeService,
    private dialog: MatDialog,
    private divisionservice: DivisionService,
    private departmentservice: DepartmentService,
     private positionservice:PositionService ,
     private employeepositionservice:EmployeePositionService,
     private employeepostionservice : EmployeePositionService,
     private snackBar :MatSnackBar
  ) { }
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
  ngOnInit(): void {

    this.positionservice.getAllPosition()
    .subscribe({
      next: (positions) => {
        this.positions=positions;
      
        
      },
      error(response){
        console.log(response)
      }
    });
    this.divisionservice.getAllDivisions()
    .subscribe({
      next: (division) => {
        this.divisions=division;
      },
      error(response){
        console.log(response)
      }
    });
    this.departmentservice.getAllDepartment()
    .subscribe({
      next: (department) => {
        this.departments=department;
      },
      error(response){
        console.log(response)
      }
    });
    this.employeeService.getAllEmployees() 
.subscribe({ 
  next: (employees) => {
    // this.medicalRequest.empId = this.selectedEmployee;
    this.employees=employees
   },
  error: (response) => {
    console.log(response);
  }
});

this.employeepostionservice.getEmployeePosition(this.empId)  
.subscribe({  
  next: (employeePostion) => { 
    // this.medicalRequest.empId = this.selectedEmployee; 
    this.supervisor=employeePostion.position
   console.log( this.supervisor)
   }, 
  error: (response) => { 
    console.log(response); 
  } 
}); 


    this.medicalRequestservice.getmedicalRequestByStatus(this.medicalStatus).subscribe({
      next: (medicalRequest) => {
        this.medicalPenddings = medicalRequest;
        console.log("medicalPenddings",this.medicalPenddings)
      },
      error: (response) => {
        console.log(response);
      }
    });


  
this.medicalRequestservice.getAllMedicalRequest().
subscribe({
  next: (medical) => {
  //this.medicalRequest.medicalTypeId = this.selectedmedicalType;
    this.medicalRequests= medical
    ;
  },
  error: (response) => {
    console.log(response);
  }
});  
  }

  selectedFile: File | null = null; 
  onFileSelected(event: any) { 
   
    const file: File = event.target.files[0]; 
    const reader = new FileReader(); 
    reader.onload = () => { 
        const base64String = reader.result.toString().split(',')[1]; // Extract the base64 part 
        this.Approvedmedical.file = base64String; 
    }; 
    reader.readAsDataURL(file); 
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
  getPosition(empId: string): string{

    this.employeepositionservice.getAllEmployeePosition()
    .subscribe({
      next: (employeePositions) => {
        this.employeePosition = employeePositions.find(employeePosition => employeePosition.empId === empId);
      
            
      },
     
    }); 
    const  positionId=this.employeePosition.position
    const position = this.positions.find((position) => position.positionId === positionId);  
    console.log('position  ',position.name)
    return position ? position.name : '';
  }
 
  
  getDivisionName(divisionId: string): string {
    const division = this.divisions.find((division) => division.divisionId === divisionId);
    return division ? division.description : '';
  }
  getDepartmentName(departmentId: string): string {
    const department = this.departments.find((de) => de.departmentId === departmentId);
    return department ? department.description : '';
  }
  employee:boolean;

  getPositionName(positionId: string): string {

    const position = this.positions.find((position) => position.positionId === positionId);  
    console.log('position  ',position.name)
    this.employee=true
    return position ? position.name  : '';
  }

  getEmployeeName(empId: string): string { 
    const employee = this.employees.find((g) => g.empId === empId); 
    return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
  } 
  fetchAndDisplayPDF(medical: MedicalRequests):void { 
    // Call your service method to fetch the PDF file  
    console.log(medical.medicalRequestId)
    const medicalRequestToEdit = this.medicalRequests.find(medicalRequest => medicalRequest.medicalRequestId === medical.medicalRequestId); 
    console.log(medical.medicalRequestId)
    medicalRequestToEdit.medicalRequestId 
    
    this.medicalRequestservice.getMedicalRequestFile(medicalRequestToEdit.medicalRequestId) 
    
      .subscribe( 
        (pdf: Blob) => { 
          const file = new Blob([pdf], { type: 'application/pdf' }); 
          this.downloadFileUrl = window.URL.createObjectURL(file); 
          window.open(this.downloadFileUrl, '_blank'); 
          //console.log(this.medicalRequest.medicalRequestId); 
           
        }, 
        (error) => {
          this.FileNull=true
          console.error('Error loading PDF:', error);
         this.id= medicalRequestToEdit.medicalRequestId
        }
      ); 
  } 
  
  
  paidmedicalFunds(medicalRequest: MedicalRequests){
    
    var medicalRequestId=medicalRequest.medicalRequestId
    medicalRequest.approvalStatus=this.ApprovemedicalStatus
   console.log(medicalRequest)
    this.medicalRequestservice
    .updateMedicalRequest(medicalRequest,medicalRequestId)
    .subscribe(() =>{
      this.medicalApproved = true;
console.log("updated")
        setTimeout(() => {
          this.medicalApproved= false;
        }, 2000);

      
      this.medicalRequestservice.getmedicalRequestByStatus(this.AdminApprovedStatus).subscribe({
        next: (medicalRequest) => {
          this.Approvedmedicals = medicalRequest
          ;
        },
        error: (response) => {
          console.log(response);
        }
      });
    });
}

  approvemedicalPendding(medicalRequest: MedicalRequests){
    
    var medicalRequestId=medicalRequest.medicalRequestId
    medicalRequest.approvalStatus="Admin-Approved"
   console.log(medicalRequest)
    this.medicalRequestservice
    .updateMedicalRequest(medicalRequest,medicalRequestId)
    .subscribe(() =>{
      this.showSucessMessage('Sucessfully Added!!')
      
      
      this.medicalRequestservice.getmedicalRequestByStatus(this.medicalStatus).subscribe({
        next: (medicalRequest) => {
          this.medicalPenddings = medicalRequest
          ;
        },
        error: (response) => {
          console.log(response);
        }
      });
    });
}

rejectmedicalPendding
(medicalRequest: MedicalRequests){
    
  var medicalRequestId=medicalRequest.medicalRequestId
  medicalRequest.approvalStatus="Rejected"
 console.log(medicalRequest)
  this.medicalRequestservice
  .updateMedicalRequest(medicalRequest,medicalRequestId)
  .subscribe(() =>{
    this.showSucessMessage('Sucessfully Rejected!!')
    

    
    this.medicalRequestservice.getmedicalRequestByStatus(this.medicalrejectStatus).subscribe({
      next: (medicalRequest) => {
        this.medicalPenddings = medicalRequest
        ;
      },
      error: (response) => {
        console.log(response);
      }
    });
  });
}
  }

