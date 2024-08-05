import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Attendance } from 'app/models/Attendance.model';
import { Employee } from 'app/models/employee.model';
import { AttendanceService } from 'app/service/attendance.service';
import { EmployeeService } from 'app/service/employee.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  buttons = [
    { label: ' Attendance', route: '/attendance' },

  ];
  filteredemployees;
  attSaved:boolean = false;
  searchTerm: string = ''; 
  attendance:boolean
  showAttendanceForm: boolean = false;
  AttendanceSaved:string;
  Attendances:Attendance[]=[]
  employees:Employee[]=[]; 
  selectedEmployee:string
  selectedAttendanceId:string
  employee:Employee
  attendanceUpdate:boolean=false
  filteredAttendances: Attendance[]; // Array to hold filtered attendances
  fromDate: string; // Variable to store the "From" date
  toDate: string;
  isLoading:boolean=false;


  att:Attendance={
    pId:0,
    id: undefined,
    createdBy: '', 
     createdDate: "2023-07-20T13:56:00.062Z", 
     updatedDate: "2023-07-20T13:56:00.062Z", 
     updatedBy: '', 
     empId: "635f3d70-cf5e-49b7-8c2b-9fe69fd3f970",
    late: '2023-07-20T13:56:00.062Z', 
     earl: '2023-07-20T13:56:00.062Z', 
     clockIn: '2023-07-20T13:56:00.062Z', 
     clockOut: '2023-07-20T13:56:00.062Z',
     offDuty: '2023-07-20T13:56:00.062Z',
     onDuty:'2023-07-20T13:56:00.062Z',
     absentDays:0,
     attendanceId:0,
     attendanceStatus:'',
     status:0,
     date: "2023-07-20T13:56:00.062Z",
  timeTable: "",
totalLE:"2023-07-20T13:56:00.062Z",
leaveType:'',
department:"",
normall:0,
realTime:0,
    

}
  uploadSuccessMessage: string = '';
  uploadErrorMessage: string = '';
  selectedFile: File | null = null;

  constructor(private attendanceService: AttendanceService,
    private employeeService:EmployeeService,   
       private snackBar :MatSnackBar) {}
    
    ngOnInit(): void { 
      this.attendanceService.addAtt(this.att)
.subscribe({ 
next:(contacts)=>{
  }
})
this.attendanceService.getAllAttendance().subscribe({
  next: (at) => { 
    // this.leaveRequest.empId = this.selectedEmployee; 
    this.Attendances=at 
    this.filteredAttendances=at
   }, 
  error: (response) => { 
    console.log(response); 
  } 

})

      this.employee = {
        pId: 0, // You can add any specific validation rule here, like Validators.required 
        createdBy: "string",
        createdDate:  "2023-07-25T09:28:33.440Z", 
        updatedDate: "2023-07-25T09:28:33.440Z", 
        updatedBy: 'string', 
        empId: "635f3d70-cf5e-49b7-8c2b-9fe69fd3f970", // You can add any specific validation rule here, like Validators.required 
        ecxId: 'ecx/pi', 
        adId: 'ad/pi', 
        firstName:'', 
        middleName: '', 
        lastName: '',
        joinDate: '2023-07-25T09:28:33.440Z', 
        sex: '', 
        dateOfBityh: '2023-07-25T09:28:33.440Z', 
        placeOfBith: '', 
        martialStatus: '', 
        salutation: '', 
        nationality: '', 
        pensionNo: '', 
        imageData: '', 
        crime: false, 
        crimeDescription: " ", 
        attendanceId:undefined,
        status: 0, 
      };
  
    this.employeeService.getAllEmployees()  
    .subscribe({  
      next: (employees) => { 
        // this.leaveRequest.empId = this.selectedEmployee; 
        this.employees=employees 
        this.filteredemployees=this.employees.filter(emp=>emp.attendanceId==null ||emp.attendanceId=="")
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
    capitalizeFirstLetter(text: string): string {
      if (!text) return text;
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
    filterByDateRange() {
      if (this.fromDate && this.toDate) {
        let fromDate = new Date(this.fromDate);
        let toDate = new Date(this.toDate);
    
        // Subtract one day from the "From" date
        fromDate.setDate(fromDate.getDate() - 1);
    
        this.filteredAttendances = this.Attendances.filter(at => {
          const attendanceDate = new Date(at.date);
                    this.isLoading=true;
          setTimeout(() => {
            this.isLoading= false;
          }, 2000);
        
        

       return  attendanceDate >= fromDate && attendanceDate <= toDate  ;
        });
      } else {
        // If both dates are not selected, show all attendances
        this.filteredAttendances = this.Attendances;
        this.isLoading=false;
        this.attendance=true;
        setTimeout(() => {
          this.attendance= false;
        }, 1000);}}
      
      
    
    
    
    
    
    toggleAttendanceForm() {
      this.showAttendanceForm = !this.showAttendanceForm;
    }
    onEmployeeSelected(){
      this.employeeService.getEmployee(this.selectedEmployee)
.subscribe({
    
  next: (employees) => { 
    
    this.employee=employees;
    this.employee.attendanceId=this.selectedAttendanceId
    
  
  }})
    }
    onSearch() {


      // this.filteredEmployees = this.employees; 
       if (this.searchTerm.trim() ==='') {
    
         this.filteredAttendances = [];
       } else {
      
         this.filteredAttendances = this.Attendances.filter(at => {
          if(at.attendanceId){
            if(at.department){
          var dep=at.department
            }else{
              dep="unknown"
            }
           return (
   
             this.getEmployeeName(at.empId).toLowerCase().startsWith(this.searchTerm.toLowerCase()) 
           ||  at.attendanceId.toString().includes(this.searchTerm) || 
           dep.toLowerCase().startsWith(this.searchTerm.toLowerCase())
             );
           }
           
         });
       }
      
       }
     

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // uploadFile(): void {
  //   if (this.selectedFile) {
  //     console.log('Upload Response:', this.selectedFile);
  //     this.attendanceService.importAttendance(this.selectedFile)
  //       .subscribe(
  //         (response) => {
            
  //           this.uploadSuccessMessage = 'File uploaded successfully.';
  //           this.uploadErrorMessage = '';
  //           console.log('Upload Response:', response);
  //         },
  //         (error) => {
  //           this.uploadErrorMessage = 'Error uploading file. Please try again.';
  //           this.uploadSuccessMessage = '';
  //           console.error('Upload Error:', error);
  //         }
  //       );
  //   } else {
  //     this.uploadErrorMessage = 'Please select a file to upload.';
  //     this.uploadSuccessMessage = '';
  //   }
  // }


  updateEmployee(): void {
console.log(this.employee)
console.log(this.selectedEmployee)
this.employee.attendanceId=this.selectedAttendanceId;
    this.attendanceService.updateAttendance(this.employee,this.selectedEmployee )
    .subscribe({
    
      next: (contact) => { 
        
        this.showSucessMessage('Sucessfully Updated!!');}})
}
getEmployeeName(empId: string): string { 
  const employee = this.employees.find((g) => g.empId === empId); 
  //console.log(employee.firstName)
  return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
}}