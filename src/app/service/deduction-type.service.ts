import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeductionType } from 'app/models/Payroll/DeductionType.model';
import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';

@Injectable({
  providedIn: 'root'
})
export class DeductionTypeService {

  
  
  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllDeductionType(): Observable<DeductionType[]> {
    return this.http.get<DeductionType[]>(this.apiUrlService.apiUrl + 'DeductionType');
  }
  getDeductionType(id:number): Observable<DeductionType> {
    return this.http.get<DeductionType>(this.apiUrlService.apiUrl + 'DeductionType/'+id);
  }

  updateDeductionType(DeductionTypeDetails:DeductionType, Id:string): Observable<DeductionType> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<DeductionType>(this.apiUrlService.apiUrl + 'DeductionType/'+Id, DeductionTypeDetails,httpOptions);
  }

  deleteDeductionType(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'DeductionType/' + Id, httpOptions);
  }

  addDeductionType(addDeductionTypeRequest:DeductionType): Observable<DeductionType> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<DeductionType>(this.apiUrlService.apiUrl + 'DeductionType', addDeductionTypeRequest,httpOptions);
  }



  

}
