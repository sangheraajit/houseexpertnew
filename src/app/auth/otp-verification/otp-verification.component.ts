import { Component, Input, ViewChild, inject } from "@angular/core";
import { LoginComponent } from "../login/login.component";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription, take, timer } from "rxjs";
import { UserService } from "src/app/service/user.service";
import { AuthService } from "src/app/service/auth.service";
import { ToastService } from "src/app/service/toast.service";
import { FormBuilder } from "@angular/forms";
import { NgOtpInputComponent, NgOtpInputConfig } from "ng-otp-input";

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
    //this.isOtpSent=false;
    this.userservice.VerifyOPT(this.phoneNumber, this.otp).subscribe(
      (res: any) => {
        // this.ShowCreateAccount = false;
        console.log("VerifyOPT OptResponse res" + res);
        console.log("VerifyOPT OptResponse res" + res.status);
        this.OptResponse = res;
        console.log("VerifyOPT OptResponse " + this.OptResponse);

        this.authService.setUser(this.OptResponse);

        localStorage.setItem("token", this.OptResponse.token);
        localStorage.setItem("custid", res.id);
        var logindata = {
          iserror: false,
          data: this.OptResponse,
        };
        this.activeModal.close(logindata);
        // this.ref.close(logindata);
        //this.router.navigate(['']);

        // this.storageService.set('OptResponse', this.OptResponse);
      },
      (data: any) => {
        console.log("verifyLoginCode", data);
        if (
          data.status == 404 &&
          data.error == "Invalid user name or user pin."
        ) {
          var logindata = {
            iserror: false,
            data: data,
          };
          //this.ref.close(logindata);
        } else {
          // this.ref.close(data);
          var logindata = {
            iserror: true,
            data: data,
          };

          /*  this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: data.error,
          }); */
          // this.ref.close(logindata);
        }
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
