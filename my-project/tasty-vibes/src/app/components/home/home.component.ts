/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone:false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  heroImage: string = '/images/homeright.jpg';
  heroText: string = 'Experience the perfect blend of flavors and ambiance.';
  aboutText: string = 'At Tasty Vibes, we believe food is not just about taste, it\'s about creating an experience. From the freshest ingredients to our welcoming atmosphere, we aim to bring people together with every bite.';
  menuItems = [
    { name: 'Original Chicken Ranch', description: 'Grilled chicken, mushrooms, green peppers, onions, mozzarella, pizza sauce and topped with ranch sauce.', image: '/images/photo_5.jpg' },
    { name: 'Shiitake Mushroom', description: 'Sautéed mushroom, cheddar cheese, and creamy mayonnaise spread on top of our pure beef burger patty.', image: '/images/photo_11.jpg' },
    { name: 'Shrimp Love', description: 'pieces shrimp, served with spicy mayonnaise.', image: '/images/photo_14.jpg' }
  ];

  ngOnInit(): void {
    this.heroImage = localStorage.getItem('heroImage') || this.heroImage;
    this.heroText = localStorage.getItem('heroText') || this.heroText;
    this.aboutText = localStorage.getItem('aboutText') || this.aboutText;
    this.menuItems = JSON.parse(localStorage.getItem('menuItems') || '[]') || this.menuItems;
  }
}
