import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grade, Step } from 'app/models/job-description.model';
import { ApiUrlService } from './api-url.service';



@Injectable({
  providedIn: 'root'
})
export class GradeService {
 
  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllGrade(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.apiUrlService.apiUrl+ 'Level');
  }
  getGrade(id:number): Observable<Grade> {
    return this.http.get<Grade>(this.apiUrlService.apiUrl+ 'Level/'+id);
  }

  addGrade(addGradeRequest:Grade): Observable<Grade> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Grade>(this.apiUrlService.apiUrl+ 'Level', addGradeRequest,httpOptions);
  }

  updateGrade(gradeDetails:Step, Id:number): Observable<Grade> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Grade>(this.apiUrlService.apiUrl+ 'Level/'+Id, gradeDetails,httpOptions);
  }

  deleteGrade(Id:string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl+ 'Level/' + Id, httpOptions);
  }

  

}
