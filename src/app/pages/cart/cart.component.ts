
import { Component } from '@angular/core';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
 
})
export class CartComponent {

slider =[
    { name: 'Painting Services', icon: '../../../assets/images/home-services/painting.svg', price:'1200.00', bgColor:'pink' },
    { name: 'Cleaning Services', icon: '../../../assets/images/home-services/cleaning.svg', price:'1200.00', bgColor:'blue' },
    { name: 'Estate Agents & Rental Agreement', icon: '../../../assets/images/home-services/estate.svg', price:'1200.00', bgColor:'pink' },
    { name: 'Electrician & AC Services', icon: '../../../assets/images/home-services/electrician.svg', price:'1200.00', bgColor:'blue' },
    { name: 'Carpentry & Plumbing Services', icon: '../../../assets/images/home-services/carpentry.svg', price:'1200.00', bgColor:'pink' },
    { name: 'Packers and Movers Services', icon: '../../../assets/images/home-services/packers.svg' , price:'1200.00', bgColor:'blue'},
    { name: 'Pest Control Services', icon: '../../../assets/images/home-services/pest-control.svg', price:'1200.00', bgColor:'pink' },
    { name: 'Beauty Parlour & Barber Service', icon: '../../../assets/images/home-services/beauty.svg', price:'1200.00', bgColor:'blue' }
];


offer =[
  { title: '20% off on Kotak Silk cards', desc:'20% off on Kotak Silk cards' },
  { title: 'Assured cashback on Paytm', desc:'Flat 30 Cashback' },
  { title: 'Assured cashback on CRED', desc:'Get Cashback of ₹10' },
  { title: '15% off on Kotak Debit cards', desc:'15% off up to INR 250' }
  ]
 

}


