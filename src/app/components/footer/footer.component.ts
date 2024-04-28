import { Component } from '@angular/core';




@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {


   footerInfo = [
    {
      heading: "Company",
      items: [
        { name: "About us", url: "/about-us" },
        { name: "Terms & conditions", url: "/terms-and-conditions" },
        { name: "Privacy policy", url: "/privacy-policy" },
        { name: "Anti-discrimination policy", url: "/anti-discrimination-policy" },
        { name: "Careers", url: "/careers" }
      ]
    },
    {
      heading: "For Customer",
      items: [
        { name: "Customer Reviews", url: "/customer-reviews" },
        { name: "Blog", url: "/blogs" },
        { name: "FAQ", url: "/faq" },
        { name: "Contact Us", url: "/contact-us" }
      ]
    },
    {
      heading: "Social Links",
      items: [
        
        { name: "../../../assets/images/facebook.svg", url: "https://www.linkedin.com" },
        { name: "../../../assets/images/instagram.svg", url: "https://www.facebook.com" },
        { name: "../../../assets/images/twitter.svg", url: "https://www.twitter.com" },
        { name: "../../../assets/images/youtube.svg", url: "https://www.youtube.com" },
        
        { name: "../../../assets/images/linkedin.svg", url: "https://www.twitter.com" }
      ]
    },
    {
      heading: "We are here",
      items: [
        { name: "Kolkata", url: "/kolkata" },
        { name: "Bangalore", url: "/bangalore" },
        { name: "Mumbai", url: "/mumbai" },
        { name: "Pune", url: "/pune" },
        { name: "Gurgaon", url: "/gurgaon" },
        { name: "Chennai", url: "/chennai" },
        { name: "Ahamdabaad", url: "/ahamdabaad" }
      ]
    }
  ];

}
