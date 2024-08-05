import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CombinedEmployeeData, Employee } from 'app/models/employee.model';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EmployeeIdService } from './employee-id.service';
import { ApiUrlService } from './api-url.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
 
  

  constructor(private http: HttpClient, private employeeidservice:EmployeeIdService,private apiUrlService: ApiUrlService) { }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrlService.apiUrl + 'Employee');
  }
  getEmployee(id:string): Observable<Employee> {
    return this.http.get<Employee>(this.apiUrlService.apiUrl + 'Employee/'+id);
  }
  getEmployeeByEcx(id: string): Observable<Employee[]> {
    const encodedId = encodeURIComponent(id);
    return this.http.get<Employee[]>(this.apiUrlService.apiUrl + 'Employee/ecx/' + encodedId);
  }
  getEmployeeData(id: string): Observable<CombinedEmployeeData> {

    return this.http.get<CombinedEmployeeData>(this.apiUrlService.apiUrl + 'Employee/GetEmployeeData/'+id);
  }
  addEmployee(addEmployeeRequest: Employee): Observable<Employee> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Employee>(this.apiUrlService.apiUrl + 'Employee/', addEmployeeRequest, httpOptions)
    .pipe(  
      map(response => {  
        // Assuming the server's response contains the empId as response.empId  
         
         this.employeeidservice.employeeId = response.toString();  
        return response;  
         
      }),)
  }
  updateEmployee(employeeDetails: Employee, Id:string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<string>(this.apiUrlService.apiUrl + 'Employee/'+Id, employeeDetails,httpOptions);
  }

  deleteEmployee(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'Employee/' + Id, httpOptions);
  }

  

}
