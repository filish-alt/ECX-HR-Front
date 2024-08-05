import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { Bank } from 'app/models/Payroll/Bank.model';
import { ContractRegistration } from 'app/models/Payroll/contract.model';
import { Department } from 'app/models/education.model';
import { Supervisor } from 'app/models/employee.model';
import { AssignSupervisor, Branch, Division, Grade, Position, Step } from 'app/models/job-description.model';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { AssignSupervisorService } from 'app/service/AssignSupervisor';
import { BankService } from 'app/service/bank.service';
import { BranchService } from 'app/service/branch.service';
import { ContractRegistrationService } from 'app/service/contractRegistrationservice';
import { DepartmentService } from 'app/service/department.service';
import { DivisionService } from 'app/service/division.service';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { EmployeeService } from 'app/service/employee.service';
import { GradeService } from 'app/service/grade.service';
import { PidService } from 'app/service/pid.service';
import { PositionService } from 'app/service/position.service';
import { StepService } from 'app/service/step.service';
import { SupervisorService } from 'app/service/supervisor.service';

@Component({
  selector: 'app-conttact-regstration',
  templateUrl: './conttact-regstration.component.html',
  styleUrls: ['./conttact-regstration.component.css']
})
export class ConttactRegstrationComponent implements OnInit {
 
  ContractemployeeForm: FormGroup; 
   selectedImage: File;
   supervisors:Supervisor[]=[];
   filteredEmployees: any[] = []; 
   edit:boolean=false

   Banks:Bank[]=[];
selectedBank:string;

   employeeSaved: boolean = false; 
   employeeUpdated: boolean = false; 
   contractemployees: ContractRegistration[] = []; 
   contractemployee:ContractRegistration;
   showEmployeeForm: boolean = false;
   showPostionForm:boolean=false;
   showDepositForm:boolean=false;

  divisions:Division[]= [];
  selectedDivision: string='';
  division: string='';
  divisiondesc: string='';
  department: string='';

  departments:Department[]=[];
  selectedDepartment:string='';
   positions:Position[]= [];
  selectedPosition: string='';
  branches:Branch[]= [];
  selectedBranch: string='';
 
  steps:Step[]= [];
  selectedStep: string='';
  
  levels: Grade[]=[];
  selectedLevel:string='';
  assignedSupervisors:AssignSupervisor[]=[];
  selectedFirstSupervisor:string='';
  selectedSecondSupervisor:string='';
  selectedThirdSupervisor:string='';
  selectedFourthSupervisor:string='';
  selectedFifthSupervisor:string='';
  
  buttons = [ 
    { label: ' Add Employee ', route: '/employee-registration' }, 
    { label: '  List Employee ', route: '/employee-list' } ,
    {label:'Employee History', route:'/history'},
    {label:'Contract Registration', route:'/contract-regstration'}
  ]; 
  constructor( 
    private divisionservice: DivisionService,
    private departmentservice: DepartmentService,
     private positionservice:PositionService ,
      private stepservice: StepService,
    private branchservice: BranchService,
    private levelService: GradeService,
    private bankService: BankService,
    private assignSupervisorService:AssignSupervisorService,
    private formBuilder: FormBuilder, 
    private pIdservice: PidService, 
    private contractemployeeservice: ContractRegistrationService,  
    private router: Router, 
    private supervisorService:SupervisorService ,
    private dialog: MatDialog, 
    private employeeIdService:EmployeeIdService,
    private snackBar :MatSnackBar
  ) {
   
  } 
  ngOnInit():  void { 
 
    this.ContractemployeeForm = this.formBuilder.group({ 
      pId: [0], // You can add any specific validation rule here, like Validators.required 
      createdBy: ['string', Validators.required], 
      createdDate: [ "2023-07-25T09:28:33.440Z", Validators.required], 
      updatedDate: [ "2023-07-25T09:28:33.440Z", Validators.required], 
      updatedBy: ['string', Validators.required], 
      empId: ["9077603c-0a6b-40ce-9dc7-0b822af3ccb2"], // You can add any specific validation rule here, like Validators.required 
      ecxId: ['ecx/pi',Validators.required], 
      adId: ['ad/pi', Validators.required], 
      firstName: ['', Validators.required], 
      middleName: ['',Validators.required], 
      lastName: ['', Validators.required], 
      joinDate: ['', [Validators.required,this.validateJoinDate]], 
      sex: ['', Validators.required], 
      dateOfBityh: ['', Validators.required], 
      placeOfBith: ['', Validators.required], 
      martialStatus: ['', Validators.required], 
      salutation: ['', Validators.required], 
      nationality: ['', Validators.required], 
      pensionNo: ['', Validators.required], 
      imageData: [''], 
      crime: [false], 
      crimeDescription: [''], 
      divisionId: ['', Validators.required], 
      // department: ['', Validators.required],  
      stepId: ['', Validators.required], 
      // level: ['', Validators.required], 
      branchId: ['', Validators.required], 
      position:['', Validators.required], 
      startDate: ['', Validators.required], 
      endDate: ['2023-07-20T13:56:00.062Z', Validators.required], 
      bankId: ['', Validators.required], 
      bankBranch:['', Validators.required], 
      bankAccount: [,Validators.required] ,
      tinNumber:[,Validators.required] ,
      status: [0,] 
    }); 

    this.positionservice.getAllPosition()
    .subscribe({
      next: (positions) => {
        this.positions=positions;
        console.log("pos",positions)
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
    this.levelService.getAllGrade()
    .subscribe({
      next: (level) => {
        this.levels=level;
      },
      error(response){
        console.log(response)
      }
    });
    this.branchservice.getAllBranch()
    .subscribe({
      next: (br) => {
        this.branches=br;
    
      },
      error(response){
        console.log(response)
      }
    });
    this.stepservice.getAllStep()
    .subscribe({
      next: (st) => {
        this.steps=st;
      },
      error(response){
        console.log(response)
      }
    });
    this.bankService.getAllBank() 
    .subscribe({ 
      next: (bank) => { 
        this.Banks = bank;
        console.log("babk",this.Banks)
        ; 
            }, 
      error(response) { 
        console.log(response); 
      }, 
  });
    this.contractemployeeservice.getAllContractRegistration()
    .subscribe((employees) => {
      this.contractemployees = employees;
    })  
  
} 
  
 
    
   
validateJoinDate(control: AbstractControl): { [key: string]: boolean } | null {
  const joinDate = new Date(control.value);
  const currentDate = new Date();

  if (joinDate > currentDate) {
    return { 'invalidJoinDate': true }; // You can name this error as you like
  }

  return null;
}
showSucessMessage(message:string) : void{
  this.snackBar.open(message,'Close',
  {duration:3000,
  
  horizontalPosition:'end',
    verticalPosition:'top',
      panelClass:['cardhead']
    })
    
    }
  addEmployee(): void { 


    if (this.ContractemployeeForm.valid) {
      this.ContractemployeeForm.value.divisionId = this.division; 
      const formData = this.ContractemployeeForm.value; 
       formData.imageData = this.ContractemployeeForm.get('imageData').value;
      // formData.empId = uuidv4(); 
      // this.ContractemployeeForm.value.firstSupervisor = this.selectedFirstSupervisor; 
      // this.ContractemployeeForm.value.secondSupervisor = this.selectedSecondSupervisor; 
     console.log("formData",formData)
      this.contractemployeeservice.addContractRegistration(formData)
      .subscribe({ 
        next: (contact) => { 
          this.showSucessMessage('Sucessfully Added!!')
          this.contractemployeeservice.getAllContractRegistration()
          .subscribe((employees) => {
            this.contractemployees = employees;//.filter(employees => employees.empId === this.employeeIdService.employeeId);
          }) 
          // Add the current work experience to the array 
          this.contractemployees.push({ ...this.ContractemployeeForm.value }); 


          
    this.ContractemployeeForm = this.formBuilder.group({ 
      pId: [0], // You can add any specific validation rule here, like Validators.required 
      createdBy: ['string', Validators.required], 
      createdDate: [ "2023-07-25T09:28:33.440Z", Validators.required], 
      updatedDate: [ "2023-07-25T09:28:33.440Z", Validators.required], 
      updatedBy: ['string', Validators.required], 
      empId: ["9077603c-0a6b-40ce-9dc7-0b822af3ccb2"], // You can add any specific validation rule here, like Validators.required 
      ecxId: ['ecx/pi',Validators.required], 
      adId: ['ad/pi', Validators.required], 
      firstName: ['', Validators.required], 
      middleName: [''], 
      lastName: ['', Validators.required], 
      joinDate: ['', [Validators.required,this.validateJoinDate]], 
      sex: ['', Validators.required], 
      dateOfBityh: ['', Validators.required], 
      placeOfBith: ['', Validators.required], 
      martialStatus: ['', Validators.required], 
      salutation: ['', Validators.required], 
      nationality: ['', Validators.required], 
      pensionNo: ['', Validators.required], 
      imageData: [''], 
      crime: [false], 
      crimeDescription: [''], 
      divisionId: ['',], 
      // department: ['', Validators.required],  
      stepId: ['',Validators.required], 
      // level: ['',Validators.required], 
      branchId: ['',], 
      position:['', ], 
      startDate: ['', ], 
      endDate: ['2023-07-20T13:56:00.062Z', ], 
      bankId: ['', Validators.required], 
      bankBranch:['', Validators.required], 
      bankAccount: [0,] ,
      tinNumber:[0,] ,
      status: [0,]
    }); 
          // Reset the form fields 
          
    this.contractemployeeservice.getAllContractRegistration() 
    .subscribe({ 
      next: (employees) => { 
        this.contractemployees=employees; 
      }, 
      error(response){ 
        console.log(response) 
      }, 
       
    }); 
           
        }, 
        error: (response) => { 
          console.log(response); 
        } 
      }); 
console.log(this.ContractemployeeForm.value) 
    } 
     else { 
     
      this.validateAllFormFields(this.ContractemployeeForm); 
      console.log("error") 
    } 
  } 
  
  toggleEmployeeForm() {
    this.showEmployeeForm = !this.showEmployeeForm;
  }
  togglePostionForm() {
    this.showPostionForm = !this.showPostionForm;
  }

  toggleDepositForm() {
    this.showDepositForm = !this.showDepositForm;
  }
  capitalizeFirstLetter(text: string): string {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
validateAllFormFields(formGroup: FormGroup) { 
  Object.keys(formGroup.controls).forEach((field) => { 
    const control = formGroup.get(field); 
    if (control instanceof FormGroup) { 
      this.validateAllFormFields(control); 
    } else { 
      control.markAsTouched({ onlySelf: true }); 
    } 
  });} 
 
  getEmployeeName(empId: string): string { 
    const employee = this.contractemployees.find((g) => g.empId === empId); 
    return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
  } 

  openImageDialog(): void {
    // Trigger click on the file input element to open the image dialog
    const fileInput = document.getElementById('image') as HTMLInputElement;
    fileInput.click();
  }
  onImageSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.getBase64(file).then((data) => {
        this.ContractemployeeForm.patchValue({
          imageData: data
        });
      });
    }
  }
    private getBase64(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  onPositionSelected(): void {

    const selectedPosition = this.positions.find(position => position.positionId === this.ContractemployeeForm.value.position);
   
       console.log("Selected Position:", selectedPosition);
    if (selectedPosition ) {
      
      const selectedDivision = this.divisions.find(division => division.divisionId === selectedPosition.divisionId);

console.log(this.assignedSupervisors)
const selectedassignedSupervisor= this.assignedSupervisors.find(assignedSupervisor => assignedSupervisor.positionId === selectedPosition.positionId);
console.log("Selected Position:", selectedPosition);
console.log("Selected Assigned Supervisor:", selectedassignedSupervisor);

if(selectedassignedSupervisor){
  this.selectedFirstSupervisor=this.getSupervisorName(selectedassignedSupervisor.firstSupervisor);
  this.selectedSecondSupervisor=this.getSupervisorName(selectedassignedSupervisor.secondSupervisor);
  this.selectedThirdSupervisor=this.getSupervisorName(selectedassignedSupervisor.thirdSupervisor);
  this.selectedFourthSupervisor=this.getSupervisorName(selectedassignedSupervisor.fourthSupervisor);
  this.selectedFifthSupervisor=this.getSupervisorName(selectedassignedSupervisor.fifthSupervisor);
}
    const selectedDepartment = this.departments.find(department => department.departmentId === selectedDivision.departmentId);
      if (selectedDivision) {
      this.ContractemployeeForm.value.divisionId = selectedDivision.divisionId;
        this.division=selectedDivision.divisionId
        this.department=selectedDepartment.description
  this.divisiondesc=selectedDivision.description
        console.log("Selected div:",this.division );
       console.log("Selected depa:",  this.divisiondesc );

      } 
    }
  }
  onStepSelected(): void {
   // const selectedPosition = this.positions.find(position => position.positionId === this.selectedPosition);
     const selectedStep = this.steps.find(step => step.id === this.ContractemployeeForm.value.stepId);
    console.log(selectedStep)
    if (selectedStep) {
    
      const selectedLevel= this.levels.find(level => level.levelId === selectedStep.levelId );
       console.log(this.departments.find(department => department.departmentId))
      if (selectedLevel) {
        this.selectedLevel = selectedLevel.description;
        console.log(" this.selectedLevel", this.selectedLevel)
      } else {
        this.selectedLevel = 'not'; 
      }
    }
  }  getSupervisorName(positionId: string): string {
    const position = this.positions.find((position) => position.positionId === positionId);
    return position ? position.name : '';
  }
  getDivisionName(divisionId: string): string {
    const division = this.divisions.find((division) => division.divisionId === divisionId);
    return division ? division.description :'';
  }
  getPositionName(positionId: string): string {
    const position = this.positions.find((position) => position.positionId === positionId);
    return position ? position.name : '';
  }
  getStepName(stepId: string): string {
    const step = this.steps.find((step) => step.id === stepId);
    return step ? step.description : '';
  }

  getBranchName(branchId: string): string {
    const branch = this.branches.find((branch) => branch.id === branchId);
    return branch ? branch.name : '';
  }
  getConcatenatedData() {
    let employee ='';
     employee =this.contractemployee.firstName +''+ this.contractemployee.lastName
    return employee ? employee : '';
    
  }
  deleteEmployee(id: string) { 
    // Open the confirmation dialog 
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, { 
      width: '400px', 
    }); 
   
    // After the dialog is closed (by clicking Confirm or Cancel button) 
    dialogRef.afterClosed().subscribe((result) => { 
      // If the user confirms the deletion, proceed with the deletion 
      if (result === true) { 
        this.contractemployeeservice.deleteContractRegistration(id).subscribe({
          next: () => {

            this.dialog.open(DeletesucessfullmessageComponent)
          
            this.contractemployeeservice.getAllContractRegistration() 
            .subscribe({ 
              next: (employees) => { 
                this.contractemployees= employees.filter(employees => employees.empId === this.employeeIdService.employeeId);
                ; 
              }, 
              error(response){ 
                console.log(response) 
                alert('Failed to delete the EmployeePosition. Please try again later.');
              }
            });
          
              
          } });
      
      }
    }
    )}
   
  // private showSnackBar(message: string, panelClass: string = 'mat-toolbar') { 
  //   this.snackBar.open(message, 'Close', { 
  //     duration: 3000, 
  //     panelClass: ['mat-toolbar', panelClass], 
  //   }); 
  // } 


  updateEmployee(): void {
    if (this.ContractemployeeForm.valid) {
 
      // Add logic to update the employee using the formData
      // For example:
  
      //this.ContractemployeeForm.value.firstSupervisor = this.selectedFirstSupervisor; 
      //this.ContractemployeeForm.value.secondSupervisor = this.selectedSecondSupervisor;   
         const formData = this.ContractemployeeForm.value;
      this.contractemployeeservice.updateContractRegistration(formData,this.contractemployee.empId ).subscribe({
        next: () => {
          this.showSucessMessage('Sucessfully Updated!!')

          this.ContractemployeeForm = this.formBuilder.group({ 
            pId: [0], // You can add any specific validation rule here, like Validators.required 
            createdBy: ['string', Validators.required], 
            createdDate: [ "2023-07-25T09:28:33.440Z", Validators.required], 
            updatedDate: [ "2023-07-25T09:28:33.440Z", Validators.required], 
            updatedBy: ['string', Validators.required], 
            empId: ["9077603c-0a6b-40ce-9dc7-0b822af3ccb2"], // You can add any specific validation rule here, like Validators.required 
            ecxId: ['ecx/pi',Validators.required], 
            adId: ['ad/pi', Validators.required], 
            firstName: ['', Validators.required], 
            middleName: [''], 
            lastName: ['', Validators.required], 
            joinDate: ['', [Validators.required,this.validateJoinDate]], 
            sex: ['', Validators.required], 
            dateOfBityh: ['', Validators.required], 
            placeOfBith: ['', Validators.required], 
            martialStatus: ['', Validators.required], 
            salutation: ['', Validators.required], 
            nationality: ['', Validators.required], 
            pensionNo: ['', Validators.required], 
            imageData: [''], 
            crime: [false], 
            crimeDescription: [''], 
            divisionId: ['', Validators.required],
            department: ['', Validators.required],  
            stepId: ['', Validators.required], 
            level: ['',Validators.required], 
            branchId: ['', Validators.required], 
            position:['', Validators.required], 
            startDate: ['', Validators.required], 
            endDate: ['2023-07-20T13:56:00.062Z', Validators.required], 
            bankId: ['', Validators.required], 
            bankBranch:['', Validators.required], 
            bankAccount: [0,] ,
            tinNumber:[0,] ,
            status: [0,]
          }); 

          this.contractemployeeservice.getAllContractRegistration()
          .subscribe((employees) => {
            this.contractemployees = employees.filter(employees => employees.empId === this.employeeIdService.employeeId);
          })

            
        },
        error: (response) => {
          console.log(response);
        }
      });

    } else {
      this.validateAllFormFields(this.ContractemployeeForm);
    }
  }
  editEmployee(employee: ContractRegistration): void { 
    this.edit=true
    this.contractemployeeservice.getAllContractRegistration()
    .subscribe((employees) => {
      this.contractemployees = employees.filter(employees => employees.empId === this.employeeIdService.employeeId);
    }) 
   
  const employeeToEdit = this.contractemployees.find(employeePosition => employeePosition.empId === employee.empId);
  this.contractemployee = employeeToEdit;
  this.ContractemployeeForm.patchValue(this.contractemployee);
 
   this.selectedDivision =  this.contractemployee.divisionId;
this.selectedPosition  =this.contractemployee.position ;
 this.selectedStep= this.contractemployee.stepId ;
 this.selectedBranch =this.contractemployee.branchId ;
  }
  } 

