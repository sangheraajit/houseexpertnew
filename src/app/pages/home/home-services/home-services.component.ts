import { Component } from '@angular/core';


@Component({
  selector: 'app-home-services',
  templateUrl: './home-services.component.html',
  styleUrls: ['./home-services.component.scss']
})
export class HomeServicesComponent {
  services = [
    { name: 'Painting Services', icon: '../../../assets/images/home-services/painting.svg' },
    { name: 'Cleaning Services', icon: '../../../assets/images/home-services/cleaning.svg' },
    { name: 'Estate Agents & Rental Agreement', icon: '../../../assets/images/home-services/estate.svg' },
    { name: 'Electrician & AC Services', icon: '../../../assets/images/home-services/electrician.svg' },
    { name: 'Carpentry & Plumbing Services', icon: '../../../assets/images/home-services/carpentry.svg' },
    { name: 'Packers and Movers Services', icon: '../../../assets/images/home-services/packers.svg',url:'landing-page' },
    { name: 'Pest Control Services', icon: '../../../assets/images/home-services/pest-control.svg' },
    { name: 'Beauty Parlour & Barber Service', icon: '../../../assets/images/home-services/beauty.svg' }
  ];
  cities = [
    { name: "Kolkata", url: "/kolkata" },
    { name: "Bangalore", url: "/bangalore" },
    { name: "Mumbai", url: "/mumbai" },
    { name: "Pune", url: "/pune" },
    { name: "Gurgaon", url: "/gurgaon" },
    { name: "Chennai", url: "/chennai" },
    { name: "Ahamdabaad", url: "/ahamdabaad" }
  ]
  selectedOption: string | undefined;
}
