import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  plumber = '../../../assets/images/plumber-making.png'
  shapblue ='../../../assets/images/purple-shape.svg'

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
    },
    {
      id:2,
      warranty: '30 DAYS WARRANTY',
      title: 'Deep clean AC service (Window)',
      reviews: '4.83 (1.2M reviews)',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolorullamcorper',
      imageUrl: '../../../assets/images/ac-repairing.png',
      price:"600",
      time:'30 Min'
    },
    {
      id:3,
      warranty: '30 DAYS WARRANTY',
      title: 'Deep clean AC service (Window)',
      reviews: '4.83 (1.2M reviews)',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolorullamcorper',
      imageUrl: '../../../assets/images/ac-repairing.png',
      price:"600",
      time:'30 Min'
    },
  
  ];

}
