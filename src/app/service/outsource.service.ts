import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlService } from './api-url.service';

import { Observable } from 'rxjs';
import { Outsource } from 'app/models/Payroll/contract.model';

@Injectable({
  providedIn: 'root'
})
export class OutsourceService {


  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllOutsource(): Observable<Outsource[]> {
    return this.http.get<Outsource[]>(this.apiUrlService.apiUrl + 'OutSource');
  }
  getOutsource(id:number): Observable<Outsource> {
    return this.http.get<Outsource>(this.apiUrlService.apiUrl + 'Outsource/'+id);
  }
  getOutsourceFile(Id: string): Observable<Blob> {
    const url = this.apiUrlService.apiUrl +'OutSource/fileId/'+Id;
    return this.http.get(url, { responseType: 'blob' });
  }
  updateOutsource(OutsourceDetails:Outsource, Id:string): Observable<Outsource> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Outsource>(this.apiUrlService.apiUrl + 'Outsource/'+Id, OutsourceDetails,httpOptions);
  }

  deleteOutsource(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'OutSource/' + Id, httpOptions);
  }

  addOutsource(addOutsourceRequest:Outsource): Observable<Outsource> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Outsource>(this.apiUrlService.apiUrl + 'OutSource', addOutsourceRequest,httpOptions);
  }



  

}
