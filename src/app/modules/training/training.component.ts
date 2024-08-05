
import { Router } from '@angular/router';
import { Training } from 'app/models/training.model';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { TrainingService } from 'app/service/training.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { Component, OnInit } from '@angular/core';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  trainingSaved: boolean = false;
  trainingUpdated: boolean = false;
  trainings: Training[] = [];
  downloadFileUrl: string=''; 
  pdfUrl:string='' 
  FileNull:boolean = false;
  id:string;

  training: Training = {
    pId: 0,
    id: undefined,
    createdBy: "",
    createdDate: "2023-07-26T06:13:52.512Z",
    updatedDate: "2023-07-26T06:13:52.512Z",
    updatedBy: "",
    status: 0,
    empId: "A3C5647E-0A7B-4CB2-A51C-064B23295DD9",
    typeOfTraining: "",
    from: "",
    to: "",
    file:'',
  
  };
 

  buttons = [
    { label: ' Add Employee ', route: '/employee-registration' },
    { label: '  List Employee ', route: '/employee-list' },
    {label:'Employee History', route:'/history'}
  ];
  constructor(
    private dialog: MatDialog ,
    private trainingService: TrainingService,
    private employeeIdService: EmployeeIdService,
    private router: Router,
    private snackBar :MatSnackBar) { }

  ngOnInit(): void {
    this.trainingService.getAllTraining() 
    .subscribe({ 
      next: (training) => { 
        this.trainings = training.filter(training => training.empId === this.employeeIdService.employeeId);

            }, 
      error(response) { 
        console.log(response); 
      }, 
  });

  }
    fetchAndDisplayPDF(training: Training): void {
    const trainingToEdit = this.trainings.find(
      (trainin) => trainin.id === training.id
    );

  
    this.trainingService.getTrainingFile(trainingToEdit.id).subscribe(
      (pdf: Blob) => {
   
        var file = new Blob([pdf], { type: 'application/pdf' });

        this.downloadFileUrl = window.URL.createObjectURL(file);
        window.open(this.downloadFileUrl, '_blank');    
      },
      (error) => {
        this.FileNull=true
        console.error('Error loading PDF:', error);
       this.id= trainingToEdit.id
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
  addTraining() {
    this.training.empId = this.employeeIdService.employeeId;
    this.trainingService.addTraining(this.training)
    .subscribe({
      next: (employee) => {
        this.showSucessMessage('Sucessfully Added!!')
      this.trainingService.getAllTraining() 
      .subscribe({ 
        next: (training) => { 
          this.trainings = training.filter(training => training.empId === this.employeeIdService.employeeId);
  
              }, 
        error(response) { 
          console.log(response); 
        }, 
    });
        // Add the current work experience to the array
        this.trainings.push({ ...this.training });
        // Reset the form fields
        this.training = {
          pId: 0,
          id: undefined,
          createdBy: "",
          createdDate: "2023-07-26T06:13:52.512Z",
          updatedDate: "2023-07-26T06:13:52.512Z",
          updatedBy: "",
          status: 0,
          empId: "A3C5647E-0A7B-4CB2-A51C-064B23295DD9",
          typeOfTraining: "",
          from: "",
          to: "",
          file:'',
        };
      },
      error(response) {
        console.log(response)
      }
    });
  }

  updateTraining(): void {
    this.trainingService.updateTraining(this.training,this.training.id).subscribe(
      () => {          this.showSucessMessage('Sucessfully Updated!!')
 
        this.trainingService.getAllTraining() 
        .subscribe({ 
          next: (training) => { 
            this.trainings = training.filter(training => training.empId === this.employeeIdService.employeeId);
    
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
    this.training = {
      pId: 0,
      id: undefined,
      createdBy: "",
      createdDate: "2023-07-26T06:13:52.512Z",
      updatedDate: "2023-07-26T06:13:52.512Z",
      updatedBy: "",
      status: 0,
      empId: " ",
      typeOfTraining: "",
      from: "",
      to: "",
      file:'',
    
    };
  }
  selectedFile: File | null = null; 
  onFileSelected(event: any) { 
   
    const file: File = event.target.files[0]; 
    const reader = new FileReader(); 
    reader.onload = () => { 
        const base64String = reader.result.toString().split(',')[1]; // Extract the base64 part 
        this.training.file = base64String; 
    }; 
    reader.readAsDataURL(file); 
  } 
  editTraining(training: Training): void {
    const contactToEdit = this.trainings.find(training => training.id === training.id);
    this.training = contactToEdit;
  }
  deleteTraining(training: Training): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '300px', // Set the desired width of the dialog
      data: { message: 'Are you sure you want to delete this training?' } // Pass any data you want to the delete confirmation component
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // The result will be true if the user confirmed the deletion, otherwise false
      if (result === true) {
        // If the user confirmed the deletion, you can proceed with the delete logic here
        this.trainingService.deleteTraining(training.id).subscribe(
          () => {
            this.dialog.open(DeletesucessfullmessageComponent)
            this.trainingService.getAllTraining() 
            .subscribe({ 
              next: (training) => { 
                this.trainings = training.filter(training => training.empId === this.employeeIdService.employeeId);
        
                    }, 
              error(response) { 
                console.log(response); 
              }, 
          });
          },
          (error) => {
            console.error(error);
            // If there was an error during deletion, you can show an error message.
            console.log('Failed to delete the training. Please try again later.');
          }
        );
      }
    });
  }
  
}
