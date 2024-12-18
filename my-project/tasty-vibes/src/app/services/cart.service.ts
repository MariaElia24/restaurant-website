/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  cartItems$: any;

  constructor() {}

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  addtocart(item: CartItem): void {
    const existingItem = this.cartItems.find((i) => i.id === item.id);

    if (existingItem) {
      if (item.quantity > 0) {
        existingItem.quantity += item.quantity;
      } else {
        console.error('Invalid quantity');
      }
    } else {
      if (item.quantity > 0 && item.price > 0) {
        this.cartItems.push(item);
      } else {
        console.error('Invalid item properties');
      }
    }

    console.log('Cart Items:', this.cartItems);
  }

  removeFromCart(itemId: number): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
  }

  clearCart(): void {
    this.cartItems = [];
  }

  placeOrder(orderDetails: { items: CartItem[]; total: number; address: string; paymentMethod: string }): Promise<void> {
    return fetch('http://localhost:5000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetails),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to place order');
      }
      this.clearCart();
    })
    .catch((error) => {
      console.error('Error placing order:', error);
      alert('There was an issue placing your order. Please try again.');
    });
  }
}
