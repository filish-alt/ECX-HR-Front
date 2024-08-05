
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { Contact } from 'app/models/contact.model';
import { Employee, Supervisor } from 'app/models/employee.model';
import { ContactComponent } from 'app/modules/contact/contact.component';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { ContactService } from 'app/service/contact.service';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { EmployeeService } from 'app/service/employee.service';
import { SupervisorService } from 'app/service/supervisor.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employeeId: string;
  employee: Employee;
  employeeUpdated: boolean = false;
supervisors:Supervisor[]=[];
  employees: Employee[] = [];
  allemployees: Employee[] = [];
  firstSupervisors: Supervisor[] = []; // Array to store first supervisors only 
  selectedFirstSupervisor: string = ''; 
  filteredEmployees: any[] = []; 
  secondSupervisors: Supervisor[] = []; // Array to store first supervisors only 
  selectedSecondSupervisor: string = ''; 
  
   buttons = [
     { label: ' Add Employee ', route: '/employee-registration' },
     { label: '  List Employee ', route: '/employee-list' },
     {label:'Employee History', route:'/history'}
   ];
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private supervisorService:SupervisorService ,
    private employeeIdService: EmployeeIdService,
    private dialog: MatDialog,
    private snackBar :MatSnackBar

  ) {}

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
 
      pId: [0], // You can add any specific validation rule here, like Validators.required 
      createdBy: ['string', Validators.required], 
      createdDate: [ "2023-07-25T09:28:33.440Z", Validators.required], 
      updatedDate: [ "2023-07-25T09:28:33.440Z", Validators.required], 
      updatedBy: ['string', Validators.required], 
      empId: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"], // You can add any specific validation rule here, like Validators.required 
      ecxId: ['ecx/pi',Validators.required], 
      adId: ['ad/pi', Validators.required], 
      firstName: ['', Validators.required], 
      middleName: [''], 
      lastName: ['', Validators.required], 
      joinDate: ['', Validators.required], 
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
      status: [0,] ,
      attendanceId:undefined,
    });
    this.supervisorService.getAllSupervisors() 
    .subscribe({ 
      next: (supervisors) => { 
        this.supervisors = supervisors; 
        this.firstSupervisors = supervisors.filter((supervisor) => supervisor.supervisorLevel == 'First Supervisor'); 
        this.secondSupervisors = supervisors.filter((supervisor) => supervisor.supervisorLevel == 'Second Supervisor'); 
      }, 
      error(response) { 
        console.log(response); 
      }, 
    }); 
    this.employeeService.getAllEmployees() 
    .subscribe({ 
      next: (employees) => { 
        this.allemployees=employees; 
      }, 
      error(response){ 
        console.log(response) 
      }, 
       
    }); 



    this.route.params.subscribe((params) => {
      this.employeeId = params['empId']; 
      this.employeeIdService.employeeId= this.employeeId;
      this.employeeService.getEmployee(this.employeeIdService.employeeId).subscribe((employee) => {
        this.employee = employee;
      
        this.populateForm();
        console.log("Form Value:", this.employeeForm.value);// Call the method to populate the form with employee data
      });
    });
this.employeeService.getAllEmployees()
.subscribe((employees) => {
  this.employees = employees.filter(employees => employees.empId === this.employeeIdService.employeeId);
})
  }
  showSucessMessage(message:string) : void{
    this.snackBar.open(message,'Close',
    {duration:3000,
    
    horizontalPosition:'end',
      verticalPosition:'top',
        panelClass:['cardhead']
      })
      
      }
  populateForm(): void {
    
    // Set the form values with the employee data
    console.log(this.employee); 
    this.employeeForm.setValue({


      pId: this.employee.pId,
      createdBy: this.employee.createdBy,
      createdDate: this.employee.createdDate,
      updatedDate: this.employee.updatedDate,
      updatedBy: this.employee.updatedBy,
      empId: this.employee.empId,
      ecxId: this.employee.ecxId,
      adId: this.employee.adId,
      firstName: this.employee.firstName,
      middleName: this.employee.middleName,
      lastName: this.employee.lastName,
      joinDate: this.employee.joinDate,
      sex: this.employee.sex,
      dateOfBityh: this.employee.dateOfBityh,
      placeOfBith: this.employee.placeOfBith,
      martialStatus: this.employee.martialStatus,
      salutation: this.employee.salutation,
      nationality: this.employee.nationality,
      pensionNo: this.employee.pensionNo,
      imageData: this.employee.imageData,
      crime: this.employee.crime,
      crimeDescription: this.employee.crimeDescription,
      attendanceId:this.employee.attendanceId,
     
      status: this.employee.status
    });
  }

  updateEmployee(): void {
    if (this.employeeForm.valid) {
 
      // Add logic to update the employee using the formData
      // For example:
  
      this.employeeForm.value.firstSupervisor = this.selectedFirstSupervisor; 
      this.employeeForm.value.secondSupervisor = this.selectedSecondSupervisor;   
         const formData = this.employeeForm.value;
      this.employeeService.updateEmployee(formData,this.employee.empId ).subscribe({
        next: () => {
          this.showSucessMessage('Sucessfully Updated!!')

          this.employeeService.getAllEmployees()
          .subscribe((employees) => {
            this.employees = employees.filter(employees => employees.empId === this.employeeIdService.employeeId);
          })  
        },
        error: (response) => {
          console.log(response);
        }
      });

    } else {
      this.validateAllFormFields(this.employeeForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }
 
  getEmployeeName(empId: string): string { 
    const employee = this.allemployees.find((g) => g.empId === empId); 
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
        this.employeeForm.patchValue({
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

  getFirstSupervisorName(firstSupervisor: string): string { 
    const employee = this.allemployees.find((g) => g.empId === firstSupervisor); 
    return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
  } 
  getSecondSupervisorName(secondSupervisor: string): string { 
    const employee = this.allemployees.find((g) => g.empId === secondSupervisor); 
    return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
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
        this.employeeService.deleteEmployee(id).subscribe({
          next: () => {

            this.dialog.open(DeletesucessfullmessageComponent)
          
            this.employeeService.getAllEmployees() 
            .subscribe({ 
              next: (employees) => { 
                this.employees= employees.filter(employees => employees.empId === this.employeeIdService.employeeId);
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
  editEmployee(employe: Employee): void { 
    const employeeToEdit = this.employees.find(employee => employee.empId === employe.empId);
    this.employee = employeeToEdit;

 
  } 
    
}