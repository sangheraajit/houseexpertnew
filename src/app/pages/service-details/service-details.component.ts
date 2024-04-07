import { Component } from '@angular/core';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent {
  plumber = '../../../assets/images/plumber-making.png';
  shapblue ='../../../assets/images/purple-shape.svg';

  services = [
    {
      id:1,
      warranty: '30 DAYS WARRANTY',
      title: 'Deep clean AC service (Window)',
      reviews: '4.83 (1.2M reviews)',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolorullamcorper',
      imageUrl: '../../../assets/images/ac-repairing.png',
      price:"600",
      time:'30 Min'
    }
   
  
  ];

  faqs = [
    { question: 'What services do you offer?', answer: 'Booking is easy! You can book online through our secure website, give us a call at [phone number], or send us an email at [email address].'},
    { question: 'How do I book a service?', answer: 'Booking is easy! You can book online through our secure website, give us a call at [phone number], or send us an email at [email address].' },
    { question: 'How much do your services cost?', answer: 'Booking is easy! You can book online through our secure website, give us a call at [phone number], or send us an email at [email address].'},
    { question: 'Do you offer free quotes or consultations?', answer: 'Booking is easy! You can book online through our secure website, give us a call at [phone number], or send us an email at [email address].' },
    
  ];
  expandedIndex: number = 1;
  toggleAccordion(index: number) {
    this.expandedIndex = this.expandedIndex === index ? 1 : index;
  }
  

}
