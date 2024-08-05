
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActivatedRoute, Router } from '@angular/router';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { EmergencyContact } from 'app/models/emergency-contact.model';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { EmergencyContactService } from 'app/service/emergency-contact.service';
import { EmployeeIdService } from 'app/service/employee-id.service';

@Component({
  selector: 'app-edit-emergencycontact',
  templateUrl: './edit-emergencycontact.component.html',
  styleUrls: ['./edit-emergencycontact.component.scss']
})
export class EditEmergencyContactComponent implements OnInit {
  emergencyContactId: string;
  emergencycontactSaved: boolean = false;
  emergencyContactUpdated: boolean = false;
  emergencyContacts:EmergencyContact[]=[];
  



  constructor(
    private formBuilder: FormBuilder,
    private emergencyContactService: EmergencyContactService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private employeeIdService:EmployeeIdService,
    private snackBar :MatSnackBar
  ) {}
    emergencyContact: EmergencyContact ={
        pId:0,
        id:  undefined,
       createdBy: '', 
         createdDate: "2023-07-20T13:56:00.062Z", 
         updatedDate: "2023-07-20T13:56:00.062Z", 
         updatedBy: '', 
         empId: "",
        region: '', 
         town: '', 
         phoneNumber: '', 
         houseNo:'',
         subCity:'',
         status:0,
         name: "",
         kebele: "",
         relationship: "",
    
    }

  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.emergencyContactId = params['id'];
   
      this.emergencyContactService.getAllEmergencyContact()
      .subscribe({
        next: (emergencycontacts) => {
          // Filter emergency contacts for the current employee
          this.emergencyContacts = emergencycontacts.filter(contact => contact.empId === this.employeeIdService.employeeId);
        },
        error(response) {
          console.log(response);
        },
      });
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

  updateEmergencyContact(): void {
    this.emergencyContactUpdated=true;
    this.emergencyContactService.updateEmergencyContact
    (this.emergencyContact, this.emergencyContact.id)
    .subscribe({
    
      next: (emergencyContact) => {
        this.showSucessMessage('Sucessfully Updated!!')
        this.emergencyContactService.getAllEmergencyContact()
        .subscribe({
          next: (emergencycontacts) => {
            // Filter emergency contacts for the current employee
            this.emergencyContacts = emergencycontacts.filter(contact => contact.empId === this.employeeIdService.employeeId);
          },
          error(response) {
            console.log(response);
          },
        });
      
        this.emergencyContact = {
          pId:0,
          id:  undefined,
         createdBy: '', 
           createdDate: "2023-07-20T13:56:00.062Z", 
           updatedDate: "2023-07-20T13:56:00.062Z", 
           updatedBy: '', 
           empId: "",
          region: '', 
           town: '', 
           phoneNumber: '', 
           houseNo:'',
           subCity:'',
           status:0,
           name: "",
           kebele: "",
           relationship: "",
        };
      },
      error: (response) => {
        console.log(response);
      }
    });

  }
  emergencycontactForm: FormGroup = this.formBuilder.group({
    phoneNumber: ['', Validators.required],
  });
  
  buttons = [
    { label: ' Add Employee ', route: '/employee-registration' },
    { label: '  List Employee ', route: '/employee-list' },
    {label:'Employee History', route:'/history'}
  ];
  editEmergencyContact(emergencyContact: EmergencyContact): void {
    // Here, we will navigate to the edit page for the selected EmergencyContact.
 
    const contactToEdit = this.emergencyContacts.find(contact => contact.id === emergencyContact.id);
    this.emergencyContact = contactToEdit;
  }
  deleteEmergencyContact(EmergencyContact: EmergencyContact): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
 
   dialogRef.afterClosed().subscribe((result) => {
   if (result) {
     // If the user confirms the deletion, we can call the service to delete the EmergencyContact.
     this.emergencyContactService.deleteEmergencyContact(EmergencyContact.id).subscribe(
       () => {
         // EmergencyContact deleted successfully, we can update the list of EmergencyContacts after deletion.
         // Here, we are simply filtering out the deleted EmergencyContact from the EmergencyContacts array.
         this.dialog.open(DeletesucessfullmessageComponent)
         this.emergencyContactService.getAllEmergencyContact()
       .subscribe({
         next: (emergencycontacts) => {
           // Filter emergency contacts for the current employee
           this.emergencyContacts = emergencycontacts.filter(contact => contact.empId === this.employeeIdService.employeeId);
         },
         error(response) {
           console.log(response);
         },
       });
       },
       (error) => {
         console.error(error);
         // If there was an error during deletion, you can show an error message.
         alert('Failed to delete the EmergencyContact. Please try again later.');
       }
     );
   }
 }
 )}
  
 addEmergencyContact() {
  this.emergencyContact.empId = this.employeeIdService.employeeId;
  this.emergencyContactService.addEmergencyContact(this.emergencyContact)
  .subscribe({
    next: (employee) => {
      this.showSucessMessage('Sucessfully Added!!')
      this.emergencyContactService.getAllEmergencyContact()
      .subscribe({
        next: (emergencycontacts) => {
          // Filter emergency contacts for the current employee
          this.emergencyContacts = emergencycontacts.filter(contact => contact.empId === this.employeeIdService.employeeId);
        },
        error(response) {
          console.log(response);
        },
      });
    
      // Add the current work experience to the array
      this.emergencyContacts.push({ ...this.emergencyContact });
      // Reset the form fields

      this.emergencyContact = {
        pId:0,
        id:  undefined,
       createdBy: '', 
         createdDate: "2023-07-20T13:56:00.062Z", 
         updatedDate: "2023-07-20T13:56:00.062Z", 
         updatedBy: '', 
         empId: "",
        region: '', 
         town: '', 
         phoneNumber: '', 
         houseNo:'',
         subCity:'',
         status:0,
         name: "",
         kebele: "",
         relationship: "",
      };
      
    },
 error(response){
  console.log(response)
}
})}
}
