import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiUrlService } from './api-url.service';
import { Promotion } from 'app/models/vacancy/promotion.model';




@Injectable({
  providedIn: 'root'
})
export class PromotionService {
 
 
  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllPromotion(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(this.apiUrlService.apiUrl + 'Promotion');
  }
  getPromotion(id:string): Observable<Promotion> {
    return this.http.get<Promotion>(this.apiUrlService.apiUrl + 'Promotion/'+id);
  }

  addPromotion(addPromotionRequest:Promotion): Observable<Promotion> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Promotion>(this.apiUrlService.apiUrl + 'Promotion', addPromotionRequest,httpOptions);
  }

  updatePromotion(PromotionDetails:Promotion, Id:string): Observable<Promotion> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Promotion>(this.apiUrlService.apiUrl + 'Promotion/'+Id, PromotionDetails,httpOptions);
  }

  deletePromotion(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'Promotion/' + Id, httpOptions);
  }

  

}
