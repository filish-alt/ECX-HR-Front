import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Make the service available throughout the app
})
export class ApiUrlService {
  readonly apiUrl = 'https://localhost:7008/api/';
}
