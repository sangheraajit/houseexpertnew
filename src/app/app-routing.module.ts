import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HelpComponent } from './pages/help/help.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { AntiDiscriminationPolicyComponent } from './pages/anti-discrimination-policy/anti-discrimination-policy.component';
import { CareersComponent } from './pages/careers/careers.component';
import { CustomerReviewsComponent } from './pages/customer-reviews/customer-reviews.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';
//import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ServiceDetailsComponent } from './pages/service-details/service-details.component';
import { LoginComponent } from './auth/login/login.component';
import { OtpVerificationComponent } from './auth/otp-verification/otp-verification.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { CheckEmailComponent } from './auth/check-email/check-email.component';
import { SetPasswordComponent } from './auth/set-password/set-password.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { FailedToPayComponent } from './pages/failed-to-pay/failed-to-pay.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { CartComponent } from './pages/cart/cart.component';
import { LandingPageComponent } from './pages/packers-and-movers/landing-page/landing-page.component';
import { MoverPakersStepsComponent } from './pages/packers-and-movers/mover-pakers-steps/mover-pakers-steps.component';
//import { MoverPakersStepsComponent } from './pages/mover-pakers-steps/mover-pakers-steps.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'landing-page', component: LandingPageComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'service-details', component: ServiceDetailsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'help', component: HelpComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'register', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'otp', component: OtpVerificationComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'checkmail', component: CheckEmailComponent },
  { path: 'set-password', component: SetPasswordComponent },
  { path: 'reset-password', component: PasswordResetComponent },
  { path: 'failed-payment', component: FailedToPayComponent },
  { path: 'thankyou', component: ThankYouComponent },
  { path: 'cart', component: CartComponent },

  {
    path: 'anti-discrimination-policy',
    component: AntiDiscriminationPolicyComponent,
  },
  { path: 'careers', component: CareersComponent },
  { path: 'customer-reviews', component: CustomerReviewsComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'mover-steps', component: MoverPakersStepsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
