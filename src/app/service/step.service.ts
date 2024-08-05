import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Step } from 'app/models/job-description.model';
import { ApiUrlService } from './api-url.service';



@Injectable({
  providedIn: 'root'
})
export class StepService {

  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllStep(): Observable<Step[]> {
    return this.http.get<Step[]>(this.apiUrlService.apiUrl + 'Step');
  }
  getStep(id:number): Observable<Step> {
    return this.http.get<Step>(this.apiUrlService.apiUrl + 'Step/'+id);
  }

  addStep(addStepRequest:Step): Observable<Step> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Step>(this.apiUrlService.apiUrl + 'Step', addStepRequest,httpOptions);
  }

  updateStep(stepDetails:Step, Id:number): Observable<Step> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Step>(this.apiUrlService.apiUrl + 'Step/'+Id, stepDetails,httpOptions);
  }

  deleteStep(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'Step/' + Id, httpOptions);
  }

  

}
