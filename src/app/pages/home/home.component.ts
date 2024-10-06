import { Component, HostListener } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  isMobile: boolean = false; // Flag for mobile view
  plumber = "../../../../assets/images/plumber-making.png";
  cheerful = "../../../../assets/images/cheerful-delivery.png";
  tender = "../../../../assets/images/tender.png";
  
  
  HomeValuation="../../../../assets/images/hand-presenting.png";

  shapblue = "../../../../assets/images/purple-shape.svg";
  shappink = "../../../../assets/images/pink-shape.svg";
  // Mobile image paths
  plumberMobile = "../../../../assets/images/plumber-making-phone-gesture@2x.png";
  cheerfulMobile = "../../../../assets/images/cheerful-delivery-man-with-parcels@2x.png";
  homHomeValuationMobile="../../../../assets/images/hand-presenting-model-house-home-loan-campaign@2x.png"
  // Listen for window resize event
  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.checkScreenSize();
  }

  // Method to check if the screen size is mobile
  checkScreenSize() {
    const screenWidth = window.innerWidth;
    this.isMobile = screenWidth <= 767; // Define mobile as 767px or less
    if (this.isMobile) {
      // Change image sources for mobile view
      this.plumber = this.plumberMobile;
      this.cheerful = this.cheerfulMobile;
      this.HomeValuation=this.homHomeValuationMobile;
      console.log("mobile view", this.plumber);
    } 
    else
    {
      console.log("mobile view else", this.plumber);
    }
  }
  

  ngOnInit() {
    this.checkScreenSize();
  }
}
