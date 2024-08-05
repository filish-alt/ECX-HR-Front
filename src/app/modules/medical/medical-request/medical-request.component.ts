import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { Department } from 'app/models/education.model';
import { Employee } from 'app/models/employee.model';
import { AssignSupervisor, Division, EmployeePosition, Position } from 'app/models/job-description.model';
import { MedicalBalance, MedicalRequests } from 'app/models/medical/medical.model';
import { Spouse } from 'app/models/spouse.model';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { AssignSupervisorService } from 'app/service/AssignSupervisor';
import { DepartmentService } from 'app/service/department.service';
import { DivisionService } from 'app/service/division.service';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { EmployeePositionService } from 'app/service/employee-position';
import { EmployeeService } from 'app/service/employee.service';
import { MedicalBalancesService } from 'app/service/medicalbalance.service';
import { MedicalRequestService } from 'app/service/medicalrequest.service';
import { PositionService } from 'app/service/position.service';
import { SpouseService } from 'app/service/spouse.service';

@Component({
  selector: 'app-medical-request',
  templateUrl: './medical-request.component.html',
  styleUrls: ['./medical-request.component.css']
})
export class MedicalRequestComponent {

  medicalRequests :MedicalRequests[]=[]
spouses:Spouse[]=[]
  selectedSpouse:string=null;  
  showMedicalForm: boolean = false;
  showInnerForm:boolean = false;
  medicalRequestSaved:boolean = false;
  medicalRequestUpdated:boolean = false;
 

  positionsOfSupervisor:string[]=[]
  departments:Department[]=[]
  selectedEmployeeDepartment:string;
  employeePostions :EmployeePosition[]=[]
  selectedEmployeepostion:string='';
  selectedPosition:string=''
  selectedDepartment:string='';
  selectedPreviousYear:number=0; 
  selectedTwoPerviousYear:0=0; 
  downloadFileUrl: string=''; 
  pdfUrl:string='' 
  FileNull:boolean = false;
  id:string;
  selectedEmployee: string=''; 
  employees:Employee[]=[]; 
  medicalbalance:MedicalBalance[]=[]; 
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
  positions:Position[]= [];
  divisions:Division[]= [];
  currentSupervisorPosition:string=""
  currentEmployee:string='43f0da20-9130-4fc8-89b8-d190abefe675';
  
  assignedSupervisors:AssignSupervisor[]=[];
  selectedFirstSupervisor:string='';
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
    private medicalbalanceservice:MedicalBalancesService,
    private medicalRequestService:MedicalRequestService,
    private divisionservice: DivisionService,
    private formBuilder: FormBuilder,
     private router: Router, 
     private employeeService:EmployeeService, 
     private employeepostionservice : EmployeePositionService,
     private employeeIdService: EmployeeIdService, 
     private positionservice:PositionService ,
     private assignSupervisorService:AssignSupervisorService,
     private departmentService:DepartmentService,
     private spouseService:SpouseService,
 
     private dialog: MatDialog, 
     private http: HttpClient, 
     private snackBar :MatSnackBar
  ){}

  ngOnInit(): void { 

this.medicalbalanceservice.getAllMedicalBalances()
.subscribe({
  
  next: (med) => {
    this.medicalbalance=med;
    console.log(" tt.medicalbalance", this.medicalbalance)
  },
  error(response){
    console.log(response)
  }
});
this.medicalRequestService.getAllMedicalRequest().subscribe({ 
  next: (medicalRequestd) => { 
    this.medicalRequests = medicalRequestd.filter(med=>med.createdBy==this.currentEmployee); 
    
  }, 
  error: (response) => { 
    console.log(response); 
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

this.departmentService.getAllDepartment()
.subscribe({
  next: (dep) => {
    this.departments=dep;
  },
  error(response){
    console.log(response)
  }
});
            console.log(this.selectedEmployee )
  
  
    this.positionservice.getAllPosition()
    .subscribe({
      next: (positions) => {
        this.positions=positions;
        
      },
      error(response){
        console.log(response)
      }
    });
    this.assignSupervisorService.getAllAssignSupervisor()
.subscribe({
  next: (assignedSupervisors) => {



    this.employeepostionservice.getAllEmployeePosition()  
.subscribe({  
  next: (employeePostions) => { 
    // this.MedicalRequest.empId = this.selectedEmployee; 
   
    const supervisoremployeePostions=employeePostions.find(emp=>emp.empId === this.currentEmployee)
console.log("s",supervisoremployeePostions)
    this.currentSupervisorPosition=supervisoremployeePostions.position
    console.log("spostion", this.currentSupervisorPosition)

    
    this.assignedSupervisors=assignedSupervisors;
     this.supervisorPositions=assignedSupervisors.filter(sup=>sup.firstSupervisor===this.currentSupervisorPosition)
    console.log("list of pos",assignedSupervisors)
   console.log("sec list of pos",this.currentSupervisorPosition)

   console.log("supervisorpostion",this.supervisorPositions)
  //this.positionsOfSupervisor=this.supervisorPositions.positionId;
    //console.log("sup pos",this.positionsOfSupervisor)
    this.employeePostions=employeePostions 
  this.supervisorPositions.forEach(element => {
      this.supervisoremployees=employeePostions.filter(emp=>emp.position === element.positionId)
   
      console.log(" employees", this.supervisoremployees)

     
});
    

   this.employeeService.getAllEmployees()  
   .subscribe({  
     next: (employees) => { 
       // this.MedicalRequest.empId = this.selectedEmployee; 
       this.employees=employees 
       this.supervisoremployees.forEach(element=> {
      const sup=employees.find(emp => emp.empId === element.empId);
       this.supervisorEmployees.push(sup)


       
       }); console.log(" suvemp", this.supervisorEmployees)
           }, 
     error: (response) => { 
       console.log(response); 
     } 
   }); 
   
   

 
   }, 
  error: (response) => { 
    console.log(response); 
  } 
}); 


  },
  error(response){
    console.log(response)
  }
});
     
  }
  fetchAndDisplayPDF(medical: MedicalRequests): void {
    const MedicalRequestToEdit = this.medicalRequests.find(
      (MedicalRequest) => MedicalRequest.medicalRequestId === medical.medicalRequestId
    );

  
    this.medicalRequestService.getMedicalRequestFile(MedicalRequestToEdit.medicalRequestId).subscribe(
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
  onemployeeselected(){
 
    const postion= this.employeePostions.find((balance) => balance.empId === this.selectedEmployee) 
    this.selectedPosition = this.getPositionName( postion.position)
    this.selectedEmployeepostion=postion.position
   
    const selectedDivision=postion.divisionId 
    const division=this.divisions.find(division => division.divisionId === selectedDivision);
    console.log(selectedDivision)
    const selectedDepartment = this.departments.find(department => department.departmentId === division.departmentId)

      this.selectedDepartment = selectedDepartment.departmentId;
      this.selectedEmployeeDepartment=this.getDepartmentName(this.selectedDepartment )
   console.log("deppartment",  this.selectedEmployeeDepartment);
 
    const selectedPosition = this.selectedEmployeepostion;

    if (selectedPosition ) {
      
      //const selectedDivision = this.divisions.find(division => division.divisionId === selectedPosition.divisionId);

console.log(this.assignedSupervisors)
const selectedassignedSupervisor= this.assignedSupervisors.find(assignedSupervisor => assignedSupervisor.positionId === selectedPosition);
console.log("Selected Position:", selectedPosition);
console.log("Selected Assigned Supervisor:", selectedassignedSupervisor);
// this.medicalRequestService.getMedicalRequestByEmp(this.selectedEmployee).subscribe({ 
//   next: (medicalRequestd) => { 
//     this.medicalRequests = medicalRequestd.filter(med=>med.createdBy==this.currentEmployee); 
        
     
//   }, 
//   error: (response) => { 
//     console.log(response); 
//   } 
// }); 
if(selectedassignedSupervisor){
  this.selectedFirstSupervisor=selectedassignedSupervisor.firstSupervisor;

}
}
this.spouseService.getAllSpouse()
.subscribe({
  next: (s) => {
    this.spouses=s.filter(s => s.empId === this.selectedEmployee);;
  },
  error(response){
    console.log(response)
  }
});

  }
  showSucessMessage(message:string) : void{
    this.snackBar.open(message,'Close',
    {duration:3000,
    
    horizontalPosition:'end',
      verticalPosition:'top',
        panelClass:['cardhead']
      })
      
      }
  getSupervisorName(positionId: string): string {
    const position = this.positions.find((position) => position.positionId === positionId);
    return position ? position.name : '';
  }
    getPositionName(positionId: string): string {
      
  
          const position = this.positions.find((position) => position.positionId === positionId);  
          console.log('position  ',position.name)
     
          return position ? position.name  : '';
        }
        getDepartmentName(departmentId: string): string {
          const department = this.departments.find((division) => division.departmentId === departmentId);
          return department ? department.description : '';
        }
  addmedicalRequest(){
    this.medicalRequest.spouseId=this.selectedSpouse
    var ss=this.spouseMedBalance.find(s=>s.spouseId==this.medicalRequest.spouseId)
console.log("ff",this.medicalRequest)
if(((this.medicalRequest.spouseId== "" )&& 
(this.selfMedBalance>0))||((ss?ss.familyBalance>0:false) && 
(this.medicalRequest.spouseId != "00000000-0000-0000-0000-000000000000" )))
 {

 
    this.medicalRequest.empId = this.selectedEmployee;
    this.medicalRequest.createdBy=this.currentEmployee;
 
    console.log("med",(this.medicalRequest))

    this.medicalRequest.spouseId = this.selectedSpouse;

    this.medicalRequestService.addMedicalRequest(this.medicalRequest).subscribe({ 
      next: (employee) => { 
        
      //  this.router.navigate(['/employee-registration/work-experience']);  
 
      this.showSucessMessage('Sucessfully Added!!')
      
        this.medicalRequestService.getAllMedicalRequest().subscribe({ 
          next: (medicalRequestd) => { 
            this.medicalRequests = medicalRequestd.filter(med=>med.createdBy==this.currentEmployee); 
            
          }, 
          error: (response) => { 
            console.log(response); 
          } 
        }); 
        // Add the current medicalRequest to the array 
        this.medicalRequests.push({ ...this.medicalRequest }); 
        // Reset the form fields 
      
        this.selectedEmployee= ''; 
this.selectedSpouse=null
        this.medicalRequest = { 

    medicalRequestId:this.medicalRequest.medicalRequestId, 
    pId: 0, 

    createdBy: "", 
    createdDate: "2023-07-26T06:13:52.512Z", 
    updatedDate: "2023-07-26T06:13:52.512Z", 
    updatedBy: "", 
    status: 0, 
    empId:'', 
    institutionName: "",
    address: "",
    remark: "",
    approvalStatus: "",
    medicalExamination: 0,
    laboratory: 0,
    medicine: 0,
    hospitalBed: 0,
    otherRelated: 0,
    total: 0,
    file: "",
    
    receiptFile:"",
    date: "2023-07-26T06:13:52.512Z",
    supervisor:"",
    spouseId: "",
    totalFund:0
        }; 
      } , 
      error(response) { 
        console.log(response) 
      } 
    }); 

  }else{
    this.errormessage = true; 
        setTimeout(() => { 
  this.errormessage = false; 
        }, 2000); 
         
  }
}
editmedicalRequest(medicalRequest: MedicalRequests): void { 
  this.showMedicalForm =true;
  const medicalRequestToEdit = this.medicalRequests.find(med => med.medicalRequestId === medicalRequest.medicalRequestId); 
  this.medicalRequest = medicalRequestToEdit; 
  this.selectedEmployee=medicalRequestToEdit.empId 
  this.medicalRequest.spouseId = this.selectedSpouse;
  this.medicalRequestService.getMedicalRequestFile(medicalRequestToEdit.medicalRequestId).subscribe( 
    (pdf: Blob) => { 
      const file = new Blob([pdf], { type: 'application/pdf' }); 
      this.medicalRequest.file = window.URL.createObjectURL(file); 
    }, 
    (error) => { 
      console.error('Error loading PDF:', error); 
      // Handle the error, e.g., display an error message to the user. 
    } 
  ); 
   

  this.medicalRequestService.getMedicalRequestByEmp(this.selectedEmployee).subscribe({ 
    next: (med) => { 
      this.medicalRequests = med; 
       
     
    }, 
    error: (response) => { 
      console.log(response); 
    } 
  }); 
} 
  updatemedicalRequest(){// this.medicalRequest.updatedDate=new Date().toISOString();
    // if(this.medicalRequest.endDate < this.medicalRequest.updatedDate ){ 
      this.medicalRequest.supervisor=this.selectedFirstSupervisor;
      this.medicalRequest.createdBy=this.currentEmployee;
   this.medicalRequest.approvalStatus='Pendding' ;
   this.medicalRequest.spouseId=this.selectedSpouse
    this.medicalRequestService.updateMedicalRequest(this.medicalRequest, this.medicalRequest.medicalRequestId).subscribe({ 
      next: () => {  
        this.medicalRequestService.getAllMedicalRequest().subscribe({ 
          next: (medicalRequestd) => { 
            this.medicalRequests = medicalRequestd.filter(med=>med.createdBy==this.currentEmployee); 
           
          }, 
          error: (response) => { 
            console.log(response); 
          } 
        }); 
        this.showSucessMessage('Sucessfully updated!!')
        
  
  
      }, 
      error: (response) => { 
        console.log(response); 
      } 
    }); 
  
    this.selectedEmployee='' 
    this.medicalRequest= { 
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
      approvalStatus: "",
      medicalExamination: 0,
      laboratory: 0,
      medicine: 0,
      hospitalBed: 0,
      otherRelated: 0,
      total: 0,
      file: "",
      receiptFile:"",
      date: "2023-07-26T06:13:52.512Z",
      supervisor:"",
      spouseId: "",
      totalFund:0
    };} 
  
 
    capitalizeFirstLetter(text: string): string {
      if (!text) return text;
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
  deletemedicalRequest(id: string){
    const dialogRef = this.dialog.open(DeleteConfirmationComponent); 

    dialogRef.afterClosed().subscribe((result) => { 
      if (result === true) { 
        this.medicalRequestService.deleteMedicalRequest(id).subscribe({
        
          next: () => { 

            this.dialog.open(DeletesucessfullmessageComponent)
            this.medicalRequestService.getAllMedicalRequest().subscribe({ 
              next: (medicalRequestd) => { 
                this.medicalRequests = medicalRequestd.filter(med=>med.createdBy==this.currentEmployee); 
                
              }, 
              error: (response) => { 
                console.log(response); 
              } 
            }); },
          error: (response) => { 
            console.log(response); 
          } 
        }); 
      } 
    }); 
  }

  selectedFile: File | null = null; 
  onFileSelected(event: any) { 
   
    const file: File = event.target.files[0]; 
    const reader = new FileReader(); 
    reader.onload = () => { 
        const base64String = reader.result.toString().split(',')[1]; // Extract the base64 part 
        this.medicalRequest.file = base64String; 
    }; 
    reader.readAsDataURL(file); 
  } 
  toggleMedicalForm() {
    this.showMedicalForm = !this.showMedicalForm;
  }
  toggleInnerForm() {
    this.showInnerForm = !this.showInnerForm;
  }
   
  getEmployeeName(empId: string): string {  
    const employee = this.employees.find((g) => g.empId === empId);  
    return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE';  
  }   
  getSpouseName(Id: string): string {  
    const spouse = this.spouses.find((g) => g.id === Id);  
    return spouse ? spouse.name:"";  
  }   

  availablemedicalBalance(): void { 
    console.log("in")
    const medbalance = this.medicalbalance.filter((emp) => emp.empId === this.selectedEmployee); 
    //const balance= this.medicalbalanceservice.getMedicalBalances(this.selectedEmployee); 
 
       this.spouseMedBalance=medbalance.filter(m=>m.spouseId != "00000000-0000-0000-0000-000000000000")
       this.selfMedBalance=medbalance.find(m=>m.spouseId == "00000000-0000-0000-0000-000000000000").selfBalance;
       console.log("medicalbalance",this.medicalbalance)
       console.log("this.emp",this.selectedEmployee)
       console.log("this.selfMedBalance",this.selfMedBalance)
       console.log("this.spouseMedBalance",this.spouseMedBalance)
    } 
}