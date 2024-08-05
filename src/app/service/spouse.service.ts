import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Spouse } from 'app/models/spouse.model';
import { ApiUrlService } from './api-url.service';




@Injectable({
  providedIn: 'root'
})
export class SpouseService {
 

  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllSpouse(): Observable<Spouse[]> {
    return this.http.get<Spouse[]>(this.apiUrlService.apiUrl + 'Spouse');
  }
  getSpouse(id:string): Observable<Spouse> {
    return this.http.get<Spouse>(this.apiUrlService.apiUrl + 'Spouse/'+id);
  }

  addSpouse(addSpouseRequest:Spouse): Observable<Spouse> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Spouse>(this.apiUrlService.apiUrl + 'Spouse', addSpouseRequest,httpOptions);
  }

  updateSpouse(spouseDetails:Spouse, Id:string): Observable<Spouse> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Spouse>(this.apiUrlService.apiUrl + 'Spouse/'+Id, spouseDetails,httpOptions);
  }

  deleteSpouse(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'Spouse/' + Id, httpOptions);
  }

  

}
