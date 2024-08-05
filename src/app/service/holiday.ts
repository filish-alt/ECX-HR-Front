import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Holiday } from 'app/models/holiday';
import { ApiUrlService } from './api-url.service';


@Injectable({
  providedIn: 'root'
})
export class HolidayService {
 
  
  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllHoliday(): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(this.apiUrlService.apiUrl+ 'Holiday');
  }
  getHoliday(id:string): Observable<Holiday> {
    return this.http.get<Holiday>(this.apiUrlService.apiUrl + 'Holiday/'+id);
  }

  addHoliday(addHolidayRequest: Holiday): Observable<Holiday> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Holiday>(this.apiUrlService.apiUrl + 'Holiday', addHolidayRequest, httpOptions)
      .pipe(
        catchError((error) => {
          console.error('Error occurred during addHoliday:', error);
          // Handle the error here, you can throw a custom error or do any other error handling
          return throwError('An error occurred during addHoliday. Please try again later.');
        })
      );
  }
  updateHoliday(HolidayDetails: Holiday, Id:string): Observable<Holiday> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Holiday>(this.apiUrlService.apiUrl + 'Holiday/'+Id, HolidayDetails,httpOptions);
  }

  deleteHoliday(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'Holiday/' + Id, httpOptions);
  }

  

}
