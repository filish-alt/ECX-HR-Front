import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supervisor } from 'app/models/employee.model';
import { ApiUrlService } from './api-url.service';



@Injectable({
  providedIn: 'root'
})
export class SupervisorService {

  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllSupervisors(): Observable<Supervisor[]> {
    return this.http.get<Supervisor[]>(this.apiUrlService.apiUrl + 'Supervisor');
  }
  getSupervisor(id:number): Observable<Supervisor> {
    return this.http.get<Supervisor>(this.apiUrlService.apiUrl + 'Supervisor/'+id);
  }

  addSupervisor(addSupervisorRequest:Supervisor): Observable<Supervisor> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Supervisor>(this.apiUrlService.apiUrl + 'Supervisor', addSupervisorRequest,httpOptions);
  }

  updateSupervisor(supervisorDetails:Supervisor, Id:number): Observable<Supervisor> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Supervisor>(this.apiUrlService.apiUrl + 'Supervisor/'+Id, supervisorDetails,httpOptions);
  }

  deleteSupervisor(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'Supervisor/' + Id, httpOptions);
  }

  

}
