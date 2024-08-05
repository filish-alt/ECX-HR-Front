import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Allowance } from 'app/models/Payroll/payroll.model';
import { ApiUrlService } from './api-url.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllowanceService {

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllAllowance(): Observable<Allowance[]> {
    return this.http.get<Allowance[]>(this.apiUrlService.apiUrl + 'Allowance');
  }
  getAllowance(id:number): Observable<Allowance> {
    return this.http.get<Allowance>(this.apiUrlService.apiUrl + 'Allowance/'+id);
  }

  updateAllowance(AllowanceDetails:Allowance, Id:string): Observable<Allowance> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Allowance>(this.apiUrlService.apiUrl + 'Allowance/'+Id, AllowanceDetails,httpOptions);
  }

  deleteAllowance(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'Allowance/' + Id, httpOptions);
  }

  addAllowance(addAllowanceRequest:Allowance): Observable<Allowance> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Allowance>(this.apiUrlService.apiUrl + 'Allowance', addAllowanceRequest,httpOptions);
  }



  

}
