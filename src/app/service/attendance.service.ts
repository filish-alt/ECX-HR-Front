import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';
import { Attendance, CheckInOut, NumOfRun, NumOfRunDel, Schedule, UserOfNum, userInfo } from 'app/models/Attendance.model';
import { Employee } from 'app/models/employee.model';



@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
 
 
  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllAttendance(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(this.apiUrlService.apiUrl + 'Attendance/all');
  }
  getAttendance(id:number): Observable<Attendance> {
    return this.http.get<Attendance>(this.apiUrlService.apiUrl + 'Attendance/'+id);
  }
  addAtt(addAttRequest:Attendance): Observable<Attendance> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Attendance>(this.apiUrlService.apiUrl + 'Attendance', addAttRequest,httpOptions);
  }

  importAttendance(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(this.apiUrlService.apiUrl + 'Attendance/import', formData);
  } 

  updateAttendance(AttendanceDetails:Employee, Id:string): Observable<Employee> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Employee>(this.apiUrlService.apiUrl + 'Attendance/'+Id, AttendanceDetails,httpOptions);
  }

  deleteAttendance(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'Attendance/' + Id, httpOptions);
  }




  getUserInfo(id:number,title :string): Observable<userInfo> {
    return this.http.get<userInfo>(this.apiUrlService.apiUrl + 'Attendance/user/'+id+ '/'+title);
  }
  
  getUserOfNum(id:number): Observable<UserOfNum> {
    return this.http.get<UserOfNum>(this.apiUrlService.apiUrl + 'Attendance/userofnum/'+id);
  }
  getSchedule(): Observable<Schedule> {
    return this.http.get<Schedule>(this.apiUrlService.apiUrl + 'Attendance/schedule');
  }
  
  getCheckInOut(id:number, start :string, end:string ): Observable<CheckInOut> {
    return this.http.get<CheckInOut>(this.apiUrlService.apiUrl + 'Attendance/checkinout/'+id +'/' + start+ '/' + end);
  }
  getNumOfRun(): Observable<NumOfRun> {
    return this.http.get<NumOfRun>(this.apiUrlService.apiUrl + 'Attendance/numofrun');
  }
  getNumRunDel(): Observable<NumOfRunDel> {
    return this.http.get<NumOfRunDel>(this.apiUrlService.apiUrl + 'Attendance/numrundel');
  }
}
