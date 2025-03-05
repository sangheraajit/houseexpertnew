import { Component, Input, ViewChild, inject } from "@angular/core";
import { LoginComponent } from "../login/login.component";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription, take, timer } from "rxjs";
import { UserService } from "src/app/service/user.service";
import { AuthService } from "src/app/service/auth.service";
import { ToastService } from "src/app/service/toast.service";
import { FormBuilder } from "@angular/forms";
import { NgOtpInputComponent, NgOtpInputConfig } from "ng-otp-input";
import { SignupComponent } from "../signup/signup.component";

@Component({
  selector: "app-otp-verification",
  templateUrl: "./otp-verification.component.html",
  styleUrls: ["./otp-verification.component.scss"],
})
export class OtpVerificationComponent {
  private modalService = inject(NgbModal);
  countDown!: Subscription;
  counter = 60;
  tick = 1000;
  @Input() public phoneNumber: any;
  otp: string | undefined;
  OptResponse: any;
  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput:
    | NgOtpInputComponent
    | undefined;
  otpconfig: NgOtpInputConfig = {
    allowNumbersOnly: false,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: "",
  };
  constructor(
    public activeModal: NgbActiveModal,
    private formbuilder: FormBuilder,
    private userservice: UserService,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.countDown = timer(0, this.tick)
      .pipe(take(this.counter))
      .subscribe(() => {
        --this.counter;
        // console.log(this.counter);
        if (this.counter == 0) {
          this.countDown.unsubscribe();
        }
      });
  }
  verifyLoginCode() {
    // Verify the OTP using the service
    this.userservice.VerifyOPT(this.phoneNumber, this.otp).subscribe(
      (res: any) => {
        console.log('VerifyOPT Response:', res);
        const loginData = { iserror: false, data: res.message };
        this.activeModal.close(loginData);
      },
      (err: any) => {
        console.log('VerifyLoginCode Error:', err);

        // Prepare the error object
        const loginData = { iserror: true, data: err };

        // Display error toast based on status
        if (err.status === 404 && err.error === 'Invalid user name or user pin.') {
          //this.toastService.showErrorToast('Error', 'Invalid username or OTP.');
          

        } else {
          this.toastService.showErrorToast('Error', err.error || 'OTP verification failed.');
        }

        // Optionally close the modal with an error result
        this.activeModal.dismiss(loginData);
      }
    );
  }
  
  onOtpChange(otp: string | undefined) {
    this.otp = otp;
  }
  backtoLogin() {
    //modalRef.componentInstance.user = this.user;
    this.activeModal.close(true);
    const modalRef = this.modalService.open(LoginComponent, {
      size: "lg",
      centered: true,
    });

    //modalRef.componentInstance.user = this.user;
  }
}
