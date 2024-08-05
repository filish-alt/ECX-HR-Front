import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnnualLeaveBalance } from 'app/models/leaverequestmodel';
import { ApiUrlService } from './api-url.service';




@Injectable({
  providedIn: 'root'
})
export class LeaveBalanceService {
 

  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllLeaveBalance(): Observable<AnnualLeaveBalance[]> {
    return this.http.get<AnnualLeaveBalance[]>(this.apiUrlService.apiUrl+ 'LeaveBalance');
  }
  getLeaveBalance(id:string): Observable<AnnualLeaveBalance[]> {
    return this.http.get<AnnualLeaveBalance[]>(this.apiUrlService.apiUrl+ 'LeaveBalance/'+id);
  }
  getLeaveBalanceByEmp(employeeId: string): Observable<any> {
    const url = `${this.apiUrlService.apiUrl}/api/LeaveBalance/${employeeId}`;
 return this.http.get(url);;
  }
  addLeaveBalance(addLeaveBalanceRequest:AnnualLeaveBalance): Observable<AnnualLeaveBalance> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<AnnualLeaveBalance>(this.apiUrlService.apiUrl+ 'LeaveBalance', addLeaveBalanceRequest,httpOptions);
  }

  updateLeaveBalance(LeaveBalanceDetails:AnnualLeaveBalance, Id:string): Observable<AnnualLeaveBalance> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<AnnualLeaveBalance>(this.apiUrlService.apiUrl+ 'LeaveBalance/'+Id, LeaveBalanceDetails,httpOptions);
  }

  deleteLeaveBalance(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl+ 'LeaveBalance/' + Id, httpOptions);
  }

  

}
