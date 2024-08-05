import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OverTime } from 'app/models/Payroll/DeductionType.model';
import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';

@Injectable({
  providedIn: 'root'
})
export class OverTimeService {

  
  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllOverTime(): Observable<OverTime[]> {
    return this.http.get<OverTime[]>(this.apiUrlService.apiUrl + 'OverTime');
  }
  getOverTime(id:number): Observable<OverTime> {
    return this.http.get<OverTime>(this.apiUrlService.apiUrl + 'OverTime/'+id);
  }

  updateOverTime(OverTimeDetails:OverTime, Id:string): Observable<OverTime> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<OverTime>(this.apiUrlService.apiUrl + 'OverTime/'+Id, OverTimeDetails,httpOptions);
  }

  deleteOverTime(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'OverTime/' + Id, httpOptions);
  }

  addOverTime(addOverTimeRequest:OverTime): Observable<OverTime> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<OverTime>(this.apiUrlService.apiUrl + 'OverTime', addOverTimeRequest,httpOptions);
  }



  

}
