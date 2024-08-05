import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlService } from './api-url.service';

import { Observable } from 'rxjs';
import { ContractRegistration } from 'app/models/Payroll/contract.model';

@Injectable({
  providedIn: 'root'
})
export class ContractRegistrationService {



  
  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllContractRegistration(): Observable<ContractRegistration[]> {
    return this.http.get<ContractRegistration[]>(this.apiUrlService.apiUrl + 'ContractEmployee');
  }
  getContractRegistration(id:number): Observable<ContractRegistration> {
    return this.http.get<ContractRegistration>(this.apiUrlService.apiUrl + 'ContractEmployee/'+id);
  }

  updateContractRegistration(ContractRegistrationDetails:ContractRegistration, Id:string): Observable<ContractRegistration> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<ContractRegistration>(this.apiUrlService.apiUrl + 'ContractEmployee/'+Id, ContractRegistrationDetails,httpOptions);
  }

  deleteContractRegistration(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'ContractEmployee/' + Id, httpOptions);
  }

  addContractRegistration(addContractRegistrationRequest:ContractRegistration): Observable<ContractRegistration> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<ContractRegistration>(this.apiUrlService.apiUrl + 'ContractEmployee', addContractRegistrationRequest,httpOptions);
  }



  

}
