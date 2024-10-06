import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-request',
  templateUrl: './home-request.component.html',
  styleUrls: ['./home-request.component.scss']
})


export class HomeRequestComponent {
  

  @Input() subtitle:any;
  @Input() title:any;
  @Input() titleshort:any;
  @Input() description:any;
  @Input() btntext:any;
  @Input() path:any;
  @Input() bgColor: any;
  @Input() order: any;
  @Input() col: any;
  @Input() colContent: any;
  @Input() shapPath: any;
  @Input() shapeposition: any;
  @Input() outsideimg:any
  @Input() shapeScale:any
  @Input() spaimg:any
  @Input() spaPosition:any
  @Input() fontsize:any
  @Input() layout: string = '';  // layout class (mobile-layout or desktop-layout)
  @Input() isImageTop: boolean = false; // New flag to control text positioning
  @Input() shapeTopPosition: string = '50%'; // New input for dynamic top position
  @Input() isImageOnTopOfShape: boolean = false; // New input to control if image should be above shape
  @Input() height: string = '350px'; // New input for dynamic height
  
 
    


  
 

}
