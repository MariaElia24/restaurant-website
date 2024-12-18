/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AboutUsService {
  private apiUrl = 'http://localhost:5000/about-us';

  constructor(private http: HttpClient) {}

  getAboutUs(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  saveAboutUs(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
