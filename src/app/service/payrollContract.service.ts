import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';
import { PayrollContract } from 'app/models/Payroll/contract.model';

@Injectable({
  providedIn: 'root'
})
export class PayrollContractService {

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllPayrollContract(): Observable<PayrollContract[]> {
    return this.http.get<PayrollContract[]>(this.apiUrlService.apiUrl + 'PayrollContract');
  }
  getPayrollContract(id:number): Observable<PayrollContract> {
    return this.http.get<PayrollContract>(this.apiUrlService.apiUrl + 'PayrollContract/'+id);
  }

  updatePayrollContract(PayrollContractDetails:PayrollContract, Id:string): Observable<PayrollContract> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<PayrollContract>(this.apiUrlService.apiUrl + 'PayrollContract/'+Id, PayrollContractDetails,httpOptions);
  }

  deletePayrollContract(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'PayrollContract/' + Id, httpOptions);
  }

  addPayrollContract(addPayrollContractRequest:PayrollContract): Observable<PayrollContract> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<PayrollContract>(this.apiUrlService.apiUrl + 'PayrollContract', addPayrollContractRequest,httpOptions);
  }



  

}
