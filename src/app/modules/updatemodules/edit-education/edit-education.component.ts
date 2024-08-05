import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { EducationLevel } from 'app/models/job-description.model';
import { Education } from 'app/models/work-experience.model';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { EducationService } from 'app/service/education.service';
import { EducationLevelService } from 'app/service/educationlevel.service';
import { EmployeeIdService } from 'app/service/employee-id.service';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css']
})
export class EditEducationComponent {
  educationUpdated: boolean = false;
  educationSaved:boolean = false;
  educationId: string; 
  downloadFileUrl: string=''; 
  pdfUrl:string='' 
  FileNull:boolean = false;
  id:string;
  education: Education = {
    pId: 0,
    id:undefined,
    createdBy: "",
    createdDate: "2023-07-26T06:13:52.512Z",
    updatedDate: "2023-07-26T06:13:52.512Z",
    updatedBy: "",
    status: 0,
    empId: undefined,
    from: '',
    to: "",
    nameOfInstitute: '',
    fieldOfStudy: '',
    eductionName: '',
    file:"",
  };
  educations: Education[] = [];
  educationlevels: EducationLevel[] = [];
  selectedEducationLevel: string = '';

  buttons = [
    { label: 'Add Employee', route: "/employee-registration" },
    { label: 'List Employee', route: "/employee-list" },
    {label:'Employee History', route:'/history'}
  ];

  constructor(
    private educationService: EducationService,
    private dialog: MatDialog,

    private route: ActivatedRoute,
    private router: Router,
    private educationlevelservice: EducationLevelService,
    private employeeIdService:EmployeeIdService,
    private snackBar :MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.educationId = params['id'];
      

      // Get the work experience by ID

    
      })
      this.educationlevelservice.getAllEducationLevels()
      .subscribe({
        next: (educationlevels) => {
          this.educationlevels=educationlevels;
        },
        error(response){
          console.log(response)
        }
      });
      // Get the work experience by ID if it exists

       // Get all educations
       this.educationService.getAllEducation().subscribe({
        next: (educations) => {
          this.educations = educations.filter(education => education.empId === this.employeeIdService.employeeId);
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
        this.education.file = base64String; 
    }; 
    reader.readAsDataURL(file); 
  } 
  fetchAndDisplayPDF(education: Education): void {
    const EducationToEdit = this.educations.find(
      (educatio) => educatio.id === education.id
    );

  
    this.educationService.getEducationFile(EducationToEdit.id).subscribe(
      (pdf: Blob) => {
   
        var file = new Blob([pdf], { type: 'application/pdf' });

        this.downloadFileUrl = window.URL.createObjectURL(file);
        window.open(this.downloadFileUrl, '_blank');    
      },
      (error) => {
        this.FileNull=true
        console.error('Error loading PDF:', error);
       this.id= EducationToEdit.id
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
  updateEducation(): void { 
    console.log(this.education)
   
    this.education.eductionName = this.selectedEducationLevel;
    this.educationService.updateEducation(this.education, this.education.id).subscribe({
      next: () => {
        this.educationUpdated = true;
        setTimeout(() => {
  this.educationUpdated = false;
        }, 
        )
        this.educationService.getAllEducation().subscribe({
          next: (educations) => {
            this.educations = educations.filter(education => education.empId === this.employeeIdService.employeeId);
            ;
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
    this.education= {
      pId: 0,
      id:undefined,
      createdBy: "",
      createdDate: "2023-07-26T06:13:52.512Z",
      updatedDate: "2023-07-26T06:13:52.512Z",
      updatedBy: "",
      status: 0,
      empId: undefined,
      from: '',
      to: "",
      nameOfInstitute: '',
      fieldOfStudy: '',
      eductionName: '',
      file:"",
    };
  }

  getEducationName(educationLevelId: string): string {
    const educationLevel = this.educationlevels.find((educationLevel) => educationLevel.id === educationLevelId);
    return educationLevel ? educationLevel.educationName : '';
  }


  editEducation(education: Education): void {
    const educationToEdit = this.educations.find(education => education.id === education.id);
    this.education = educationToEdit;
    this.selectedEducationLevel=educationToEdit.eductionName
  }

  deleteEducation(Education: Education): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
      this.educationService.deleteEducation(Education.id).subscribe(
        () => {
         
          this.dialog.open(DeletesucessfullmessageComponent)
          this.educationService.getAllEducation().subscribe({
            next: (educations) => {
              this.educations = educations.filter(education => education.empId === this.employeeIdService.employeeId);
              ;
            },
            error: (response) => {
              console.log(response);
            }
          });
        },
        (error) => {
          console.error(error);
          // If there was an error during deletion, you can show an error message.
         // alert('Failed to delete the Education. Please try again later.');
        }
        );
      }
    });
  }
  addEducation() {
    this.education.empId = this.employeeIdService.employeeId;
    this.education.eductionName = this.selectedEducationLevel;
    this.educationService.addEducation(this.education).subscribe({
      next: (employee) => {
        this.educationSaved = true;
      //  this.router.navigate(['/employee-registration/work-experience']); 
        setTimeout(() => {
          this.educationSaved = false;
        }, 2000);
        this.educationService.getAllEducation().subscribe({
          next: (educations) => {
            this.educations = educations.filter(education => education.empId === this.employeeIdService.employeeId);
            ;
          },
          error: (response) => {
            console.log(response);
          }
        });
        // Add the current education to the array
        this.educations.push({ ...this.education });
        // Reset the form fields
        this.education = {
          pId: 0,
          id: undefined,
          createdBy: "",
          createdDate: "2023-07-25T14:10:21.467Z",
          updatedDate: "2023-07-25T14:10:21.467Z",
          updatedBy: "",
          status: 0,
          empId: "EED0DACB-73D6-4CC9-9526-269A2921106E",
          from: '',
          to: "",
          nameOfInstitute: '',
          fieldOfStudy: '',
          eductionName: '',
          file:"",
        };
      },
      error(response) {
        console.log(response)
      }
    });
  }

  }
