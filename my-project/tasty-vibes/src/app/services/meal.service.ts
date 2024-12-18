/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Meal {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private apiUrl = 'http://localhost:5000/meals';

  constructor(private http: HttpClient) {}

  getMeals(searchQuery: string = ''): Observable<Meal[]> {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.set('query', searchQuery);
    }

    return this.http.get<Meal[]>(this.apiUrl, { params });
  }
}
