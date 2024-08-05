import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Division, EducationLevel } from 'app/models/job-description.model';
import { Education, WorkExperience,} from 'app/models/work-experience.model';
import { DivisionService } from 'app/service/division.service';
import { EducationService } from 'app/service/education.service';
import { EducationLevelService } from 'app/service/educationlevel.service';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { WorkExperienceService } from 'app/service/work-experience.service';


@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.scss']
})
export class QualificationComponent implements OnInit {
  education: Education;
  workExperience: WorkExperience;
  educationlevels:EducationLevel[]= [];
  selectedEducationLevel: string='';
  
  educationSaved: boolean = false;
  workExperienceSaved: boolean = false;

  divisions: Division[] = [];
  selectedDivision: string = '';
  educations: Education[] = [];
  workExperiences: WorkExperience[] = [];

  buttons = [
    { label: ' Add Employee ', route: "/employee-registration" },
    { label: '  List Employee ', route: "/employee-list" },
  ];

  addWorkExperienceRequest: WorkExperience = {
    pId: 0,
    id: undefined,

    createdBy: "",
    createdDate: "2023-07-26T06:13:52.512Z",
    updatedDate: "2023-07-26T06:13:52.512Z",
    updatedBy: "",
    status: 0,
    empId: "A3C5647E-0A7B-4CB2-A51C-064B23295DD9",
    companyName: "",
    postionHeld: "",
    from: "",
    to: "",
    salary: 0,
    reasonTermination: "",
    file:"",
  };

  addEducationRequest: Education = {
    pId: 0,
    id:undefined,
    createdBy: "",
    createdDate: "2023-07-26T06:13:52.512Z",
    updatedDate: "2023-07-26T06:13:52.512Z",
    updatedBy: "",
    status: 0,
    empId: "A3C5647E-0A7B-4CB2-A51C-064B23295DD9",
    from: '',
    to: "",
    nameOfInstitute: '',
    fieldOfStudy: '',
    eductionName: '',
    file:"",
  };

  constructor(
    private divisionservice: DivisionService,
    private workExperienceService: WorkExperienceService,
    private educationservice: EducationService,
    private router: Router,
    private educationlevelservice:EducationLevelService,
    private employeeIdService: EmployeeIdService,
    private snackBar :MatSnackBar
  ) { }

  ngOnInit(): void {

    this.educationlevelservice.getAllEducationLevels()
.subscribe({
  next: (educationlevels) => {
    this.educationlevels=educationlevels;
  },
  error(response){
    console.log(response)
  }
});
this.educationservice.getAllEducation() 
  .subscribe({ 
    next: (education) => { 
      this.educations = education; 
          }, 
    error(response) { 
      console.log(response); 
    }, 
});
this.workExperienceService.getAllWorkExperience() 
  .subscribe({ 
    next: (workExperience) => { 
      this.workExperiences = workExperience; 
          }, 
    error(response) { 
      console.log(response); 
    }, 
});
  }

  addWorkExperience() {
    this.addWorkExperienceRequest.empId = this.employeeIdService.employeeId;
    this.workExperienceService.addWorkExperience(this.addWorkExperienceRequest).subscribe({
      next: (employee) => {
        this.workExperienceSaved = true;
        setTimeout(() => {
          this.workExperienceSaved = false;
        }, 2000);
        // Add the current work experience to the array
        this.workExperiences.push({ ...this.addWorkExperienceRequest });
        // Reset the form fields
        this.addWorkExperienceRequest = {
          pId: 0,
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      
      
          createdBy: "",
          createdDate: "",
          updatedDate: "",
          updatedBy: "",
          status: 0,
          empId: "",
          companyName: "",
          postionHeld: "",
          from: "",
          to: "",
          salary: 0,
          reasonTermination: "",
          file:"",
        };
      },
      error(response) {
        console.log(response)
      }
    });
  }

  addEducation() {
    this.addEducationRequest.empId = this.employeeIdService.employeeId;
    this.addEducationRequest.eductionName = this.selectedEducationLevel;
    this.educationservice.addEducation(this.addEducationRequest).subscribe({
      next: (employee) => {
        this.showSucessMessage('Sucessfully Added!!')
        // Add the current education to the array
        this.educations.push({ ...this.addEducationRequest });
        // Reset the form fields
        this.addEducationRequest = {
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
  showSucessMessage(message:string) : void{
    this.snackBar.open(message,'Close',
    {duration:3000,
    
    horizontalPosition:'end',
      verticalPosition:'top',
        panelClass:['cardhead']
      })
      
      }
  editEducation(education: Education): void {
    // Here, we will navigate to the edit page for the selected Education.
    this.router.navigate(['/edit-education', education.id]);
  }
  deleteEducation(Education: Education): void {
    // Here, we can show a confirmation dialog/modal to confirm the deletion.
    const confirmDelete = confirm('Are you sure you want to delete this Education?');
  
    if (confirmDelete) {
      // If the user confirms the deletion, we can call the service to delete the Education.
      this.educationservice.deleteEducation(this.education.id).subscribe(
        () => {
          // Education deleted successfully, we can update the list of Educations after deletion.
          // Here, we are simply filtering out the deleted Education from the Educations array.
          this.educations = this.educations.filter((t) => t.id !== this.education.id);
  
          // You can also show a success message to the user.
          alert('Education deleted successfully!');
        },
        (error) => {
          console.error(error);
          // If there was an error during deletion, you can show an error message.
          alert('Failed to delete the Education. Please try again later.');
        }
      );
    }
  }

  editWorkExperience(WorkExperience: WorkExperience): void {
    // Here, we will navigate to the edit page for the selected WorkExperience.
    this.router.navigate(['/edit-workExperience', WorkExperience.id]);
  }
  deleteWorkExperience(WorkExperience: WorkExperience): void {
    // Here, we can show a confirmation dialog/modal to confirm the deletion.
    const confirmDelete = confirm('Are you sure you want to delete this WorkExperience?');
  
    if (confirmDelete) {
      // If the user confirms the deletion, we can call the service to delete the WorkExperience.
      this.workExperienceService.deleteWorkExperience(this.workExperience.id).subscribe(
        () => {
          // WorkExperience deleted successfully, we can update the list of WorkExperiences after deletion.
          // Here, we are simply filtering out the deleted WorkExperience from the WorkExperiences array.
          this.workExperiences = this.workExperiences.filter((t) => t.id !== this.workExperience.id);
  
          // You can also show a success message to the user.
          alert('WorkExperience deleted successfully!');
        },
        (error) => {
          console.error(error);
          // If there was an error during deletion, you can show an error message.
          alert('Failed to delete the WorkExperience. Please try again later.');
        }
      );
    }
  }

}
