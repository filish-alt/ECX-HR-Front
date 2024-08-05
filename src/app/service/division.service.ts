import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Division } from 'app/models/job-description.model';
import { ApiUrlService } from './api-url.service';




@Injectable({
  providedIn: 'root'
})
export class DivisionService {
 

  constructor(private http: HttpClient ,private apiUrlService: ApiUrlService) { }

  getAllDivisions(): Observable<Division[]> {
    return this.http.get<Division[]>(this.apiUrlService.apiUrl + 'Division');
  }
  getDivision(id:string): Observable<Division> {
    return this.http.get<Division>(this.apiUrlService.apiUrl + 'Division/'+id);
  }

  addDivision(addDivisionRequest: Division): Observable<Division> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    // addDivisionRequest.id="0000000-0000-0000-0000-000000000000"
    return this.http.post<Division>(this.apiUrlService.apiUrl + 'Division', addDivisionRequest, httpOptions);
  }

  updateDivision(divisionDetails: Division,Id:string): Observable<Division> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Division>(this.apiUrlService.apiUrl + 'Division/'+Id, divisionDetails, httpOptions);
  }

  deleteDivision(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'Division/' + Id, httpOptions);
  }

  

}
