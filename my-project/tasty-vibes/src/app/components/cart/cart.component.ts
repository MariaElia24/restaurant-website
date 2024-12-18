/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from './cart-item.model';

@Component({
  selector: 'app-cart-page',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  removeItem(itemId: number): void {
    this.cartService.removeFromCart(itemId);
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
    this.totalPrice = 0;
  }

  placeOrder(): void {
    const orderDetails = {
      items: this.cartItems,
      total: this.totalPrice,  
      address: 'Sample address',
      paymentMethod: 'Sample payment method',
    };

    this.cartService.placeOrder(orderDetails)
      .then(() => {
        console.log('Order placed successfully');
        this.cartService.clearCart();
        this.cartItems = [];
        this.totalPrice = 0;
      })
      .catch((error) => {
        console.error('Error placing order:', error);
      });
  }
}