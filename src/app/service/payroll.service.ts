import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PayRoll } from 'app/models/Payroll/payroll.model';
import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllPayRoll(): Observable<PayRoll[]> {
    return this.http.get<PayRoll[]>(this.apiUrlService.apiUrl + 'PayRoll');
  }
  getPayRoll(id:number): Observable<PayRoll> {
    return this.http.get<PayRoll>(this.apiUrlService.apiUrl + 'PayRoll/'+id);
  }

  updatePayRoll(PayRollDetails:PayRoll, Id:string): Observable<PayRoll> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<PayRoll>(this.apiUrlService.apiUrl + 'PayRoll/'+Id, PayRollDetails,httpOptions);
  }

  deletePayRoll(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'PayRoll/' + Id, httpOptions);
  }

  addPayRoll(addPayRollRequest:PayRoll): Observable<PayRoll> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<PayRoll>(this.apiUrlService.apiUrl + 'PayRoll', addPayRollRequest,httpOptions);
  }



  

}
