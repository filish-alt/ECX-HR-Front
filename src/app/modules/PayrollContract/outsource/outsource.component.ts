import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Outsource } from 'app/models/Payroll/contract.model';
import { OutsourceService } from 'app/service/outsource.service';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-outsource',
  templateUrl: './outsource.component.html',
  styleUrls: ['./outsource.component.css']
})
export class OutsourceComponent {
  fromDate:string;
  toDate:string;
  selectedMonthStatus:string;
  selectedYear:number;
  outsources:boolean=false;
years:number[]=[];
  selectedMonth:string
  searchTerm:string;
  end:string;
  isLoading:boolean=false;
  selectedOutsourceLevel: string='';
  OutsourceUpdated:boolean=false;
  OutsourceSaved: boolean = false;
  workExperienceSaved: boolean = false;
  downloadFileUrl: string=''; 
  pdfUrl:string='' 
  FileNull:boolean = false;
  id:string;
  Outsources: Outsource[] = [];
  filteredOutsources: Outsource[] = [];

  buttons = [
    { label: ' Monthly Payroll', route: '/payroll' },
    { label: ' Payroll', route: '/payroll/mainPayroll' },

    { label: ' Allowance', route: '/payroll/allowance' },
    { label: ' OverTime', route: '/payroll/overtime' },
    { label: ' Deduction', route: '/payroll/deduction' },
    
    { label: ' OtherPayroll', 
    dropdownOptions: [
   { label: ' Outsource', route: '/payroll/outsource' },
    { label: ' Contract', route: '/payroll/contract' },
   
    ]
   },    
    { label: ' Report', route: '/payroll/report' },

  ];
  selectedFile: File | null = null; 
  onFileSelected(event: any) { 
   
    const file: File = event.target.files[0]; 
    const reader = new FileReader(); 
    reader.onload = () => { 
        const base64String = reader.result.toString().split(',')[1]; // Extract the base64 part 
        this.Outsource.file = base64String; 
    }; 
    reader.readAsDataURL(file); 
  } 



  Outsource: Outsource = {
    pId: 0,
    id:undefined,
    createdBy: "",
    createdDate: "2023-07-26T06:13:52.512Z",
    updatedDate: "2023-07-26T06:13:52.512Z",
    updatedBy: "",
    status: 0,
    amount: 0,
    date: "",
    remark: '',
    file:'',
  };

  constructor(

    private Outsourceservice: OutsourceService,
    private router: Router,
    private employeeIdService: EmployeeIdService,
    private dialog: MatDialog,
    private snackBar :MatSnackBar
  ) {  this.generateYears(); }

  ngOnInit(): void {
    this.isLoading=true;
     console.log("out", this.Outsources);


    this.Outsourceservice.getAllOutsource().subscribe({
      next: (ot) => {
        this.Outsources = ot;
        this.filteredOutsources = ot
        console.log( "in",this.Outsources);
        this.isLoading=false;
      
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

getMonth(st:string){
 const stt=new Date(st)
  this.end=new Intl.DateTimeFormat('en-US',{month:'long'}).format(new Date (2022,stt.getMonth()-1,1));
 return this.end;
}

getYear(st:string){
  const stt=new Date(st)
const year=stt.getFullYear();
  return year;
 }
 
 filterByMonth() {
  this.selectedYear
  this.selectedMonthStatus=this.selectedMonth;
  if (true) {
    this.filteredOutsources = this.Outsources.filter(p => {
      const PayRollDate = new Date(p.date);
      const PayRollEndDate = new Date(p.date);
                this.isLoading=true;
      setTimeout(() => {
        this.isLoading= false;
      }, 2000);

var re=( this.getMonth(p.date) == this.selectedMonth)
      && PayRollDate.getFullYear() == this.selectedYear
console.log(" PayRollEndDate.getMonth().toString()", this.getMonth(p.date))
   
             return re    ;
    }
    );
    if(this.filteredOutsources.length==0){

      this.isLoading= false;
      
      this.outsources=true;
      setTimeout(() => {
      this.outsources= false;
      }, 2000);}  


  } else {
    
    this.isLoading=false;
}

  }
  generateYears(){
    const currentyear= new Date().getFullYear();
    const startyear=2000;

    for(let year=currentyear; year >= startyear; year--){
      this.years.push(year);
      console.log("years",this.years)
    }
  }
onSearch() {


  
    // this.filteredEmployees = this.employees; 
     if (this.searchTerm.trim() ==='') {
      var allpayroll=this.Outsources.map(d =>new Date( d.date)
      )
     
      ;
    const sorted=allpayroll.sort((a,b)=>b.getMonth()- a.getMonth())
    
    const sortedAll =sorted.sort((a, b)=> a.getFullYear()-b.getFullYear())
    
          const currentDate =new Date();
      const start =sortedAll.find(d => d < currentDate)
  this.end=start.getMonth().toString();
       this.filteredOutsources =this.Outsources;
     } else {
    
       this.filteredOutsources = this.Outsources.filter(at => {
  
         return (this.end="",
             this.getMonth(at.date).toLowerCase().includes(this.searchTerm.toLowerCase()) 
            );
         
         
       });
     }
    
     }
  addOutsource() {
 
    this.Outsourceservice.addOutsource(this.Outsource).subscribe({
      next: (employee) => {
        console.log("sss")
      //  this.router.navigate(['/employee-registration/work-experience']); 

      this.showSucessMessage('Sucessfully Added!!')
        this.Outsourceservice.getAllOutsource().subscribe({
          next: (Outsources) => {
            this.Outsources = Outsources    ;
          },
          error: (response) => {
            console.log(response);
          }
        });
        // Add the current Outsource to the array
        this.Outsources.push({ ...this.Outsource });
        // Reset the form fields
        this.Outsource = {
          pId: 0,
          id:undefined,
          createdBy: "",
          createdDate: "2023-07-26T06:13:52.512Z",
          updatedDate: "2023-07-26T06:13:52.512Z",
          updatedBy: "",
          status: 0,
          amount: 0,
          date: "",
          remark: '',
          file:'',
        };
      },
      error(response) {
        console.log(response)
      }
    });
  }
  fetchAndDisplayPDF(Outsource: Outsource): void {
    const OutsourceToEdit = this.Outsources.find(
      (educatio) => educatio.id === Outsource.id
    );

  
    this.Outsourceservice.getOutsourceFile(OutsourceToEdit.id).subscribe(
      (pdf: Blob) => {
   
        var file = new Blob([pdf], { type: 'application/pdf' });

        this.downloadFileUrl = window.URL.createObjectURL(file);
        window.open(this.downloadFileUrl, '_blank');    
      },
      (error) => {
        this.FileNull=true
        console.error('Error loading PDF:', error);
       this.id= OutsourceToEdit.id
      }
    );
  }
  updateOutsource(): void { 
  
   
    this.Outsource.file
    this.Outsourceservice.updateOutsource(this.Outsource, this.Outsource.id).subscribe({
      next: () => {
 
        this.showSucessMessage('Sucessfully Updated!!')
        this.Outsourceservice.getAllOutsource().subscribe({
          next: (Outsources) => {
            this.Outsources = Outsources  ;
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
    this.Outsource= {
      pId: 0,
      id:undefined,
      createdBy: "",
      createdDate: "2023-07-26T06:13:52.512Z",
      updatedDate: "2023-07-26T06:13:52.512Z",
      updatedBy: "",
      status: 0,
      amount: 0,
      date: "",
      remark: '',
      file:'',
    };
  }

  editOutsource(Outsource: Outsource): void {
    const OutsourceToEdit = this.Outsources.find(Outsource => Outsource.id === Outsource.id);
    this.Outsource = OutsourceToEdit;

  }


  deleteOutsource(Outsource: Outsource): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
      this.Outsourceservice.deleteOutsource(Outsource.id).subscribe(
        () => {
         
          this.dialog.open(DeletesucessfullmessageComponent)
          this.Outsourceservice.getAllOutsource().subscribe({
            next: (Outsources) => {
              this.Outsources = Outsources           ;
            },
            error: (response) => {
              console.log(response);
            }
          });
        },
        (error) => {
          console.error(error);
          // If there was an error during deletion, you can show an error message.
         // alert('Failed to delete the Outsource. Please try again later.');
        }
        );
      }
    });
  }


}
