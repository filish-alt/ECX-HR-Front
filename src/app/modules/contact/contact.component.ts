
import { Route, Router } from '@angular/router';
import { Contact } from 'app/models/contact.model';
import { ContactService } from 'app/service/contact.service';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { PidService } from 'app/service/pid.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { error } from 'jquery';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, filter } from 'rxjs';
import { EmployeeService } from 'app/service/employee.service';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contacts:Contact[]=[];

  contactSaved:boolean=false;
  contactUpdate:boolean=false;
  contact:Contact={
    pId:0,
    id: undefined,
    createdBy: '', 
     createdDate: "2023-07-20T13:56:00.062Z", 
     updatedDate: "2023-07-20T13:56:00.062Z", 
     updatedBy: '', 
     empId: "",
    region: '', 
     town: '', 
     phoneNumber: '', 
     email: '',
     postCode: 0,
     houseNo:'',
     Kebele:'',
     woreda:'',
     subCity:'',
     status:0,
    

}
constructor(
  private formBuilder: FormBuilder,
  private pIdservice: PidService, 
  private contactservice: ContactService,
  private employeeIdService: EmployeeIdService,
  //private employeeService: EmployeeService,
  private dialog:MatDialog,
  private snackBar :MatSnackBar,
  private router:Router){}
  subscription: Subscription;

contactForm: FormGroup = this.formBuilder.group({
  phoneNumber: ['', Validators.required],
  
});

buttons = [
  { label: ' Add Employee ', route: '/employee-registration' },
  { label: '  List Employee ', route: '/employee-list' },
  {label:'Employee History', route:'/history'}
];
ngOnInit():void {

this.contactservice.getAllContacts()
.subscribe({
  next: (contacts) => {
    // Filter emergency contacts for the current employee
    this.contacts = contacts.filter(contact => contact.empId === this.employeeIdService.employeeId);
  },
  error(response) {
    console.log(response);
  },
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
addContact(){
  // if (this.contactForm.invalid) {
  //   this.contactForm.markAllAsTouched();

  this.contact.empId = this.employeeIdService.employeeId;
  console.log(this.contact)
this.contactservice.addContact(this.contact)
.subscribe({ 
next:(contacts)=>{
  this.showSucessMessage('Sucessfully Added!!')
  this.contacts.push({ ...this.contact });
  // Reset the form fields
  this.contact = {
    pId:0,
        id:undefined,
        status:0,
        region: '',
        town: '',
        subCity: '',
        woreda: '',
        Kebele: '',
        houseNo: '',
        postCode: 0,
        phoneNumber: '',
         updatedDate: "2023-07-20T13:56:00.062Z", 
         updatedBy: '', 
         empId: "",
         email: '',
  };



  
  this.contactservice.getAllContacts()
  .subscribe({
    next: (contacts) => {
      // Filter emergency contacts for the current employee
      this.contacts = contacts.filter(contact => contact.empId === this.employeeIdService.employeeId);
    },
    error(response) {
      console.log(response);
    },
  });

},
 error(response){
  console.log(response)
}
})}

editContact(contact: Contact): void {
  const contactToEdit = this.contacts.find(contact => contact.id === contact.id);
  this.contact = contactToEdit;
}


updateContact(): void {

   
  this.contactservice.updateContact(this.contact, this.contact.id)
  .subscribe({
  
    next: (contact) => { 
      
      this.showSucessMessage('Sucessfully Updated!!')

      this.contactservice.getAllContacts()
      .subscribe({
        next: (contacts) => {
          // Filter emergency contacts for the current employee
          this.contacts = contacts.filter(contact => contact.empId === this.employeeIdService.employeeId);
        },
        error(response) {
          console.log(response);
        },
      });
          this.contact = {
            pId:0,
            id:undefined,
            status:0,
            region: '',
            town: '',
            subCity: '',
            woreda: '',
            Kebele: '',
            houseNo: '',
            postCode: 0,
            phoneNumber: '',
             updatedDate: "2023-07-20T13:56:00.062Z", 
             updatedBy: '', 
             empId: " ",
             email: '',
          };
      },
      error: (response) => {
        console.log(response);
      }
    });
  
}



deleteContact(Contact: Contact): void {
  const dialogRef = this.dialog.open(DeleteConfirmationComponent);

  dialogRef.afterClosed().subscribe((result) => {


  if (result) {
    // If the user confirms the deletion, we can call the service to delete the Contact.
    this.contactservice.deleteContact(Contact.id).subscribe(
      () => {
        this.dialog.open(DeletesucessfullmessageComponent)
        this.contactservice.getAllContacts()
        .subscribe({
          next: (contacts) => {
            // Filter emergency contacts for the current employee
            this.contacts = contacts.filter(contact => contact.empId === this.employeeIdService.employeeId);
          },
          error(response) {
            console.log(response);
          },
        });
      
      },
      (error) => {
        console.error(error);
        // If there was an error during deletion, you can show an error message.
        alert('Failed to delete the Contact. Please try again later.');
      }
    );
  }
})}
}

