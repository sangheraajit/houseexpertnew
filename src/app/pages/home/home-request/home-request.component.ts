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
  
 
    


  
 

}
