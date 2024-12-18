/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Meal {
  _id?: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-manage-menu',
  standalone:false,
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.css']
})
export class ManageMenuComponent implements OnInit {
  meals: Meal[] = [];
  isEditing = false;
  editableMeal: Meal = { name: '', description: '', price: 0, imageUrl: '' };
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMeals();
  }

  fetchMeals(): void {
    this.http.get<{ data: Meal[] }>('http://localhost:5000/meals').subscribe(
      (response) => {
        this.meals = response.data || [];
      },
      (error) => {
        console.error('Error fetching meals:', error);
      }
    );
  }

  addMeal(): void {
    if (this.editableMeal.name && this.editableMeal.description && this.editableMeal.price && this.editableMeal.imageUrl) {
      this.http.post('http://localhost:5000/meals', this.editableMeal).subscribe(
        () => {
          this.fetchMeals();
          this.resetForm();
        },
        (error) => {
          console.error('Error adding meal:', error);
        }
      );
    }
  }

  editMeal(meal: Meal): void {
    this.isEditing = true;
    this.editableMeal = { ...meal };
  }

  updateMeal(): void {
    if (this.editableMeal._id) {
      this.http.put(`http://localhost:5000/meals/${this.editableMeal._id}`, this.editableMeal).subscribe(
        () => {
          this.fetchMeals();
          this.resetForm();
        },
        (error) => {
          console.error('Error updating meal:', error);
        }
      );
    }
  }

  deleteMeal(mealId: string): void {
    this.http.delete(`http://localhost:5000/meals/${mealId}`).subscribe(
      () => {
        this.fetchMeals();
      },
      (error) => {
        console.error('Error deleting meal:', error);
      }
    );
  }

  resetForm(): void {
    this.isEditing = false;
    this.editableMeal = { name: '', description: '', price: 0, imageUrl: '' };
  }
}
