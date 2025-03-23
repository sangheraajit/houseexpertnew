import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from "src/app/service/user.service";
import { AuthService } from "src/app/service/auth.service";
import { ToastService } from "src/app/service/toast.service";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
interface IUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  acceptTerms: boolean;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  registerForm!: FormGroup;
  user: IUser | undefined;
  @Input() public phoneNumber: any;
  
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private userservice: UserService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    console.log("Received phoneNumber:", this.phoneNumber); // Debugging

    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [this.phoneNumber || '', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
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
      pcust_name: this.user?.name,
      pcust_pass: this.user?.phone.replace("+91", ""),
      pcust_gender: "M",
      pcust_email: this.user?.email.replace("+91", "") + "@gmail.com",
      pcust_mobile: this.user?.phone.replace("+91", ""),
      pcust_address: this.user?.name,
      pcust_city: 1,
    };
    this.userservice.register(data).subscribe((res: any) => {
      console.log(res);
      this.verifyCustomer()
      /* localStorage.setItem("token", res);
      if (res.Done) {

      } */
    });
  }
  verifyCustomer() {
    // Verify the OTP using the service
    this.userservice.VerifyCustomerExists(this.user?.phone.replace("+91", "")).subscribe(
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
         
        } else {
          this.toastService.showErrorToast('Error', err.error || 'Customer verification failed.');
        }

        // Optionally close the modal with an error result
        this.activeModal.dismiss(loginData);
      }
    );
  }
}
