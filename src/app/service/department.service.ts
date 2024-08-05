import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from 'app/models/education.model';
import { ApiUrlService } from './api-url.service';





@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
 
  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllDepartment(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrlService.apiUrl + 'Department');
  }
  getDepartment(id:string): Observable<Department> {
    return this.http.get<Department>(this.apiUrlService.apiUrl + 'Department/'+id);
  }

  addDepartment(addDepartmentRequest: Department): Observable<Department> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    // addDepartmentRequest.id="0000000-0000-0000-0000-000000000000"
    return this.http.post<Department>(this.apiUrlService.apiUrl + 'Department', addDepartmentRequest, httpOptions);
  }

  updateDepartment(DepartmentDetails: Department,Id:string): Observable<Department> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Department>(this.apiUrlService.apiUrl + 'Department/'+Id, DepartmentDetails, httpOptions);
  }

  deleteDepartment(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'Department/' + Id, httpOptions);
  }

  

}
