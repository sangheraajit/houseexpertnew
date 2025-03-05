import { Component, inject } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { OtpVerificationComponent } from "../otp-verification/otp-verification.component";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { Subscription, take, timer } from "rxjs";
import { UserService } from "src/app/service/user.service";
import { AuthService } from "src/app/service/auth.service";
import { ToastService } from "src/app/service/toast.service";
import { SignupComponent } from "../signup/signup.component";
interface IUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  acceptTerms: boolean;
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  private modalService = inject(NgbModal);
  loginForm: FormGroup | any;
  separateDialCode = true;
  /* SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.India];
  onlyCountries: CountryISO[] = [CountryISO.India]; */
  verificationCode: any = null;
  otp: string | undefined;
  showOtpComponent = true;
  phoneNumber: any;
  phoneNumberLast4Digit: any;
  CountryCode: any;
  OptResponse: any;
  registerForm!: FormGroup;
  /* @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput:
    | NgOtpInputComponent
    | undefined;
  otpconfig: NgOtpInputConfig = {
    allowNumbersOnly: false,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
  }; */

  public submitted: boolean = false;
  fieldRequired: string = "This field is required";

  ShowMobileinput: boolean = true;
  ShowOtpInput = false;
  user: IUser;
  ShowCreateAccount: boolean = false;
  constructor(
    public activeModal: NgbActiveModal,
    private formbuilder: FormBuilder,
    private userservice: UserService,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.user = {} as IUser;
    this.loginForm = new FormGroup({
      /*  email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(
          '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
        ),]),
        password: new FormControl('', [Validators.required,Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
        )]) */

      phoneNumber: new FormControl(undefined, [Validators.required]),
    });
    this.registerForm = new FormGroup({
      name: new FormControl(this.user.name, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),

      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
        //       emailValidator(),
      ]),
      // phone: new FormControl(this.user.phone, [Validators.required]),
      /*  password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(4),
      ]), */
      acceptTerms: new FormControl(this.user.acceptTerms, [
        Validators.required,
      ]),
    });
  }
  get f() {
    return this.registerForm.controls;
  }
  get name() {
    return this.registerForm.get("name")!;
  }

  get phone() {
    return this.registerForm.get("phone")!;
  }

  get email() {
    return this.registerForm.get("email")!;
  }

  get password() {
    return this.registerForm.get("password")!;
  }
  get acceptTerms() {
    return this.registerForm.get("acceptTerms")!;
  }
  openModal() {
    // Close any active modal if open
    this.activeModal?.close(true);

    // Open OTP verification modal
    const modalRef = this.modalService.open(OtpVerificationComponent, {
      size: 'lg',
      centered: true,
    });

    // Pass data (phone number) to the OTP component
    modalRef.componentInstance.phoneNumber = this.loginForm.value.phoneNumber;

    // Handle the result when the modal is closed
    modalRef.result
      .then((result) => {
        console.log('OTP Modal Result:', result);
        if (result && !result.iserror) {
       //   this.toastService.showSuccessToast('info', 'You are logged in successfully');
         // window.location.reload();
         this.verifyCustomer();
        }
      })
      .catch((err) => {
        console.error('Modal dismissed with error:', err);
        this.toastService.showErrorToast('Error', 'Failed to verify OTP.');
      });
  }

  verifyCustomer() {
    // Verify the OTP using the service
    this.userservice.VerifyCustomerExists(this.phoneNumber).subscribe(
      (res: any) => {
        console.log('VerifyCustomerExists:', res);

        // Set user data in auth service
        this.authService.setUser(res);

        // Close the modal with success result
        const loginData = { iserror: false, data: res };
        this.activeModal.close(loginData);
      },
      (err: any) => {
        console.log('VerifyCustomerExists Error:', err);

        // Prepare the error object
        const loginData = { iserror: true, data: err };

        // Display error toast based on status
        if (err.status === 404 && err.error === 'Customer Not Found') {
          //this.toastService.showErrorToast('Error', 'Invalid username or OTP.');
          this.openSignupModal();

        } else {
          this.toastService.showErrorToast('Error', err.error || 'Customer verification failed.');
        }

        // Optionally close the modal with an error result
        this.activeModal.dismiss(loginData);
      }
    );
  }

  
  SendOPT() {
    const { email, password, phone } = this.loginForm.value;
    this.submitted = true;

    if (this.loginForm.valid) {
      this.submitted = false;

      /*  this.phoneNumber = this.loginForm.value.phoneNumber?.e164Number;
        this.CountryCode = this.loginForm.value.phoneNumber?.dialCode;
        this.phoneNumberLast4Digit = this.phoneNumber.substring(
          this.phoneNumber.length - 4
        ); */
      this.phoneNumber = this.loginForm.value.phoneNumber;


      this.userservice.SendOPT(this.phoneNumber).subscribe(
        (res: any) => {
          this.ShowCreateAccount = false;
          console.log("OptResponse res" + res);
          if (res.success) {
            this.OptResponse = res.data;
            this.ShowMobileinput = false;
            this.ShowOtpInput = true;
            this.ShowCreateAccount = false;
            console.log("OptResponse " + this.OptResponse);
            this.openModal();
            // this.storageService.set('OptResponse', this.OptResponse);
          } else {
            /* this.messageService.add({
                severity: 'error',
                summary: 'Request',
                detail: 'Error in sending sms',
              }); */
            this.toastService.showErrorToast("error", "Error in sending sms");
          }
        },
        (data: any) => {
          console.log("SendOPT error  ", data);
          if (
            data.status == 404 &&
            data.error == "Invalid user name or user pin."
          ) {
            this.ShowCreateAccount = true;
            this.ShowMobileinput = false;
            this.ShowOtpInput = false;
            this.openSignupModal();
          } else if (data.status == 400) {
            /*               this.messageService.add({
                severity: 'error',
                summary: 'Request',
                detail: 'Error in sending sms',
              }); */
            this.toastService.showErrorToast("error", "Error in sending sms");
          } else {
            /* this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: data.Error,
              }); */
            this.toastService.showErrorToast("error", data.Error);
          }
        }
      );
    }
  }

  onOtpChange(otp: string | undefined) {
    this.otp = otp;
  }

  public validate(): void {
    if (this.registerForm.invalid) {
      for (const control of Object.keys(this.registerForm.controls)) {
        this.registerForm.controls[control].markAsTouched();
      }
      return;
    }

    this.user = this.registerForm.value;
    let data = {
      spname: "customer_save",
      ptype: "save",
      pcust_name: this.user.name,
      pcust_pass: this.phoneNumber.replace("+91", ""),
      pcust_gender: "M",
      pcust_email: this.phoneNumber.replace("+91", "") + "@gmail.com",
      pcust_mobile: this.phoneNumber.replace("+91", ""),
      pcust_address: this.user.name,
      pcust_city: 1,
    };
    this.userservice.register(data).subscribe((res: any) => {
      console.log(res);
      localStorage.setItem("token", res);
      if (res.Done) {
        this.SendOPT();
        /*   let data = {
            spname: 'getpasswordcheckcustomer_sp',
            pname: this.user.email,
            ppass: this.user.password,
          };
          this.userservice.login(data).subscribe((res1: any) => {
            console.log(res1);
            this.authService.setUser(res1);
            localStorage.setItem('token', res1);
            localStorage.setItem('custid', res1.id);
            this.ref.close();
            var logindata = {
              iserror: false,
              data: data,
            };
          //  this.router.navigate(['']);
            //window.location.reload();
          });*/
        // this.ref.close();
      }
    });
  }
  openSignupModal() {
    // Close any active modal if open
    this.activeModal?.close(true);

    // Open OTP verification modal
    const modalRef = this.modalService.open(SignupComponent, {
      size: 'lg',
      centered: true,
    });

    // Pass data (phone number) to the OTP component
    modalRef.componentInstance.phoneNumber = this.phoneNumber;

    // Handle the result when the modal is closed
    modalRef.result
      .then((result) => {
        console.log('OTP Modal Result:', result);
        if (result && !result.iserror) {
          //this.toastService.showSuccessToast('info', 'You are logged in successfully');
         //window.location.reload();
         
        }
      })
      .catch((err) => {
        console.error('Modal dismissed with error:', err);
        this.toastService.showErrorToast('Error', 'Failed to verify OTP.');
      });
  }
}
