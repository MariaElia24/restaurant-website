/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-home',
  standalone: false,
  templateUrl: './manage-home.component.html',
  styleUrls: ['./manage-home.component.css']
})
export class ManageHomeComponent implements OnInit {
  heroImage: string = '/images/homeright.jpg';
  heroText: string = 'Experience the perfect blend of flavors and ambiance.';
  aboutText: string = 'At Tasty Vibes, we believe food is not just about taste, it\'s about creating an experience. From the freshest ingredients to our welcoming atmosphere, we aim to bring people together with every bite.';
  menuItems = [
    { name: 'Original Chicken Ranch', description: 'Grilled chicken, mushrooms, green peppers, onions, mozzarella, pizza sauce and topped with ranch sauce.', image: '/images/photo_5.jpg' },
    { name: 'Shiitake Mushroom', description: 'Sautéed mushroom, cheddar cheese, and creamy mayonnaise spread on top of our pure beef burger patty.', image: '/images/photo_11.jpg' },
    { name: 'Shrimp Love', description: 'Pieces shrimp, served with spicy mayonnaise.', image: '/images/photo_14.jpg' }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:5000/getData')
      .subscribe(data => {
        this.heroImage = data.heroImage;
        this.heroText = data.heroText;
        this.aboutText = data.aboutText;
        this.menuItems = data.menuItems;
      });
  }

  saveChanges(): void {
    const data = {
      heroImage: this.heroImage,
      heroText: this.heroText,
      aboutText: this.aboutText,
      menuItems: this.menuItems
    };

    this.http.post('http://localhost:5000/saveData', data) 
      .subscribe(
        response => {
          alert('Changes saved successfully!');
        },
        error => {
          console.error('Error saving data:', error);
          alert('Error saving changes. Please try again later.');
        }
      );
  }
}
