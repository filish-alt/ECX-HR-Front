import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CombinedLeaveData, LeaveRequest } from 'app/models/leaverequestmodel';
import { ApiUrlService } from './api-url.service';




@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {
 

  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllLeaveRequest(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(this.apiUrlService.apiUrl + 'LeaveRequest');
  }
  // getLeaveRequest(filedId:string): Observable<LeaveRequest> {
  //   return this.http.get<LeaveRequest>(this.apiUrlService.apiUrl + 'api/LeaveRequest/'+filedId);
  // }
  getLeaveRequestFile(leaveRequestId: string): Observable<Blob> {
    const url = this.apiUrlService.apiUrl +'LeaveRequest/'+leaveRequestId;
    return this.http.get(url, { responseType: 'blob' });
  }
  uploadZipFile(formData: FormData) {
    return this.http.post(this.apiUrlService.apiUrl + 'LeaveRequest/upload', formData);
}
    // }
    getLeaveRequestByStatus(leaveStatus: string, supervisor:string ): Observable<LeaveRequest[]> {
    
      return this.http.get<LeaveRequest[]>(this.apiUrlService.apiUrl + 'LeaveRequest/status/'+leaveStatus+ '/' +supervisor)
    }

    getLeaveData(id: string): Observable<CombinedLeaveData> {

      return this.http.get<CombinedLeaveData>(this.apiUrlService.apiUrl + 'LeaveRequest/GetLeaveData/'+id);
    }
    getAllLeaveRequestByStatus(leaveStatus: string ): Observable<LeaveRequest[]> {
    
      return this.http.get<LeaveRequest[]>(this.apiUrlService.apiUrl + 'LeaveRequest/status/'+leaveStatus)
    }
    getLeaveRequestByEmp(employeeId:string): Observable<LeaveRequest[]> {
   
      return this.http.get<LeaveRequest[]>(this.apiUrlService.apiUrl + 'LeaveRequest/empId/'+employeeId)
    }
  addLeaveRequest(addLeaveRequestRequest:LeaveRequest): Observable<LeaveRequest> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<LeaveRequest>(this.apiUrlService.apiUrl + 'LeaveRequest', addLeaveRequestRequest,httpOptions);
  }

  updateLeaveRequest(LeaveRequestDetails:LeaveRequest, Id:string): Observable<LeaveRequest> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<LeaveRequest>(this.apiUrlService.apiUrl + 'LeaveRequest/'+Id, LeaveRequestDetails,httpOptions);
  }

  deleteLeaveRequest(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'LeaveRequest/' + Id, httpOptions);
  }

  

}
