import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllowanceType } from 'app/models/Payroll/DeductionType.model';
import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';

@Injectable({
  providedIn: 'root'
})
export class AllowanceTypeService {

  
  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllAllowanceType(): Observable<AllowanceType[]> {
    return this.http.get<AllowanceType[]>(this.apiUrlService.apiUrl + 'AllowanceType');
  }
  getAllowanceType(id:number): Observable<AllowanceType> {
    return this.http.get<AllowanceType>(this.apiUrlService.apiUrl + 'AllowanceType/'+id);
  }

  updateAllowanceType(AllowanceTypeDetails:AllowanceType, Id:string): Observable<AllowanceType> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<AllowanceType>(this.apiUrlService.apiUrl + 'AllowanceType/'+Id, AllowanceTypeDetails,httpOptions);
  }

  deleteAllowanceType(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'AllowanceType/' + Id, httpOptions);
  }

  addAllowanceType(addAllowanceTypeRequest:AllowanceType): Observable<AllowanceType> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<AllowanceType>(this.apiUrlService.apiUrl + 'AllowanceType', addAllowanceTypeRequest,httpOptions);
  }



  

}
