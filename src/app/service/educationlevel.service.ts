import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EducationLevel } from 'app/models/job-description.model';
import { ApiUrlService } from './api-url.service';




@Injectable({
  providedIn: 'root'
})
export class EducationLevelService {
 

  

  constructor(private http: HttpClient , private apiUrlService: ApiUrlService) { }

  getAllEducationLevels(): Observable<EducationLevel[]> {
    return this.http.get<EducationLevel[]>(this.apiUrlService.apiUrl + 'EducationLevel');
  }
  getEducationLevel(id:number): Observable<EducationLevel> {
    return this.http.get<EducationLevel>(this.apiUrlService.apiUrl + 'EducationLevel/'+id);
  }

  addEducationLevel(addEducationLevelRequest:EducationLevel): Observable<EducationLevel> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<EducationLevel>(this.apiUrlService.apiUrl + 'EducationLevel', addEducationLevelRequest,httpOptions);
  }

  updateEducationLevel(educationlevelDetails:EducationLevel, Id:number): Observable<EducationLevel> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<EducationLevel>(this.apiUrlService.apiUrl + 'EducationLevel/'+Id, educationlevelDetails,httpOptions);
  }

  deleteEducationLevel(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'EducationLevel/' + Id, httpOptions);
  }

  

}
