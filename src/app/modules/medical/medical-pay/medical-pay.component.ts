import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Department } from 'app/models/education.model';
import { Employee } from 'app/models/employee.model';
import { AssignSupervisor, Division, EmployeePosition, Position } from 'app/models/job-description.model';
import { MedicalBalance, MedicalRequests } from 'app/models/medical/medical.model';
import { Spouse } from 'app/models/spouse.model';
import { AssignSupervisorService } from 'app/service/AssignSupervisor';
import { DepartmentService } from 'app/service/department.service';
import { DivisionService } from 'app/service/division.service';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { EmployeePositionService } from 'app/service/employee-position';
import { EmployeeService } from 'app/service/employee.service';
import { MedicalRequestService } from 'app/service/medicalrequest.service';
import { PositionService } from 'app/service/position.service';
import { SpouseService } from 'app/service/spouse.service';

@Component({
  selector: 'app-medical-pay',
  templateUrl: './medical-pay.component.html',
  styleUrls: ['./medical-pay.component.css']
})
export class MedicalPayComponent {
  selectedFile:string
  medicalRequests :MedicalRequests[]=[]

  approveStatus:string="Paid"
    
    showMedicalForm: boolean = false;
    showInnerForm:boolean = false;
    medicalRequestSaved:boolean = false;
    medicalRequestUpdated:boolean = false;
   
 
    downloadFileUrl: string=''; 
    pdfUrl:string='' 
    FileNull:boolean = false;
    id:string;
    
    employees:Employee[]=[]; 
    Approvedmedical:MedicalRequests;
    errormessage:boolean = false;
    selfMedBalance:number;
    supervisorPositions:AssignSupervisor[]=[]
    supervisorEmployees:Employee[]=[]; 
    spouseMedBalance:MedicalBalance[]=[];
    supervisoremployees:EmployeePosition[]=[]
    fileType:string = 'other'; // Initialize as 'other' by default 
    fileData: string = ''; 
   IsPdf:boolean = false;
    IsBig:boolean = false;

    medicalApproved: boolean = false;
    medicalStatus:string="First-Approved";
    ApprovemedicalStatus:string="Paid";
    medicalrejectStatus:string="Reject";
    AdminApprovedStatus:string="Admin-Approved";

  
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
    medicalRequest: MedicalRequests = { 
      pId: 0, 
      medicalRequestId:undefined, 
      createdBy: "", 
      createdDate: "2023-07-26T06:13:52.512Z", 
      updatedDate: "2023-07-26T06:13:52.512Z", 
      updatedBy: "", 
      status: 0, 
      empId:'', 
      institutionName: "",
      address: "",
      remark: "",
      approvalStatus: "Pendding",
      medicalExamination: 0,
      laboratory: 0,
      medicine: 0,
      hospitalBed: 0,
      otherRelated: 0,
      total: 0,
      file: "",
      receiptFile:"",
      date:"2023-07-26T06:13:52.512Z" ,
      supervisor:"",
      spouseId: "",
      totalFund:0
    }; 
   
    constructor( 
 
      private medicalRequestService:MedicalRequestService,

      private formBuilder: FormBuilder,
       private router: Router, 


       private positionservice:PositionService ,

       private spouseService:SpouseService,
       private employeeService:EmployeeService,
   
       private dialog: MatDialog, 
       private http: HttpClient, 
       private snackBar :MatSnackBar
    ){}
  
    ngOnInit(): void {  

      this.medicalRequestService.getmedicalRequestByStatus(this.AdminApprovedStatus).subscribe({
        next: (medicalRequest1) => {
          this.medicalRequests = medicalRequest1;
          console.log("Approvedmedicals",this.medicalRequests)
        },
        error: (response) => {
          console.log(response);
        }
      });


  this.medicalRequestService.getmedicalRequestByStatus(this.approveStatus).subscribe({ 
    next: (medicalRequestd) => { 
       this.medicalRequests = medicalRequestd; 
       console.log("response",this.medicalRequests)
     
    }, 
    error: (response) => { 
      console.log(response); 
    } 
  }); 
        
   

       
      this.employeeService.getAllEmployees()  
  .subscribe({  
    next: (employees) => { 
      // this.leaveRequest.empId = this.selectedEmployee; 
      this.employees=employees 
      console.log("emp",this.employees)
     }, 
    error: (response) => { 
      console.log(response); 
    } 
  }); 
  
  
  
  
    } 
  
    fetchAndDisplayPDF(medical: MedicalRequests): void {
      const MedicalRequestToEdit = this.medicalRequests.find(
        (MedicalRequest) => MedicalRequest.medicalRequestId === medical.medicalRequestId
      );
  
    
      this.medicalRequestService.getMedicalRequestReceiptFile(MedicalRequestToEdit.medicalRequestId).subscribe(
        (pdf: Blob) => {
     
          var file = new Blob([pdf], { type: 'application/pdf' });
  
          this.downloadFileUrl = window.URL.createObjectURL(file);
          window.open(this.downloadFileUrl, '_blank');    
        },
        (error) => {
          this.FileNull=true
          console.error('Error loading PDF:', error);
         this.id= MedicalRequestToEdit.medicalRequestId
        }
      );
    }
    showSucessMessage(message:string) : void{
      this.snackBar.open(message,'Close',
      {duration:3000,
      
      horizontalPosition:'end',
        verticalPosition:'top',
          panelClass:['cardhead']
        })
        
        }
    onFileSelected(event: any) { 
   
      const file: File = event.target.files[0]; 
      const reader = new FileReader(); 
      reader.onload = () => { 
          const base64String = reader.result.toString().split(',')[1]; // Extract the base64 part 
     this.medicalRequest.receiptFile = base64String; 
     //console.log("rec",this.medicalRequest.receiptFile)
      }; 
      reader.readAsDataURL(file); 
    } 
    paidmedicalFunds(medicalRequest: MedicalRequests){
    
      var medicalRequestId=medicalRequest.medicalRequestId
      medicalRequest.receiptFile=this.medicalRequest.receiptFile
      medicalRequest.approvalStatus=this.ApprovemedicalStatus
     console.log("rec",medicalRequest.receiptFile)
      this.medicalRequestService
      .updateMedicalRequest(medicalRequest,medicalRequestId)
      .subscribe(() =>{
        this.showSucessMessage('Sucessfully Updated!!')
      
  
        
        this.medicalRequestService.getmedicalRequestByStatus(this.AdminApprovedStatus).subscribe({
          next: (medicalRequest) => {
            this.medicalRequests = medicalRequest
            ;
          },
          error: (response) => {
            console.log(response);
          }
        });
      });
  }


    capitalizeFirstLetter(text: string): string {
      if (!text) return text;
      return text.charAt(0).toUpperCase() + text.slice(1);
    }

  getEmployeeName(empId: string): string {  
    const employee = this.employees.find((g) => g.empId === empId);  
    return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE';  
  }   

  }