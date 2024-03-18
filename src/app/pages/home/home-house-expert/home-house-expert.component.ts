import { Component } from '@angular/core';

@Component({
  selector: 'app-home-house-expert',
  templateUrl: './home-house-expert.component.html',
  styleUrls: ['./home-house-expert.component.scss'],
})
export class HomeHouseExpertComponent {
  expertservices = [
    {
      id: '1',
      name: 'Fresh Coat. Fresh Start.',
      description: 'Transform your space with a splash of color.',
    },
    {
      id: '2',
      name: 'Spark Joy. Not Sweat.',
      description: 'Let us handle the grime, you enjoy the shine.',
    },
    {
      id: '3',
      name: 'Crafting Your Dreams.',
      description: 'From built-ins to repairs, we build beauty into your space',
    },
    {
      id: '4',
      name: 'Keep Cool. Stay Comfy.',
      description: 'Breathe easy knowing your AC is always in tip-top shape.',
    },
    {
      id: '5',
      name: 'Power Up Your Life.',
      description: 'We’ll illuminate your world, one spark at a time',
    },
  ];
}
