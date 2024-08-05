
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmergencyContact } from 'app/models/emergency-contact.model';
import { EmergencyContactService } from 'app/service/emergency-contact.service';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { PidService } from 'app/service/pid.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-emergencycontact',
  templateUrl: './emergencycontact.component.html',
  styleUrls: ['./emergencycontact.component.scss']
})
export class EmergencycontactComponent implements OnInit {
  emergencycontactSaved: boolean = false;
  emergencycontacts: EmergencyContact[] = []; 
  emergencyContactUpdated:boolean=false;
  emergencycontact:EmergencyContact={
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
constructor(
  private formBuilder: FormBuilder,
  private emergencycontactservice: EmergencyContactService,
  private employeeIdService: EmployeeIdService,
  private dialog: MatDialog,
  private router:Router,
  private snackBar :MatSnackBar){}
ngOnInit():void {
  this.emergencycontactservice.getAllEmergencyContact()
      .subscribe({
        next: (emergencycontacts) => {
          // Filter emergency contacts for the current employee
          this.emergencycontacts = emergencycontacts.filter(contact => contact.empId === this.employeeIdService.employeeId);
        },
        error(response) {
          console.log(response);
        },
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
showSucessMessage(message:string) : void{
  this.snackBar.open(message,'Close',
  {duration:3000,
  
  horizontalPosition:'end',
    verticalPosition:'top',
      panelClass:['cardhead']
    })
    
    }
addEmergencyContact() {
  this.emergencycontact.empId = this.employeeIdService.employeeId;
  this.emergencycontactservice.addEmergencyContact(this.emergencycontact)
  .subscribe({
    next: (emergencycontacts) => {

      this.showSucessMessage('Sucessfully Added!!')
      
      this.emergencycontactservice.getAllEmergencyContact()
      .subscribe({
        next: (emergencycontacts) => {
          // Filter emergency contacts for the current employee
          this.emergencycontacts = emergencycontacts.filter(contact => contact.empId === this.employeeIdService.employeeId);
        },
        error(response) {
          console.log(response);
        },
      });
    
      // Add the current work experience to the array
      this.emergencycontacts.push({ ...this.emergencycontact });
      // Reset the form fields
      this.emergencycontact = {
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


updateEmergencyContact(): void {
  this.emergencyContactUpdated=true;
  this.emergencycontactservice.updateEmergencyContact
  (this.emergencycontact, this.emergencycontact.id)
  .subscribe({
  
    next: (emergencyContact) => {
      this.showSucessMessage('Sucessfully Updated!!')
      this.emergencycontactservice.getAllEmergencyContact()
      .subscribe({
        next: (emergencycontacts) => {
          // Filter emergency contacts for the current employee
          this.emergencycontacts = emergencycontacts.filter(contact => contact.empId === this.employeeIdService.employeeId);
        },
        error(response) {
          console.log(response);
        },
      });
    
      this.emergencycontact = {
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


editEmergencyContact(emergencyContact: EmergencyContact): void {
  // Here, we will navigate to the edit page for the selected EmergencyContact.

  const contactToEdit = this.emergencycontacts.find(contact => contact.id === emergencyContact.id);
  this.emergencycontact = contactToEdit;
}
deleteEmergencyContact(EmergencyContact: EmergencyContact): void {
   const dialogRef = this.dialog.open(DeleteConfirmationComponent);

  dialogRef.afterClosed().subscribe((result) => {
  if (result) {
    // If the user confirms the deletion, we can call the service to delete the EmergencyContact.
    this.emergencycontactservice.deleteEmergencyContact(EmergencyContact.id).subscribe(
      () => {
        // EmergencyContact deleted successfully, we can update the list of EmergencyContacts after deletion.
        // Here, we are simply filtering out the deleted EmergencyContact from the EmergencyContacts array.
        this.dialog.open(DeletesucessfullmessageComponent)
        this.emergencycontactservice.getAllEmergencyContact()
      .subscribe({
        next: (emergencycontacts) => {
          // Filter emergency contacts for the current employee
          this.emergencycontacts = emergencycontacts.filter(contact => contact.empId === this.employeeIdService.employeeId);
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
)}}
