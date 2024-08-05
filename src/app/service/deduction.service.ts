import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Deduction } from 'app/models/Payroll/payroll.model';
import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';

@Injectable({
  providedIn: 'root'
})
export class DeductionService {

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllDeduction(): Observable<Deduction[]> {
    return this.http.get<Deduction[]>(this.apiUrlService.apiUrl + 'Deduction');
  }
  getDeduction(id:number): Observable<Deduction> {
    return this.http.get<Deduction>(this.apiUrlService.apiUrl + 'Deduction/'+id);
  }

  updateDeduction(DeductionDetails:Deduction, Id:string): Observable<Deduction> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Deduction>(this.apiUrlService.apiUrl + 'Deduction/'+Id, DeductionDetails,httpOptions);
  }

  deleteDeduction(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'Deduction/' + Id, httpOptions);
  }

  addDeduction(addDeductionRequest:Deduction): Observable<Deduction> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Deduction>(this.apiUrlService.apiUrl + 'Deduction', addDeductionRequest,httpOptions);
  }


  getDeductionFile(fileid: string): Observable<Blob> {
    const url = this.apiUrlService.apiUrl +'Deduction/id/'+fileid;
    return this.http.get(url, { responseType: 'blob' });
  }
  

}
