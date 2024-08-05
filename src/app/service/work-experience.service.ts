import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkExperience } from 'app/models/work-experience.model';
import { ApiUrlService } from './api-url.service';




@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {
 
  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllWorkExperience(): Observable<WorkExperience[]> {
    return this.http.get<WorkExperience[]>(this.apiUrlService.apiUrl + 'WorkExperience');
  }
  getWorkExperienceFile(Id: string): Observable<Blob> {
    const url = this.apiUrlService.apiUrl +'WorkExperience/'+Id;
    return this.http.get(url, { responseType: 'blob' });
  }
  getWorkExperience(id:string): Observable<WorkExperience> {
    return this.http.get<WorkExperience>(this.apiUrlService.apiUrl + 'WorkExperience/'+id);
  }

  addWorkExperience(addWorkExperienceRequest:WorkExperience): Observable<WorkExperience> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<WorkExperience>(this.apiUrlService.apiUrl + 'WorkExperience', addWorkExperienceRequest,httpOptions);
  }

  updateWorkExperience(workexperienceDetails:WorkExperience, Id:string): Observable<WorkExperience> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<WorkExperience>(this.apiUrlService.apiUrl + 'WorkExperience/'+Id, workexperienceDetails,httpOptions);
  }

  deleteWorkExperience(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'WorkExperience/' + Id, httpOptions);
  }

  

}
