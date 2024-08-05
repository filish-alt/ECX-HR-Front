import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Education } from 'app/models/work-experience.model';
import { ApiUrlService } from './api-url.service';




@Injectable({
  providedIn: 'root'
})
export class EducationService {
 
  

  constructor(private http: HttpClient , private apiUrlService: ApiUrlService) { }

  getAllEducation(): Observable<Education[]> {
    return this.http.get<Education[]>(this.apiUrlService.apiUrl + 'Education');
  }
  getEducationFile(Id: string): Observable<Blob> {
    const url = this.apiUrlService.apiUrl +'Education/fileId/'+Id;
    return this.http.get(url, { responseType: 'blob' });
  }
  getEducation(id:string): Observable<Education> {
    return this.http.get<Education>(this.apiUrlService.apiUrl + 'Education/'+id);
  }

  addEducation(addEducationRequest:Education): Observable<Education> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Education>(this.apiUrlService.apiUrl + 'Education', addEducationRequest,httpOptions);
  }

  updateEducation(educationDetails:Education, Id:string): Observable<Education> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Education>(this.apiUrlService.apiUrl + 'Education/'+Id, educationDetails,httpOptions);
  }

  deleteEducation(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'Education/' + Id, httpOptions);
  }

  

}
