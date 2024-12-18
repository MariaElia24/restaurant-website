/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-place-order',
  standalone: false,
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
})
export class PlaceOrderComponent implements OnInit {
  orderItems: any[] = [];
  totalPrice: number = 0;
  orderDetails: any = {
    address: '',
    paymentMethod: '',
  };
  imageUrl!: any[];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.orderItems = this.cartService.getCartItems();
    this.totalPrice = this.orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  confirmOrder(): void {
    if (!this.orderDetails.address || !this.orderDetails.paymentMethod) {
      alert('Please fill in all the order details (address and payment method).');
      return;
    }

    const orderData = {
      items: this.orderItems,
      total: this.totalPrice,
      address: this.orderDetails.address,
      image: this.imageUrl,
      paymentMethod: this.orderDetails.paymentMethod,
    };

    this.cartService.placeOrder(orderData)
      .then(() => {
        console.log('Order confirmed successfully');
        this.cartService.clearCart();
        this.orderItems = [];
        this.totalPrice = 0;
        this.orderDetails = { address: '', paymentMethod: '' };
        alert('Order placed successfully!');
      })
      .catch((error) => {
        console.error('Error confirming order:', error);
        alert('Failed to confirm the order. Please try again.');
      });
  }
}