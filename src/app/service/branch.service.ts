import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Branch, Step } from 'app/models/job-description.model';
import { ApiUrlService } from './api-url.service';



@Injectable({
  providedIn: 'root'
})
export class BranchService {
 
 
  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllBranch(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.apiUrlService.apiUrl + 'Branch');
  }
  getBranch(id:number): Observable<Branch> {
    return this.http.get<Branch>(this.apiUrlService.apiUrl + 'Branch/'+id);
  }

  addBranch(addBranchRequest:Branch): Observable<Branch> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Branch>(this.apiUrlService.apiUrl + 'Branch', addBranchRequest,httpOptions);
  }

  updateBranch(branchDetails:Branch, Id:number): Observable<Branch> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Branch>(this.apiUrlService.apiUrl + 'api/Branch/'+Id, branchDetails,httpOptions);
  }

  deleteBranch(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'Branch/' + Id, httpOptions);
  }

  

}
