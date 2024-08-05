import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from 'app/models/contact.model';
import { ApiUrlService } from './api-url.service';



@Injectable({
  providedIn: 'root'
})
export class ContactService {
 
 
  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrlService.apiUrl + 'Address');
  }
  getContact(empid:string): Observable<Contact> {
    return this.http.get<Contact>(this.apiUrlService.apiUrl + 'Address/'+empid);
  }
  getContactByEmpId(empId:string): Observable<Contact> {
    return this.http.get<Contact>(this.apiUrlService.apiUrl + 'Address/'+empId);
  }
  addContact(addContactRequest:Contact): Observable<Contact> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Contact>(this.apiUrlService.apiUrl + 'Address', addContactRequest,httpOptions);
  }

  updateContact(contactDetails:Contact, Id:string): Observable<Contact> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Contact>(this.apiUrlService.apiUrl + 'Address/'+Id, contactDetails,httpOptions);
  }

  deleteContact(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'Address/' + Id, httpOptions);
  }

  

}
