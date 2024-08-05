import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';
import { TempPayroll } from 'app/models/Payroll/payroll.model';



@Injectable({
  providedIn: 'root'
})
export class TempPayrollService {

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllTempPayroll(): Observable<TempPayroll[]> {
    return this.http.get<TempPayroll[]>(this.apiUrlService.apiUrl + 'TempPayroll');
  }
  getTempPayroll(id:number): Observable<TempPayroll> {
    return this.http.get<TempPayroll>(this.apiUrlService.apiUrl + 'TempPayroll/'+id);
  }

  updateTempPayroll(TempPayrollDetails:TempPayroll, Id:string): Observable<TempPayroll> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<TempPayroll>(this.apiUrlService.apiUrl + 'TempPayroll/'+Id, TempPayrollDetails,httpOptions);
  }

  deleteTempPayroll(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'TempPayroll/' + Id, httpOptions);
  }

  addTempPayroll(addTempPayrollRequest:TempPayroll): Observable<TempPayroll> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<TempPayroll>(this.apiUrlService.apiUrl + 'TempPayRoll', addTempPayrollRequest,httpOptions);
  }



  

}
