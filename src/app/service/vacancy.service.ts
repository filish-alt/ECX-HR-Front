import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiUrlService } from './api-url.service';
import { Vacancy } from 'app/models/vacancy/vacancy.model';



@Injectable({
  providedIn: 'root'
})
export class VacancyService {
 
 
  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllVacancy(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(this.apiUrlService.apiUrl + 'PromotionVacancy');
  }
  getVacancy(id:string): Observable<Vacancy> {
    return this.http.get<Vacancy>(this.apiUrlService.apiUrl + 'PromotionVacancy/'+id);
  }

  addVacancy(addVacancyRequest:Vacancy): Observable<Vacancy> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Vacancy>(this.apiUrlService.apiUrl + 'PromotionVacancy', addVacancyRequest,httpOptions);
  }

  updateVacancy(VacancyDetails:Vacancy, Id:string): Observable<Vacancy> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Vacancy>(this.apiUrlService.apiUrl + 'PromotionVacancy/'+Id, VacancyDetails,httpOptions);
  }

  deleteVacancy(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'PromotionVacancy/' + Id, httpOptions);
  }

  

}
