/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'http://localhost:5000/users';

  constructor(private http: HttpClient) { }

  submitContactForm(contactData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, contactData);
  }
}
