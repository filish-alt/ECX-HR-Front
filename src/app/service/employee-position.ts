import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from 'app/models/employee.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EmployeePosition } from 'app/models/job-description.model';
import { ApiUrlService } from './api-url.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeePositionService {
 
  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllEmployeePosition(): Observable<EmployeePosition[]> {
    return this.http.get<EmployeePosition[]>(this.apiUrlService.apiUrl + 'EmployeePosition');
  }
  getEmployeePosition(id:string): Observable<EmployeePosition> {
    return this.http.get<EmployeePosition>(this.apiUrlService.apiUrl + 'EmployeePosition/'+id);
  }

  addEmployeePosition(addEmployeePositionRequest: EmployeePosition): Observable<EmployeePosition> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<EmployeePosition>(this.apiUrlService.apiUrl + 'EmployeePosition', addEmployeePositionRequest, httpOptions)
      .pipe(
        catchError((error) => {
          console.error('Error occurred during addEmployeePosition:', error);
          // Handle the error here, you can throw a custom error or do any other error handling
          return throwError('An error occurred during addEmployeePosition. Please try again later.');
        })
      );
  }
  updateEmployeePosition(employeePositionDetails: EmployeePosition, Id:string): Observable<EmployeePosition> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<EmployeePosition>(this.apiUrlService.apiUrl + 'EmployeePosition/'+Id, employeePositionDetails,httpOptions);
  }

  deleteEmployeePosition(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'EmployeePosition/' + Id, httpOptions);
  }

  

}
