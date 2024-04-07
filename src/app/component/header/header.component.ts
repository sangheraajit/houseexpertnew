import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/auth/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private modalService = inject(NgbModal);
  constructor(
    
   
         
  ) {
  }
  openModal() {
    const modalRef = this.modalService.open(LoginComponent);
    //modalRef.componentInstance.user = this.user;
    }

}
