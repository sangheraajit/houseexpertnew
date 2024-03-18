import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-faq',
  templateUrl: './home-faq.component.html',
  styleUrls: ['./home-faq.component.scss']
})
export class HomeFaqComponent {
 


  faqs = [
    { question: 'What services do you offer?', answer: 'Booking is easy! You can book online through our secure website, give us a call at [phone number], or send us an email at [email address].'},
    { question: 'How do I book a service?', answer: 'Booking is easy! You can book online through our secure website, give us a call at [phone number], or send us an email at [email address].' },
    { question: 'How much do your services cost?', answer: 'Booking is easy! You can book online through our secure website, give us a call at [phone number], or send us an email at [email address].'},
    { question: 'Do you offer free quotes or consultations?', answer: 'Booking is easy! You can book online through our secure website, give us a call at [phone number], or send us an email at [email address].' },
    { question: 'For painting services, what types of paint do you use?', answer: 'Booking is easy! You can book online through our secure website, give us a call at [phone number], or send us an email at [email address].' },
    { question: 'For cleaning services, do you use any harsh chemicals?', answer: 'Booking is easy! You can book online through our secure website, give us a call at [phone number], or send us an email at [email address].' },
    { question: 'For AC repair, do you offer 24/7 emergency service?', answer: 'Booking is easy! You can book online through our secure website, give us a call at [phone number], or send us an email at [email address].' },
    { question: 'For carpentry services, do you have experience with custom projects?', answer: 'Booking is easy! You can book online through our secure website, give us a call at [phone number], or send us an email at [email address].' },
   
  ];
  expandedIndex: number = 0;
  toggleAccordion(index: number) {
    this.expandedIndex = this.expandedIndex === index ? 0 : index;
  }
  

}
