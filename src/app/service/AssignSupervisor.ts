import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssignSupervisor, Step } from 'app/models/job-description.model';
import { ApiUrlService } from './api-url.service';



@Injectable({
  providedIn: 'root'
})
export class AssignSupervisorService {

  constructor(private http: HttpClient,  private apiUrlService: ApiUrlService) { }

  getAllAssignSupervisor(): Observable<AssignSupervisor[]> {
    return this.http.get<AssignSupervisor[]>(this.apiUrlService.apiUrl + 'AssignSupervisor');
  }
  getAssignSupervisor(id:number): Observable<AssignSupervisor> {
    return this.http.get<AssignSupervisor>(this.apiUrlService.apiUrl + 'AssignSupervisor/'+id);
  }

  addAssignSupervisor(addAssignSupervisorRequest:AssignSupervisor): Observable<AssignSupervisor> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<AssignSupervisor>(this.apiUrlService.apiUrl + 'AssignSupervisor', addAssignSupervisorRequest,httpOptions);
  }

  updateAssignSupervisor(AssignSupervisorDetails:AssignSupervisor, Id:number): Observable<AssignSupervisor> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<AssignSupervisor>(this.apiUrlService.apiUrl + 'AssignSupervisor/'+Id, AssignSupervisorDetails,httpOptions);
  }

  deleteAssignSupervisor(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'AssignSupervisor/' + Id, httpOptions);
  }

  

}
