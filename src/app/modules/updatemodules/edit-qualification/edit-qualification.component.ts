import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EducationService } from 'app/service/education.service';
import { WorkExperienceService } from 'app/service/work-experience.service';

import { Education, WorkExperience } from 'app/models/work-experience.model';
import { EducationLevel } from 'app/models/job-description.model';
import { EducationLevelService } from 'app/service/educationlevel.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-qualification',
  templateUrl: './edit-qualification.component.html',
  styleUrls: ['./edit-qualification.component.css']
})
export class EditQualificationComponent implements OnInit {

  educationUpdated: boolean = false;
  workExperienceUpdated: boolean = false;
  educationId: string;
  workExperienceId: string;
  education: Education;
  workExperience: WorkExperience;
  workExperiences: WorkExperience[] = [];
  educations: Education[] = [];
  educationlevels: EducationLevel[] = [];
  selectedEducationLevel: string = '';

  buttons = [
    { label: 'Add Employee', route: "/employee-registration" },
    { label: 'List Employee', route: "/employee-list" },
  ];

  constructor(
    private educationService: EducationService,
    private workExperienceService: WorkExperienceService,
    private route: ActivatedRoute,
    private router: Router,
    private educationlevelservice: EducationLevelService,
    private snackBar :MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.educationId = params['id'].toString();
      this.workExperienceId = params['id'].toString();
      // Get all work experiences
      this.workExperienceService.getAllWorkExperience().subscribe({
        next: (workExperiences) => {
          this.workExperiences = workExperiences;
        },
        error: (response) => {
          console.log(response);
        }
      });
    
      // Get all educations
      this.educationService.getAllEducation().subscribe({
        next: (educations) => {
          this.educations = educations;
        },
        error: (response) => {
          console.log(response);
        }
      });
      // Get the work experience by ID
      if (this.educationId) {
        this.educationService.getEducation(this.educationId).subscribe({
          next: (education) => {
            this.education = education;
        
            this.selectedEducationLevel = education?.eductionName; // Use safe navigation operator
          },
          error: (response) => {
            console.log(response);
          }
        });
      }
  
      // Get the work experience by ID if it exists
      if (this.workExperienceId) {
        this.workExperienceService.getWorkExperience(this.workExperienceId).subscribe({
          next: (workExperience) => {
            this.workExperience = workExperience;
        
          },
          error: (response) => {
            console.log(response);
          }
        });
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
  updateEducation(): void {
    this.educationUpdated = true;

    // Assuming the EducationService has a method to update education
    this.education.eductionName = this.selectedEducationLevel;
    this.educationService.updateEducation(this.education, this.educationId).subscribe({
      next: () => {

      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  updateWorkExperience(): void {
    this.workExperienceUpdated = true;
    // Assuming the WorkExperienceService has a method to update work experience
    this.workExperienceService.updateWorkExperience(this.workExperience, this.workExperienceId).subscribe({
      next: () => {

      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  editEducation(Education: Education): void {
    // Here, we will navigate to the edit page for the selected Education.
    this.router.navigate(['/edit-education', Education.id]);
  }

  deleteEducation(Education: Education): void {
    // Here, we can show a confirmation dialog/modal to confirm the deletion.
    const confirmDelete = confirm('Are you sure you want to delete this Education?');

    if (confirmDelete) {
      // If the user confirms the deletion, we can call the service to delete the Education.
      this.educationService.deleteEducation(this.education.id).subscribe(
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
