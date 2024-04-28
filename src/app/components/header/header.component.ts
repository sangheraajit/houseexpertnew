import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { AuthService } from 'src/app/service/auth.service';
import { ToastService } from 'src/app/service/toast.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private modalService = inject(NgbModal);
  displayName = "Ajit";
  formModal: any;
  currentUser: any;
  isAuthenticated: boolean = false;

  private subscription: Subscription = new Subscription();
  isLoggedIn: boolean = false;
  username: string = "";
  constructor(
    public userService: UserService,
    public router: Router,
    //public layoutService: LayoutService,
    private authService: AuthService,
    private messageService: ToastService
  ) {}
  ngOnInit() {
    this.subscription = this.authService.user.subscribe(() => {
      this.isLoggedIn = true;
      // Fetch the username from your authentication service or wherever it's stored
      this.currentUser = this.authService.currentUserValue;
      this.isAuthenticated = this.authService.isLoggedIn();
    });

    console.log("this.customerinformation currentUser", this.currentUser);
  }
  openModal() {
    const modalRef = this.modalService.open(LoginComponent, {
      size: "lg",
      centered: true,
    });
    //modalRef.componentInstance.user = this.user;
  }
  logout() {
    this.authService.purgeAuth();
    this.router.navigate([""]);
  }
  booking() {
    this.isAuthenticated
      ? this.router.navigate(["bookinglist"])
      : this.openModal();
  }
  Profile() {
    console.log("Profile");
    //this.isAuthenticated
    //   ?
    this.router.navigate(["profile"]);
    //  : this.openAnotherModal(0);
  }
}
