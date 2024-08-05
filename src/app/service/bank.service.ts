import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlService } from './api-url.service';
import { Bank } from 'app/models/Payroll/Bank.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankService {



  
  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllBank(): Observable<Bank[]> {
    return this.http.get<Bank[]>(this.apiUrlService.apiUrl + 'Bank');
  }
  getBank(id:number): Observable<Bank> {
    return this.http.get<Bank>(this.apiUrlService.apiUrl + 'Bank/'+id);
  }

  updateBank(BankDetails:Bank, Id:string): Observable<Bank> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Bank>(this.apiUrlService.apiUrl + 'Bank/'+Id, BankDetails,httpOptions);
  }

  deleteBank(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'Bank/' + Id, httpOptions);
  }

  addBank(addBankRequest:Bank): Observable<Bank> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Bank>(this.apiUrlService.apiUrl + 'Bank', addBankRequest,httpOptions);
  }



  

}
