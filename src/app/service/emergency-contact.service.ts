import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmergencyContact } from 'app/models/emergency-contact.model';
import { ApiUrlService } from './api-url.service';




@Injectable({
  providedIn: 'root'
})
export class EmergencyContactService {
 
  constructor(private http: HttpClient , private apiUrlService: ApiUrlService) { }

  getAllEmergencyContact(): Observable<EmergencyContact[]> {
    return this.http.get<EmergencyContact[]>(this.apiUrlService.apiUrl + 'EmergencyContact');
  }
  getEmergencyContact(id:string): Observable<EmergencyContact> {
    return this.http.get<EmergencyContact>(this.apiUrlService.apiUrl + 'EmergencyContact/'+id);
  }

  addEmergencyContact(addEmergencyContactRequest:EmergencyContact): Observable<EmergencyContact> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<EmergencyContact>(this.apiUrlService.apiUrl + 'EmergencyContact', addEmergencyContactRequest,httpOptions);
  }

  updateEmergencyContact(emergencycontactDetails:EmergencyContact, Id:string): Observable<EmergencyContact> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<EmergencyContact>(this.apiUrlService.apiUrl + 'EmergencyContact/'+Id, emergencycontactDetails,httpOptions);
  }

  deleteEmergencyContact(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'EmergencyContact/' + Id, httpOptions);
  }

  

}
