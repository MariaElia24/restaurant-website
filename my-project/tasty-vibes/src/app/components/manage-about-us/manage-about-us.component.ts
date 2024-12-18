/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-about-us',
  standalone:false,
  templateUrl: './manage-about-us.component.html',
  styleUrls: ['./manage-about-us.component.css']
})
export class ManageAboutUsComponent implements OnInit {
  aboutUsContent = {
    description: '',
    imageUrl: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('/api/about-us').subscribe((data: any) => {
      this.aboutUsContent = data;
    });
  }

  saveAboutUsContent(): void {
    this.http
      .post('/api/about-us', this.aboutUsContent)
      .subscribe(
        (response) => console.log('About Us content saved', response),
        (error) => console.error('Error saving About Us content', error)
      );
  }
}
