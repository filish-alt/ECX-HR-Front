import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { DeductionType } from 'app/models/Payroll/DeductionType.model';
import { Deduction } from 'app/models/Payroll/payroll.model';
import { Department } from 'app/models/education.model';
import { Employee } from 'app/models/employee.model';
import { Division, EmployeePosition, Position } from 'app/models/job-description.model';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { DeductionTypeService } from 'app/service/deduction-type.service';
import { DeductionService } from 'app/service/deduction.service';
import { DepartmentService } from 'app/service/department.service';
import { DivisionService } from 'app/service/division.service';
import { EmployeePositionService } from 'app/service/employee-position';
import { EmployeeService } from 'app/service/employee.service';
import { PositionService } from 'app/service/position.service';


@Component({
  selector: 'app-deduction',
  templateUrl: './deduction.component.html',
  styleUrls: ['./deduction.component.css']
})
export class DeductionComponent {
  buttons = [
    { label: ' Monthly Payroll', route: '/payroll' },
    { label: ' Payroll', route: '/payroll/mainPayroll' },

    { label: ' Allowance', route: '/payroll/allowance' },
    { label: ' OverTime', route: '/payroll/overtime' },
    { label: ' Deduction', route: '/payroll/deduction' },
    
    { label: ' OtherPayroll', 
    dropdownOptions: [
   { label: ' Outsource', route: '/payroll/outsource' },
    { label: ' Contract', route: '/payroll/contract' },
   
    ]
   },    
    { label: ' Report', route: '/payroll/report' },

  ];
  filteredDeductions:Deduction[]=[];
  searchTerm:string
  showDeductionForm: boolean = false;
  selectedDeductionTypeName:string;
 DeductionForm: FormGroup;
 deductionSaved: boolean = false;
 deductionUpdated:boolean = false;
  Deductions: Deduction[]=[];
  Employees: Employee[]=[];
  DeductionTypes: DeductionType[]=[];
  positionsOfSupervisor:string[]=[]
  departments:Department[]=[]

  employeePostions :EmployeePosition[]=[]
  selectedEmployeepostion:string='';
  selectedEmployeeDepartment:string;
  selectedEmployee:string;
  selectedPosition:string=''
  selectedDepartment:string='';
  selecteddate:string;
  selectedEnddate:string;
  positions:Position[]= [];
  divisions:Division[]= [];
  currentSupervisorPosition:string

  downloadFileUrl: string=''; 
  pdfUrl:string='' 
  FileNull:boolean = false;
  id:string;

  IsPdf:boolean = false;
  IsBig:boolean = false;
  selectedDeductionType:string;

  Deduction: Deduction = { 
    createdBy: "",
    createdDate: "2023-07-26T06:13:52.512Z",
    updatedDate:"2023-07-26T06:13:52.512Z",
    updatedBy:"",
    pId: 0,
    id: undefined,
    empId: "",
    deductionType: "",
    file: "",
    remark: "",
    amount: 0,
    length:0,
    startDate: null,
    endDate: null,
    status: 0}

  constructor(
    private deductionService: DeductionService,
    private   formBuilder: FormBuilder,
    private deductionTypeService: DeductionTypeService,

    private positionservice:PositionService ,
    private dialog: MatDialog ,
    private employeeService: EmployeeService,
    private employeepostionservice : EmployeePositionService,
    private departmentService:DepartmentService,
    private divisionservice: DivisionService,
    private snackBar :MatSnackBar
    ) {

      this.DeductionForm = this.formBuilder.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        
      },  )
  
    }
    ngOnInit(): void { 
      
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
            
        this.positionservice.getAllPosition()
        .subscribe({
          next: (positions) => {
            this.positions=positions;
            
          },
          error(response){
            console.log(response)
          }
        });
   
    
    
    
        this.employeepostionservice.getAllEmployeePosition()  
    .subscribe({  
      next: (employeePostions) => { 
      
 this.employeePostions=employeePostions
    
     
       }, 
      error: (response) => { 
        console.log(response); 
      } 
    }); 
    
       
       
    this.employeeService.getAllEmployees().subscribe({
      next: (ee) => { 
        // this.Deduction.empId = this.selectedEmployee; 
        this.Employees=ee 
        console.log("mm",this.Employees)
       }, 
      error: (response) => { 
        console.log(response); 
      } 
    
    })
  
      
         

      this.deductionService.getAllDeduction().subscribe({
        next: (dd) => { 
          // this.Deduction.empId = this.selectedEmployee; 
          this.Deductions=dd 
          this.filteredDeductions=dd
         }, 
        error: (response) => { 
          console.log(response); 
        } 
      
      })

    this.deductionTypeService.getAllDeductionType().subscribe({
      next: (dd) => { 
        // this.Deduction.empId = this.selectedEmployee; 
        this.DeductionTypes=dd 
       }, 
      error: (response) => { 
        console.log(response); 
      } 
    
    })
  }
  onSearch() {
  // this.filteredEmployees = this.employees; 
     if (this.searchTerm.trim() ==='') {
  
       this.filteredDeductions =this.Deductions;
     } else {
    
       this.filteredDeductions = this.Deductions.filter(at => {
 
         return (
             this.getEmployeeName(at.empId).toLowerCase().startsWith(this.searchTerm.toLowerCase()) 
            );
         
         
       });
     }
    
     }
     showSucessMessage(message:string) : void{
      this.snackBar.open(message,'Close',
      {duration:3000,
      
      horizontalPosition:'end',
        verticalPosition:'top',
          panelClass:['cardhead']
        })
        
        }
     capitalizeFirstLetter(text: string): string {
      if (!text) return text;
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
  toggleDeductionForm() {
    this.showDeductionForm =  !this.showDeductionForm;
    console.log("huh", this.showDeductionForm )
  }
  selectedFile: File | null = null; 
  onFileSelected(event: any) { 
   
    const file: File = event.target.files[0]; 
    const reader = new FileReader(); 
    reader.onload = () => { 
        const base64String = reader.result.toString().split(',')[1]; // Extract the base64 part 
        this.Deduction.file = base64String; 
    }; 
    reader.readAsDataURL(file); 
  } 
  fetchAndDisplayPDF(deduction: Deduction): void {
    const DeductionToEdit = this.Deductions.find(
      (Deduction) => Deduction.id === deduction.id
    );

  
    this.deductionService.getDeductionFile(DeductionToEdit.id).subscribe(
      (pdf: Blob) => {
   
        var file = new Blob([pdf], { type: 'application/pdf' });

        this.downloadFileUrl = window.URL.createObjectURL(file);
        window.open(this.downloadFileUrl, '_blank');    
      },
      (error) => {
        this.FileNull=true
        console.error('Error loading PDF:', error);
       this.id= DeductionToEdit.id
      }
    );
  }
  onemployeeselected() :void{
    console.log( "emp",this.employeePostions)
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
     
}


getDeductionTypeName(DeductiontypeId: string): string { 
  const DeductionType = this.DeductionTypes.find((Deduction) => Deduction.id === DeductiontypeId); 
  return DeductionType ? DeductionType.name : ''; 
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
      getEmployeeName(empId: string): string {  
        const employee = this.Employees.find((g) => g.empId === empId);  
        return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE';  
      }  
      addDeduction(){
        const selectedStartDate = new Date(this.DeductionForm.get('startDate').value);
        const selectedEndDate = new Date(this.DeductionForm.get('endDate').value);
        console.log("start",selectedStartDate)
        console.log("end",selectedEndDate)
        this.Deduction.deductionType=this.selectedDeductionType
        this.Deduction.empId=this.selectedEmployee
         this.Deduction.startDate=selectedStartDate
         this.Deduction.endDate=selectedEndDate
     this.deductionService.addDeduction(this.Deduction)
       .subscribe({
       next:(All)=>{
        this.showSucessMessage('Sucessfully Added!!')
         this.deductionService.getAllDeduction() 
            .subscribe({ 
              next: (Deduction) => { 
                this.Deductions = Deduction;
                this.filteredDeductions=Deduction
        
                    }, 
              error(response) { 
                console.log(response); 
              }, 
          });
         this.Deductions.push({ ...this.Deduction });
         console.log("ff",this.Deductions)
         this.Deduction = { 
          createdBy: "",
          createdDate: "2023-07-26T06:13:52.512Z",
          updatedDate:"2023-07-26T06:13:52.512Z",
          updatedBy:"",
          pId: 0,
          id: undefined,
          empId: "",
          deductionType: "",
          file: "",
          remark: "",
          amount: 0,
          length:0,
          startDate:null,
          endDate:null,
          status: 0}
      ;
       },
       
        error(response){
         console.log(response)
       }
       })}

       updateDeduction(): void {
        this.deductionService.updateDeduction(this.Deduction,this.Deduction.id).subscribe(
          () => {        
              this.showSucessMessage('Sucessfully Updated!!')
            this.deductionService.getAllDeduction() 
            .subscribe({ 
              next: (Deduction) => { 
                this.Deductions = Deduction;
                this.filteredDeductions=Deduction
        
                    }, 
              error(response) { 
                console.log(response); 
              }, 
          });
          },
          (error) => {
            console.error(error);
          }
        );
        this.Deduction = {
          createdBy: "",
          createdDate: "2023-07-26T06:13:52.512Z",
          updatedDate:"2023-07-26T06:13:52.512Z",
    updatedBy:"",
    pId: 0,
    id: undefined,
    empId: "",
    deductionType: "",
    file: "",
    remark: "",
    amount: 0,
    length:0,
    startDate:null,
    endDate:null,
    status: 0}
;
       }

      editDeduction(Deduction: Deduction): void {
        const contactToEdit = this.Deductions.find(Deduction => Deduction.id === Deduction.id);
        this.Deduction = contactToEdit;
      }
      deleteDeduction(Deduction: Deduction): void {
        const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
          width: '300px', // Set the desired width of the dialog
          data: { message: 'Are you sure you want to delete this Deduction?' } // Pass any data you want to the delete confirmation component
        });
      
        dialogRef.afterClosed().subscribe(result => {
          // The result will be true if the user confirmed the deletion, otherwise false
          if (result === true) {
            // If the user confirmed the deletion, you can proceed with the delete logic here
            this.deductionService.deleteDeduction(Deduction.id).subscribe(
              () => {
                this.dialog.open(DeletesucessfullmessageComponent)
                this.deductionService.getAllDeduction() 
                .subscribe({ 
                  next: (Deduction) => { 
                    this.Deductions = Deduction;
            this.filteredDeductions=Deduction
                        }, 
                  error(response) { 
                    console.log(response); 
                  }, 
              });
              },
              (error) => {
                console.error(error);
                // If there was an error during deletion, you can show an error message.
                console.log('Failed to delete the Deduction. Please try again later.');
              }
            );
          }
        });
      }
      onDeductionselected(){
  
        this.selectedDeductionTypeName=this.getDeductionTypeName(this.selectedDeductionType);
console.log("dedtype",this.selectedDeductionType)
      }
    }


function dateRangeValidator(selectedLeaveBalance: any) {
  throw new Error('Function not implemented.');
}

