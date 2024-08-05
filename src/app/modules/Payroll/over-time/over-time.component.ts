import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { OverTime } from 'app/models/Payroll/DeductionType.model';
import { Department } from 'app/models/education.model';
import { Employee } from 'app/models/employee.model';
import { Division, EmployeePosition, Grade, Position, Step } from 'app/models/job-description.model';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { DepartmentService } from 'app/service/department.service';
import { DivisionService } from 'app/service/division.service';
import { EmployeePositionService } from 'app/service/employee-position';
import { EmployeeService } from 'app/service/employee.service';
import { GradeService } from 'app/service/grade.service';
import { OverTimeService } from 'app/service/overtime.service';
import { PositionService } from 'app/service/position.service';
import { StepService } from 'app/service/step.service';



@Component({
  selector: 'app-over-time',
  templateUrl: './over-time.component.html',
  styleUrls: ['./over-time.component.css']
})
export class OverTimeComponent {
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
  searchTerm:string
  selectedStep:string;
  selectedDivision:string;
  selectedOverTimeTypeName:string;
  showOverTimeForm: boolean = false;
 OverTimeForm: FormGroup;
  OverTimes: OverTime[]=[];
  OverTimeTypes: OverTime[]=[];
  selectedPositionDepartment:string;

  selectedPosition:string=''
  selectedDepartment:string='';
  Positions:Position[]= [];
  divisions:Division[]= [];
  grades:Grade[]=[];
  steps:Step[];
  departments:Department[]=[]
  formBuilder: any;
  selectedGrade:string
  selectedOverTimeType:string;
  OverTimeSaved: boolean = false;
  OverTimeUpdated: boolean = false;
  employeePostions :EmployeePosition[]=[]
  Employees :Employee[]=[]
  selectedEmployeepostion:string='';
  selectedEmployeeDepartment:string;
  selectedEmployee:string;
  filteredOverTimes :OverTime []=[]
  selectedId:OverTime;
  OverTime: OverTime = { 
    createdBy: "",
    createdDate: "2023-07-26T06:13:52.512Z",
    updatedDate:"2023-07-26T06:13:52.512Z",
    updatedBy:"",
    pId: 0,
    id: undefined,
    status: 0,
     empId:  "",
    date:  "",
    otDay:  null,
    otNight: null,
    otWeekend: null,
    otHoliday: null,
    }


  constructor(
    private employeeService: EmployeeService,
    private employeepostionservice : EmployeePositionService,
    private OverTimeService: OverTimeService,
    private positionservice:PositionService ,
    private dialog: MatDialog ,
    private departmentService:DepartmentService,
    private divisionservice: DivisionService,
    private stepservice: StepService,
    private gradeservice: GradeService,
    private snackBar :MatSnackBar
    ) {
    }
    ngOnInit(): void { 
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
            this.Positions=positions;
            console.log("ddd", this.Positions)
          },
          error(response){
            console.log(response)
          }
        });
   
    
      this.OverTimeService.getAllOverTime().subscribe({
        next: (dd) => { 
           this.OverTimes = dd; 
          this.filteredOverTimes=dd.filter(d=>d.otDay>0 || d.otNight>0 || d.otWeekend>0 || d.otHoliday>0) 
         }, 
        error: (response) => { 
          console.log(response); 
        } 
      
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
  toggleOverTimeForm() {
    this.showOverTimeForm =  !this.showOverTimeForm;
    console.log("huh", this.showOverTimeForm )
  }
  toggleLeaveForm() {
    this.showOverTimeForm = !this.showOverTimeForm;
  }
  capitalizeFirstLetter(text: string): string {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  onSearch() {
    // this.filteredEmployees = this.employees; 
       if (this.searchTerm.trim() ==='') {
    
        this.filteredOverTimes=this.OverTimes.filter(d=>d.otDay>0 || d.otNight>0 || d.otWeekend>0 || d.otHoliday>0) 
   
       } else {
      
         this.filteredOverTimes = this.filteredOverTimes.filter(at => {
   
           return (
               this.getEmployeeName(at.empId).toLowerCase().startsWith(this.searchTerm.toLowerCase()) 
              );
           
           
         });
       }
      
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
 this.selectedId= (this.OverTimes.find(o=>o.empId===this.selectedEmployee))
    console.log("addover",this.selectedId)

}

  onGradeselected(){
    this.stepservice.getAllStep()
    .subscribe({
      next: (steps) => {
        this.steps=steps.filter(g=>g.levelId==this.selectedGrade);
      },
      error(response){
        console.log(response)
      }
    });  }
  onPositionselected() :void{
      this.gradeservice.getAllGrade()
    .subscribe({
      next: (gg) => {
        this.grades=gg.filter(g=>g.positionId==this.selectedPosition);  },
      error(response){
        console.log(response)
      }
    }); 
const sp=this.Positions.find(p=>p.positionId==this.selectedPosition)
   
    const selectedDivision=sp.divisionId
    this.selectedDivision=sp.divisionId;
    const division=this.divisions.find(division => division.divisionId === selectedDivision);
    console.log(selectedDivision)
    const selectedDepartment = this.departments.find(department => department.departmentId === division.departmentId)

      this.selectedDepartment = selectedDepartment.departmentId;
      this.selectedPositionDepartment=this.getDepartmentName(this.selectedDepartment )
 
   
   
}


getSupervisorName(positionId: string): string {
  const position = this.Positions.find((position) => position.positionId === positionId);
  return position ? position.name : '';
}
 

       updateOverTime(): void {      console.log("addover",this.OverTimes)
        this.OverTime.empId=this.selectedEmployee
    
        this.OverTime.id=this.selectedId.id
        this.OverTimeService.updateOverTime(this.OverTime,this.selectedId.id).subscribe(
          () => {           this.showSucessMessage('Sucessfully Updated!!')
     
            this.OverTimeService.getAllOverTime() 
            .subscribe({ 
              next: (OverTime) => { 
                this.OverTimes = OverTime;
                this.filteredOverTimes=OverTime.filter(d=>d.otDay>0 || d.otNight>0 || d.otWeekend>0 || d.otHoliday>0) 
        
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
        this.OverTime = {
          createdBy: "",
          createdDate: "2023-07-26T06:13:52.512Z",
          updatedDate:"2023-07-26T06:13:52.512Z",
          updatedBy:"",
          pId: 0,
          id: undefined,
          status: 0,
           empId:  "",
          date:  "",
          otDay:  0,
          otNight: 0,
          otWeekend: 0,
          otHoliday: 0,
        
        };
        this.selectedId.id=""
       }

       editOverTime(overTime: OverTime): void {
        const contactToEdit = this.OverTimes.find(OverTime => OverTime.id === overTime.id);
        this.OverTime = contactToEdit;
        console.log("ov",this.OverTime)
        this.selectedEmployee=contactToEdit.empId;
        this.onemployeeselected()
    
      }
      deleteOverTime(OverTime: OverTime): void {
        const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
          width: '300px', // Set the desired width of the dialog
          data: { message: 'Are you sure you want to delete this OverTime?' } // Pass any data you want to the delete confirmation component
        });
      
        dialogRef.afterClosed().subscribe(result => {
          // The result will be true if the user confirmed the deletion, otherwise false
          if (result === true) {
            // If the user confirmed the deletion, you can proceed with the delete logic here
            this.OverTimeService.deleteOverTime(OverTime.id).subscribe(
              () => {
                this.dialog.open(DeletesucessfullmessageComponent)
                this.OverTimeService.getAllOverTime() 
                .subscribe({ 
                  next: (OverTime) => { 
                    this.OverTimes = OverTime;
                    this.filteredOverTimes=OverTime.filter(d=>d.otDay>0 || d.otNight>0 || d.otWeekend>0 || d.otHoliday>0) 
        
                        }, 
                  error(response) { 
                    console.log(response); 
                  }, 
              });
              },
              (error) => {
                console.error(error);
                // If there was an error during deletion, you can show an error message.
                console.log('Failed to delete the OverTime. Please try again later.');
              }
            );
          }
        });
      }
      getStepName(id: string): string {
        const ss = this.steps.find((s) => s.id === id);
        return ss ? ss.description : '';
      }
      
      getGradeName(id: string): string {
        const grade = this.grades.find((g) => g.levelId === id);
        return grade ? grade.description : '';
      }
      getEmployeeName(empId: string): string {  
        const employee = this.Employees.find((g) => g.empId === empId);  
        return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE';  
      } 
      getPositionName(positionId: string): string {
    

        const position = this.Positions.find((position) => position.positionId === positionId);  
        console.log('position  ',position.name)
   
        return position ? position.name  : '';
      }
      getDepartmentName(departmentId: string): string {
        const department = this.departments.find((division) => division.departmentId === departmentId);
        return department ? department.description : '';
      }
    }


