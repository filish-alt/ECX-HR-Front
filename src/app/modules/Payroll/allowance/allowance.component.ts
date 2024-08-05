import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { AllowanceType } from 'app/models/Payroll/DeductionType.model';
import { Allowance } from 'app/models/Payroll/payroll.model';
import { Department } from 'app/models/education.model';
import { Division, Grade, Position, Step } from 'app/models/job-description.model';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { AllowanceTypeService } from 'app/service/allowance-type.service';
import { AllowanceService } from 'app/service/allowance.service';
import { DepartmentService } from 'app/service/department.service';
import { DivisionService } from 'app/service/division.service';
import { GradeService } from 'app/service/grade.service';
import { PositionService } from 'app/service/position.service';
import { StepService } from 'app/service/step.service';


@Component({
  selector: 'app-allowance',
  templateUrl: './allowance.component.html',
  styleUrls: ['./allowance.component.css']
})
export class AllowanceComponent {
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
  searchTerm:string;
  filteredAllowance:Allowance[]=[]
  steps:Step[];
  selectedStep:string;
  selectedDivision:string;
  selectedAllowanceTypeName:string;
  showAllowanceForm: boolean = false;
 AllowanceForm: FormGroup;
  Allowances: Allowance[]=[];
  AllowanceTypes: AllowanceType[]=[];
  selectedPositionDepartment:string;
  departments:Department[]=[]
  selectedPosition:string=''
  selectedDepartment:string='';
  Positions:Position[]= [];
  divisions:Division[]= [];
  grades:Grade[]=[];
  formBuilder: any;
  selectedGrade:string
  selectedAllowanceType:string;
  AllowanceSaved: boolean = false;
  AllowanceUpdated: boolean = false;

  Allowance: Allowance = { 
    createdBy: "",
    createdDate: "2023-07-26T06:13:52.512Z",
    updatedDate:"2023-07-26T06:13:52.512Z",
    updatedBy:"",
    pId: 0,
    id:undefined,
    allowanceType: "",
    status: 0,
    position: "",
    grade:"",
    step: "",
    rate: 0,
    ratePercent: 0,
    amount:0
    }


  constructor(
    private AllowanceService: AllowanceService,
    private AllowanceTypeService: AllowanceTypeService,
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
      this.stepservice.getAllStep()
      .subscribe({
        next: (steps) => {
          this.steps=steps
        },
        error(response){
          console.log(response)
        }
      });
      this.gradeservice.getAllGrade()
      .subscribe({
        next: (gg) => {
          this.grades=gg  },
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
   
    
      this.AllowanceService.getAllAllowance().subscribe({
        next: (dd) => { 
          // this.Allowance.empId = this.selectedPosition; 
          this.Allowances=dd 
          this.filteredAllowance=dd
         }, 
        error: (response) => { 
          console.log(response); 
        } 
      
      })

    this.AllowanceTypeService.getAllAllowanceType().subscribe({
      next: (dd) => { 
        // this.Allowance.empId = this.selectedPosition; 
        this.AllowanceTypes=dd 
       }, 
      error: (response) => { 
        console.log(response); 
      } 
    
    })
  }
  toggleAllowanceForm() {
    this.showAllowanceForm =  !this.showAllowanceForm;
    console.log("huh", this.showAllowanceForm )
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
  onSearch() {
    // this.filteredEmployees = this.employees; 
       if (this.searchTerm.trim() ==='') {
    
         this.filteredAllowance =this.Allowances;
       } else {
      
         this.filteredAllowance = this.Allowances.filter(at => {
   
           return (
              this.getPositionName(at.position).toLowerCase().startsWith(this.searchTerm.toLowerCase()) ||
              this.getAllowanceTypeName(at.allowanceType).toLowerCase().startsWith(this.searchTerm.toLowerCase()) 
              );
           
           
         });
       }
      
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
onAllowanceselected(){
  
  this.selectedAllowanceTypeName=this.getAllowanceTypeName(this.selectedAllowanceType);
  console.log("nn",this.selectedAllowanceType)
}

getSupervisorName(positionId: string): string {
  const position = this.Positions.find((position) => position.positionId === positionId);
  return position ? position.name : '';
}
 
getAllowanceTypeName(AllowancetypeId: string): string { 
  const AllowanceType = this.AllowanceTypes.find((Allowance) => Allowance.id === AllowancetypeId); 
  return AllowanceType ? AllowanceType.name : ''; 
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
   
      addAllowance(){
  
        this.Allowance.allowanceType=this.selectedAllowanceType
        this.Allowance.grade=this.selectedGrade
        this.Allowance.position=this.selectedPosition
        this.Allowance.step=this.selectedStep
     
     this.AllowanceService.addAllowance(this.Allowance)
       .subscribe({
       next:(All)=>{
        this.showSucessMessage('Sucessfully Added!!')
         this.Allowances.push({ ...this.Allowance });
   
         this.Allowance = { 
          createdBy: "",
          createdDate: "2023-07-26T06:13:52.512Z",
          updatedDate:"2023-07-26T06:13:52.512Z",
          updatedBy:"",
          pId: 0,
          id: undefined,
          allowanceType: "",
          status: 0,
          position: "",
          grade:"",
          step: "",
          rate: 0,
          ratePercent: 0,
          amount:0
          
  
          
       
         };
       },
        error(response){
         console.log(response)
       }
       })}

       updateAllowance(): void {
        this.AllowanceService.updateAllowance(this.Allowance,this.Allowance.id).subscribe(
          () => {         
              this.showSucessMessage('Sucessfully Updated!!')
            this.AllowanceService.getAllAllowance() 
            .subscribe({ 
              next: (Allowance) => { 
                this.Allowances = Allowance;
                this.filteredAllowance =Allowance
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
        this.Allowance = {
          createdBy: "",
          createdDate: "2023-07-26T06:13:52.512Z",
          updatedDate:"2023-07-26T06:13:52.512Z",
          updatedBy:"",
          pId: 0,
          id: undefined,
          allowanceType: "",
          status: 0,
          position: "",
          grade:"",
          step: "",
          rate: 0,
          ratePercent: 0,
          amount:0
        
        };
       }

       editAllowance(Allowance: Allowance): void {
        const contactToEdit = this.Allowances.find(Allowance => Allowance.id === Allowance.id);
        this.Allowance = contactToEdit;
      }
      deleteAllowance(Allowance: Allowance): void {
        const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
          width: '300px', // Set the desired width of the dialog
          data: { message: 'Are you sure you want to delete this Allowance?' } // Pass any data you want to the delete confirmation component
        });
      
        dialogRef.afterClosed().subscribe(result => {
          // The result will be true if the user confirmed the deletion, otherwise false
          if (result === true) {
            // If the user confirmed the deletion, you can proceed with the delete logic here
            this.AllowanceService.deleteAllowance(Allowance.id).subscribe(
              () => {
                this.dialog.open(DeletesucessfullmessageComponent)
                this.AllowanceService.getAllAllowance() 
                .subscribe({ 
                  next: (Allowance) => { 
                    this.Allowances = Allowance;
                    this.filteredAllowance=Allowance;
            
                        }, 
                  error(response) { 
                    console.log(response); 
                  }, 
              });
              },
              (error) => {
                console.error(error);
                // If there was an error during deletion, you can show an error message.
                console.log('Failed to delete the Allowance. Please try again later.');
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
    }


