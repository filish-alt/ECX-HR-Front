import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Employee } from 'app/models/employee.model';
import { EmployeeService } from 'app/service/employee.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  searchTerm: string = ''; 

  filteredEmployees: Employee[]=[]; 
  employees:Employee[]= []; 
  allEmployees:any=[]; 
  searchText:string[]; 
    buttons = [    
      { label: ' Add Employee ', route: '/employee-registration' }, 
      { label: '  List Employee ', route: '/employee-list' },
      {label:'Employee History', route:'/history'}
    ] 
  dataSource: any; 

 
constructor(private employeeservice: EmployeeService, 
  private dialog: MatDialog, 
  private router: Router , 
  ){ 
    
  } 
ngOnInit(): void{ 


 

}  
 



 onSearch() {
  if (this.searchTerm.trim() === '') {
    this.filteredEmployees = [];
  } else {
    this.employeeservice.getEmployeeByEcx(this.searchTerm).subscribe(
      (filteredEmployees) => {
        this.filteredEmployees = filteredEmployees.filter(employee => employee.status === 1);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}


editEmployee(employee: Employee): void { 
  // Here, we will navigate to the edit page for the selected EmergencyContact. 
  this.router.navigate(["/edit-employee", employee.empId]); 
} 
  

}



