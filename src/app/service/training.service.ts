import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Training } from 'app/models/training.model';
import { ApiUrlService } from './api-url.service';




@Injectable({
  providedIn: 'root'
})
export class TrainingService {
 

  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllTraining(): Observable<Training[]> {
    return this.http.get<Training[]>(this.apiUrlService.apiUrl + 'Training');
  }
  getTrainingFile(Id: string): Observable<Blob> {
    const url = this.apiUrlService.apiUrl +'Training/fileId/'+Id;
    return this.http.get(url, { responseType: 'blob' });
  }


  addTraining(addTrainingRequest:Training): Observable<Training> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Training>(this.apiUrlService.apiUrl + 'Training', addTrainingRequest,httpOptions);
  }

  updateTraining(trainingDetails:Training, Id:string): Observable<Training> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Training>(this.apiUrlService.apiUrl + 'Training/'+Id, trainingDetails,httpOptions);
  }

  deleteTraining(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'Training/' + Id, httpOptions);
  }

  

}
