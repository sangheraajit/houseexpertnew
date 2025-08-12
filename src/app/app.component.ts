import { Component, Renderer2 } from '@angular/core';
    import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
 
})
export class AppComponent {
  

   constructor(private meta: Meta,private router: Router, private renderer: Renderer2) { 
    this.meta.addTag({ name: 'description', content: 'Looking for reliable packers and movers in Mumbai? HouseExpert offers safe, fast, and budget-friendly home and office relocation services with expert handling and timely delivery' });
   /*  this.meta.addTags([
      { name: 'keywords', content: 'angular, meta, tags' },
      { name: 'author', content: 'Your Name' }
    ]); */
   }
    ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const route = event.urlAfterRedirects.split('/')[1] || 'home';
        this.updateBodyClass(route);
      }
    });
  }

  updateBodyClass(route: string) {
    // Remove existing route classes
    document.body.className = '';
    this.renderer.addClass(document.body, `page-${route}`);
  }

   
}
