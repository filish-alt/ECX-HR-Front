import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiUrlService } from './api-url.service';
import { PromotionRelation } from 'app/models/vacancy/promotion.model';





@Injectable({
  providedIn: 'root'
})
export class PromotionRelationService {
 
 
  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllPromotionRelation(): Observable<PromotionRelation[]> {
    return this.http.get<PromotionRelation[]>(this.apiUrlService.apiUrl + 'PromotionRelation');
  }
  getpromotionRelationByStatus(promotionStatus: string): Observable<PromotionRelation[]> {
    
    return this.http.get<PromotionRelation[]>(this.apiUrlService.apiUrl + 'promotionRelation/status/'+promotionStatus)
  }
  getPromotionFile(vacancyid: string, empid: string): Observable<Blob> {
    const url = this.apiUrlService.apiUrl +'PromotionRelation/file/'+vacancyid + '/' +empid;
    return this.http.get(url, { responseType: 'blob' });
  }

  getPromotionRelation(id:string): Observable<PromotionRelation[]> {
    return this.http.get<PromotionRelation[]>(this.apiUrlService.apiUrl + 'PromotionRelation/'+id);
  }

  addPromotionRelation(addPromotionRelationRequest:PromotionRelation): Observable<PromotionRelation> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<PromotionRelation>(this.apiUrlService.apiUrl + 'PromotionRelation', addPromotionRelationRequest,httpOptions);
  }

  updatePromotionRelation(PromotionRelationDetails:PromotionRelation, Id:string): Observable<PromotionRelation> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<PromotionRelation>(this.apiUrlService.apiUrl + 'PromotionRelation/'+Id, PromotionRelationDetails,httpOptions);
  }

  deletePromotionRelation(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'PromotionRelation/' + Id, httpOptions);
  }

  

}
