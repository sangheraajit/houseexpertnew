import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-packers-and-movers-faq',
  templateUrl: './packers-and-movers-faq.component.html',
  styleUrls: ['./packers-and-movers-faq.component.scss']
})
export class PackersAndMoversFaqComponent {
 


  faqs = [
    { question: 'Do you handle packing, loading, transportation, and unloading? ', answer: '"Yes, we at [House Expert Packers and Movers Pvt Ltd.] handle the entire process from start to finish. Our services include professional packing, secure loading, reliable transportation, and careful unloading of your belongings. Our team ensures that your items are packed safely with the highest quality materials, transported with care, and unloaded efficiently at your new location. We aim to make your move as smooth and hassle-free as possible."'},
    { question: 'Do you offer specialized packing for fragile items like electronics or artwork?', answer: '"Yes, we offer specialized packing services for fragile items such as electronics, artwork, antiques, and other delicate belongings. Our experienced team uses high-quality materials like bubble wrap, foam padding, and custom crates to ensure that your fragile items are packed securely and safely for transit. We understand the importance of these valuables and take extra care to protect them during the moving process, providing you with peace of mind throughout the move."' },
    { question: 'Do you provide dismantling and reassembly of furniture? ', answer: '"Yes, we provide dismantling and reassembly services for furniture. Our trained team will carefully dismantle large or complex furniture pieces, such as beds, wardrobes, and tables, ensuring they are safely packed and transported. Upon reaching your new location, we will reassemble all your furniture with the same care and precision, making sure everything is set up just as it was before. This service is designed to make your move even more convenient and hassle-free."'},
    { question: 'What type of vehicles do you use for moving (e.g., small trucks, large trucks, container trucks)? ', answer: 'At our packers and movers company, we use a variety of vehicles, including:- Small trucks (Tata Ace, Maruti Suzuki Super Carry)- Medium trucks (Tata 407, Ashok Leyland Dost)- Large trucks (Tata 709, Ashok Leyland Ecomet)- Container trucks (20ft, 40ft)' },
    { question: 'How do you handle large or heavy items? ', answer: '"We specialize in moving large and heavy items, such as furniture, appliances, pianos, and machinery. Our team is trained to handle these items safely and efficiently. We use specialized equipment, such as dollies, ramps, and lifting straps, to ensure secure lifting and transportation. For especially heavy or bulky items, we may also utilize additional manpower to prevent any damage. Our goal is to move your large or heavy items with care, ensuring they arrive safely at your new location without any hassle.' },
    { question: 'Are packers worth it for moving?', answer: '"Yes, hiring professional packers and movers is definitely worth it for many reasons. Our expert team ensures that your belongings are packed securely, transported safely, and unloaded efficiently, which can save you a lot of time and effort. Moving can be a stressful experience, and we aim to make it hassle-free by taking care of everything for you, from packing delicate items to dismantling and reassembling furniture. Plus, with the right equipment and expertise, we can prevent damage to your items, unlike if you were to handle everything on your own. In the end, investing in professional movers not only saves you time but also gives you peace of mind, knowing your move is being handled by experts."' },
    { question: 'Do Packers and Movers Pack Everything ?', answer: 'Yes, they do. Packers will wrap up all items you want moved; nothing’s off-limits unless it’s hazardous or illegal.' },
    { question: 'How many laborers will be assigned to my move based on the volume of items? ', answer: 'Here\'s a general guideline:- Small move (1-2 rooms): 2-3 laborers- Medium move (2-4 rooms): 4-5 laborers- Large move (4-6 rooms): 6-8 laborers- Extra-large move (more than 6 rooms): 8-10 laborers or more, depending on the volume of items.' },
   
  ];
  expandedIndex: number = 0;
  toggleAccordion(index: number) {
    this.expandedIndex = this.expandedIndex === index ? 0 : index;
  }
  

}
