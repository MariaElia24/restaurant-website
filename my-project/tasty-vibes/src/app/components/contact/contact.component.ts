import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { ContactService } from '../../services/contact.service';

// eslint-disable-next-line @angular-eslint/prefer-standalone
@Component({
  selector: 'app-contact',
  standalone:false,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitted = false;

  constructor(private contactService: ContactService) {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required, Validators.minLength(10)]),
    });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngOnInit(): void {}

  onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }

    this.isSubmitted = true;

    this.contactService.submitContactForm(this.contactForm.value).subscribe({
      next: (response) => {
        console.log('Data submitted successfully', response);
        alert('Thank you for your message!');
        this.contactForm.reset(); 
        this.isSubmitted = false;
      },
      error: (error) => {
        console.error('Error submitting data', error);
        alert('Sorry, something went wrong!');
        this.isSubmitted = false;
      }
    });
  }    
}