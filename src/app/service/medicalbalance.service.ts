import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';
import { MedicalBalance } from 'app/models/medical/medical.model';





@Injectable({
  providedIn: 'root'
})
export class MedicalBalancesService {
 
  
  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllMedicalBalances(): Observable<MedicalBalance[]> {
    return this.http.get<MedicalBalance[]>(this.apiUrlService.apiUrl + 'MedicalBalance');
  }
  getMedicalBalances(id:string): Observable<MedicalBalance[]> {
    return this.http.get<MedicalBalance[]>(this.apiUrlService.apiUrl + 'MedicalBalance/'+id);
  }

  addMedicalBalances(addMedicalBalancesBalances:MedicalBalance): Observable<MedicalBalance> {
    // addEmployeeBalances.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<MedicalBalance>(this.apiUrlService.apiUrl + 'MedicalBalance', addMedicalBalancesBalances,httpOptions);
  }

  updateMedicalBalances(MedicalBalancesDetails:MedicalBalance, Id:string): Observable<MedicalBalance> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<MedicalBalance>(this.apiUrlService.apiUrl + 'MedicalBalance/'+Id, MedicalBalancesDetails,httpOptions);
  }

  deleteMedicalBalances(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'MedicalBalance/' + Id, httpOptions);
  }

  

}
