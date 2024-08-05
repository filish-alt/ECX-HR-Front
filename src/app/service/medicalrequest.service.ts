import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';
import { MedicalRequests } from 'app/models/medical/medical.model';




@Injectable({
  providedIn: 'root'
})
export class MedicalRequestService {
  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllMedicalRequest(): Observable<MedicalRequests[]> {
    return this.http.get<MedicalRequests[]>(this.apiUrlService.apiUrl + 'MedicalFund');
  }
  getMedicalRequest(id:string): Observable<MedicalRequests[]> {
    return this.http.get<MedicalRequests[]>(this.apiUrlService.apiUrl + 'MedicalFund/'+id);
  }

  addMedicalRequest(addMedicalRequestRequest:MedicalRequests): Observable<MedicalRequests> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<MedicalRequests>(this.apiUrlService.apiUrl + 'MedicalFund', addMedicalRequestRequest,httpOptions);
  }

  updateMedicalRequest(MedicalRequestDetails:MedicalRequests, Id:string): Observable<MedicalRequests> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<MedicalRequests>(this.apiUrlService.apiUrl + 'MedicalFund/'+Id, MedicalRequestDetails,httpOptions);
  }

  deleteMedicalRequest(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'MedicalFund/' + Id, httpOptions);
  }

  getMedicalRequestFile(medicalRequestId: string): Observable<Blob> {
    const url = this.apiUrlService.apiUrl +'MedicalFund/'+medicalRequestId;
    return this.http.get(url, { responseType: 'blob' });
  }
  getMedicalRequestReceiptFile(medicalRequestId: string): Observable<Blob> {
    const url = this.apiUrlService.apiUrl +'MedicalFund/Receipt/'+medicalRequestId;
    return this.http.get(url, { responseType: 'blob' });
  }
  getMedicalRequestByEmp(employeeId:string): Observable<MedicalRequests[]> {
   
    return this.http.get<MedicalRequests[]>(this.apiUrlService.apiUrl + 'MedicalFund/empId/'+employeeId)
  }
  getmedicalRequestByStatus(approvalStatus: string ): Observable<MedicalRequests[]> {
    
    return this.http.get<MedicalRequests[]>(this.apiUrlService.apiUrl + 'MedicalFund/status/'+approvalStatus)
  }
}
