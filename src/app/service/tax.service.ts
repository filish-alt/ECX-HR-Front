import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tax } from 'app/models/Payroll/Tax.model';
import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllTax(): Observable<Tax[]> {
    return this.http.get<Tax[]>(this.apiUrlService.apiUrl + 'Tax');
  }
  getTax(id:number): Observable<Tax> {
    return this.http.get<Tax>(this.apiUrlService.apiUrl + 'Tax/'+id);
  }

  updateTax(TaxDetails:Tax, Id:string): Observable<Tax> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Tax>(this.apiUrlService.apiUrl + 'Tax/'+Id, TaxDetails,httpOptions);
  }

  deleteTax(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'Tax/' + Id, httpOptions);
  }

  addTax(addTaxRequest:Tax): Observable<Tax> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Tax>(this.apiUrlService.apiUrl + 'Tax', addTaxRequest,httpOptions);
  }



  

}
