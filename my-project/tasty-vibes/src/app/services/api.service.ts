/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  getMeals(): Observable<any> {
    return this.http.get(`${this.baseUrl}/meals`);
  }

  addMeal(meal: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/meals`, meal);
  }

  updateMeal(id: string, meal: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/meals/${id}`, meal);
  }

  deleteMeal(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/meals/${id}`);
  }

  getOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders`);
  }

  updateOrder(id: string, order: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/orders/${id}`, order);
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/orders/${id}`);
  }
}
