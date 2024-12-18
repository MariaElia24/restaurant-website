/* eslint-disable @typescript-eslint/no-inferrable-types */ 
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, OnInit } from '@angular/core';
import { MealService } from '../../services/meal.service';  // Correct import from the service file
import { CartService } from '../../services/cart.service'; // Import CartService
import { CartItem } from '../cart/cart-item.model';

interface Meal {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-menu',
  standalone: false,
  styleUrls: ['./menu.component.css'],
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  meals: Meal[] = [];
  searchQuery: string = '';  // Variable to hold search query
  filteredMeals: Meal[] = [];  // Holds the filtered meals
  quantity = 0;
  cartcount = 0;

  constructor(private mealService: MealService, private cartService: CartService) {}

  ngOnInit(): void {
    this.mealService.getMeals().subscribe({
      next: (data: any) => {
        console.log('API Response:', data); 
        if (data && data.data) {
          this.meals = data.data; 
          this.filteredMeals = [...this.meals]; 
        } else {
          console.error('Unexpected response structure:', data);
        }
      },
      error: (error: any) => {
        console.error('Error loading meals data', error);
      },
      complete: () => {
        console.log('Meals data loading completed');
      },
    });
  }

  // Method to filter meals based on the search query
  searchMeals(): void {
    console.log('Search Query:', this.searchQuery); // Log the search query to check for any issues
    // Filter meals based on the search query (case insensitive and trim the spaces)
    this.filteredMeals = this.meals.filter(meal =>
      meal.name.toLowerCase().includes(this.searchQuery.trim().toLowerCase()) // Ensure no extra spaces in the query
    );
    console.log('Filtered Meals:', this.filteredMeals); // Log the filtered meals to check the result
  }

  // Counter method to increase meal quantity (for internal use)
  counter(): void {
    this.quantity += 1;
    console.log('Current quantity:', this.quantity);
  }

  // Add a meal to the cart
  addtocart(meal: Meal): void {
    const cartItem: CartItem = {
      id: meal.id,
      name: meal.name,
      price: meal.price,
      quantity: 1,
      imageUrl: meal.imageUrl,
    };

    this.cartService.addtocart(cartItem);
    this.cartcount += 1;
    console.log(`${meal.name} added to cart!`);
  }
}
