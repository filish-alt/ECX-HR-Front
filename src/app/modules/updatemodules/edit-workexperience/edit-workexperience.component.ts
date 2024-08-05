import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkExperience } from 'app/models/work-experience.model';
import { WorkExperienceService } from 'app/service/work-experience.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-edit-workexperience',
  templateUrl: './edit-workexperience.component.html',
  styleUrls: ['./edit-workexperience.component.css']
})
export class EditWorkexperienceComponent {

  workExperienceUpdated: boolean = false;
  workExperienceSaved: boolean = false;

  workExperienceId: string;
  downloadFileUrl: string=''; 
  pdfUrl:string='' 
  FileNull:boolean = false;
  id:string;
  workExperience: WorkExperience = {
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
;
  workExperiences: WorkExperience[] = [];
  selectedEducationLevel: string = '';

  buttons = [
    { label: 'Add Employee', route: "/employee-registration" },
    { label: 'List Employee', route: "/employee-list" },
    {label:'Employee History', route:'/history'}
  ];

  constructor(
    private workExperienceService: WorkExperienceService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private employeeIdService:EmployeeIdService,
    private snackBar :MatSnackBar


  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {

      this.workExperienceId = params['id'].toString();
      // Get all work experiences
      this.workExperienceService.getAllWorkExperience().subscribe({
        next: (workExperience) => {
          this.workExperiences = workExperience.filter(workexperience => workexperience.empId === this.employeeIdService.employeeId);

        },
        error: (response) => {
          console.log(response);
        }
      });

        
      })
    
  }
  selectedFile: File | null = null; 
  onFileSelected(event: any) { 
   
    const file: File = event.target.files[0]; 
    const reader = new FileReader(); 
    reader.onload = () => { 
        const base64String = reader.result.toString().split(',')[1]; // Extract the base64 part 
        this.workExperience.file = base64String; 
    }; 
    reader.readAsDataURL(file); 
  } 
  showSucessMessage(message:string) : void{
    this.snackBar.open(message,'Close',
    {duration:3000,
    
    horizontalPosition:'end',
      verticalPosition:'top',
        panelClass:['cardhead']
      })
      
      }
  fetchAndDisplayPDF(workExperience: WorkExperience): void {
    const workExperienceToEdit = this.workExperiences.find(
      (workExperience) => workExperience.id === workExperience.id
    );

  
    this.workExperienceService.getWorkExperienceFile(workExperienceToEdit.id).subscribe(
      (pdf: Blob) => {
   
        var file = new Blob([pdf], { type: 'application/pdf' });

        this.downloadFileUrl = window.URL.createObjectURL(file);
        window.open(this.downloadFileUrl, '_blank');    
      },
      (error) => {
        this.FileNull=true
        console.error('Error loading PDF:', error);
       this.id= workExperienceToEdit.id
      }
    );
  }
  updateWorkExperience(): void {

    // Assuming the WorkExperienceService has a method to update work experience
    this.workExperienceService.updateWorkExperience(this.workExperience, this.workExperience.id).subscribe({
      next: () => {         this.showSucessMessage('Sucessfully Updated!!')
        this.workExperienceService.getAllWorkExperience().subscribe({
          next: (workExperience) => {
            this.workExperiences = workExperience.filter(workexperience => workexperience.empId === this.employeeIdService.employeeId);
  
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
 
    this.workExperience = {
      pId: 0,
      id: undefined,
 
      createdBy: "",
      createdDate: "2023-07-26T06:13:52.512Z",
      updatedDate: "2023-07-26T06:13:52.512Z",
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
  }

  editWorkExperience(WorkExperience: WorkExperience): void {
    const contactToEdit = this.workExperiences.find(workExperience => workExperience.id === workExperience.id);
    this.workExperience = contactToEdit;
  }

  deleteWorkExperience(workExperience: WorkExperience): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // User confirmed the delete action, proceed with deletion
        this.workExperienceService.deleteWorkExperience(workExperience.id).subscribe(
          () => {
            this.dialog.open(DeletesucessfullmessageComponent)
            this.workExperienceService.getAllWorkExperience().subscribe({
              next: (workExperience) => {
                this.workExperiences = workExperience.filter(workexperience => workexperience.empId === this.employeeIdService.employeeId);
      
              },
              error: (response) => {
                console.log(response);
              }
            });
          },
          (error) => {
            console.error(error);
            // Show an error message to the user (you can use MatSnackBar)
          }
        );
      }
    });
  }
  addWorkExperience() {
    this.workExperience.empId = this.employeeIdService.employeeId;
    this.workExperienceService.addWorkExperience(this.workExperience).subscribe({
      next: () => {
        this.showSucessMessage('Sucessfully Added!!')
        this.workExperienceService.getAllWorkExperience().subscribe({
          next: (workExperience) => {
            this.workExperiences = workExperience.filter(workexperience => workexperience.empId === this.employeeIdService.employeeId);
  
          },
          error: (response) => {
            console.log(response);
          }
        });
        // Add the current work experience to the array
        this.workExperiences.push({ ...this.workExperience });
        // Reset the form fields
        this.workExperience = {
          pId: 0,
          id: undefined,
      
        
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

  }

