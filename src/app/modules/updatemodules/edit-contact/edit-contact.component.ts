
import { ContactService } from 'app/service/contact.service';
import { Contact } from 'app/models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  
  contacts:Contact[]=[]
  contactId: string;
  contactUpdate: boolean =false
  contactSaved:boolean=false

  buttons = [
    { label: ' Add Employee ', route: '/employee-registration' },
    { label: '  List Employee ', route: '/employee-list' },
    {label:'Employee History', route:'/history'}
  ];

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private employeeIdService:EmployeeIdService,
    private snackBar :MatSnackBar
  ) {}
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
  ngOnInit(): void {
 
   
    this.route.params.subscribe((params) => {
      this.contactId = params['id'];
   
    this.contactService.getAllContacts() 
    .subscribe({ 
      next: (contacts) => { 
        this.contacts =contacts.filter(con => con.empId === this.employeeIdService.employeeId);

            }, 
      error(response) { 
        console.log(response); 
      }, })
    });
  }
  contactForm: FormGroup = this.formBuilder.group({
    phoneNumber: ['', Validators.required],
    
  });
  updateContact(): void {

   
    this.contactService.updateContact(this.contact, this.contact.id)
    .subscribe({
    
      next: (contact) => { 
        this.showSucessMessage('Sucessfully Updated!!')


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
  showSucessMessage(message:string) : void{
    this.snackBar.open(message,'Close',
    {duration:3000,
    
    horizontalPosition:'end',
      verticalPosition:'top',
        panelClass:['cardhead']
      })
      
      }
  editContact(Contact: Contact): void {
    // Here, we will navigate to the edit page for the selected Contact.
    const contactToEdit = this.contacts.find(contact => contact.id === contact.id);
    this.contact = contactToEdit;
  }
  deleteContact(Contact: Contact): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
  
    dialogRef.afterClosed().subscribe((result) => {
  
  
    if (result) {
      // If the user confirms the deletion, we can call the service to delete the Contact.
      this.contactService.deleteContact(Contact.id).subscribe(
        () => {
          this.dialog.open(DeletesucessfullmessageComponent)
          this.contactService.getAllContacts()
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

  addContact(){
    // if (this.contactForm.invalid) {
    //   this.contactForm.markAllAsTouched();
    this.contact.empId = this.employeeIdService.employeeId;
  this.contactService.addContact(this.contact)  
  .subscribe({ 
  next:(contacts)=>{
   
    this.showSucessMessage('Sucessfully Added!!')
        // Add the current work experience to the array
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
  
  
  },
   error(response){
    console.log(response)
  }
  })}
}