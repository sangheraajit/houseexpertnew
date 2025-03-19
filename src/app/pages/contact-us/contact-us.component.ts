import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
 
    contactForm: FormGroup;
    submitted = false;
  
    constructor(private fb: FormBuilder) {
      this.contactForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        message: ['', [Validators.required, Validators.minLength(10)]]
      });
    }
  
    onSubmit() {
      if (this.contactForm.valid) {
        console.log('Form Data:', this.contactForm.value);
        this.submitted = true;
        this.contactForm.reset();
        setTimeout(() => this.submitted = false, 5000); // Hide success message after 5 sec
      }
    }
}
