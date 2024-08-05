import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-min-nav',
  templateUrl: './min-nav.component.html',
  styleUrls: ['./min-nav.component.scss']
})
export class MinNavComponent implements OnInit {
  buttons = [
    { label: 'Employee List' },
    { label: 'Add Employee' }
    
  ];
  employeeForm: FormGroup; 
  selectedImage: File;
  constructor() { }

  ngOnInit(): void {
    
  }

 
  // openImageDialog(): void {
  //   // Trigger click on the file input element to open the image dialog
  //   const fileInput = document.getElementById('image') as HTMLInputElement;
  //   fileInput.click();
  // }
  // onImageSelected(event: any): void {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.getBase64(file).then((data) => {
  //       this.employeeForm.patchValue({
  //         imageData: data
  //       });
  //     });
  //   }
  // }
  //   private getBase64(file: File): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // }

  
}
