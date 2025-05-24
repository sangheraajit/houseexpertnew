import { Component } from '@angular/core';
    import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
 
})
export class AppComponent {
  

   constructor(private meta: Meta) { 
    this.meta.addTag({ name: 'description', content: 'Looking for reliable packers and movers in Mumbai? HouseExpert offers safe, fast, and budget-friendly home and office relocation services with expert handling and timely delivery' });
   /*  this.meta.addTags([
      { name: 'keywords', content: 'angular, meta, tags' },
      { name: 'author', content: 'Your Name' }
    ]); */
   }
}
