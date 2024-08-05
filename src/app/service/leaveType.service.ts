import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeaveType } from 'app/models/leaveType.model';
import { ApiUrlService } from './api-url.service';





@Injectable({
  providedIn: 'root'
})
export class LeaveTypeService {
 


  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllLeaveType(): Observable<LeaveType[]> {
    return this.http.get<LeaveType[]>(this.apiUrlService.apiUrl + 'LeaveType');
  }
  getLeaveType(id:number): Observable<LeaveType> {
    return this.http.get<LeaveType>(this.apiUrlService.apiUrl + 'LeaveType/'+id);
  }

  addLeaveType(addLeaveTypeType:LeaveType): Observable<LeaveType> {
    // addEmployeeType.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<LeaveType>(this.apiUrlService.apiUrl + 'LeaveType', addLeaveTypeType,httpOptions);
  }

  updateLeaveType(LeaveTypeDetails:LeaveType, Id:number): Observable<LeaveType> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<LeaveType>(this.apiUrlService.apiUrl + 'LeaveType/'+Id, LeaveTypeDetails,httpOptions);
  }

  deleteLeaveType(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'LeaveType/' + Id, httpOptions);
  }

  

}
