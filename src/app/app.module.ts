import {CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { LayoutComponent } from './layout/layout/layout.component';
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
import { SearchComponent } from './component/search/search.component';
import { IntroComponent } from './pages/home/intro/intro.component';
import { HomeServicesComponent } from './pages/home/home-services/home-services.component';
import { HomeHouseExpertComponent } from './pages/home/home-house-expert/home-house-expert.component';
import { HomeRequestComponent } from './pages/home/home-request/home-request.component';
import { HomeFaqComponent } from './pages/home/home-faq/home-faq.component';
import { StopleaksComponent } from './pages/home/stopleaks/stopleaks.component';
import { BitebackComponent } from './pages/home/biteback/biteback.component';
import { SalonComponent } from './pages/home/salon/salon.component';
import { ChatPopupComponent } from './component/footer/chat-popup/chat-popup.component';
import { ServicesComponent } from './pages/services/services.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { OtpVerificationComponent } from './auth/otp-verification/otp-verification.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { SetPasswordComponent } from './auth/set-password/set-password.component';
import { CheckEmailComponent } from './auth/check-email/check-email.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ServiceDetailsComponent } from './pages/service-details/service-details.component';
import { FailedToPayComponent } from './pages/failed-to-pay/failed-to-pay.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { CartComponent } from './pages/cart/cart.component';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    AboutUsComponent,
    HelpComponent,
    TermsAndConditionsComponent,
    PrivacyPolicyComponent,
    AntiDiscriminationPolicyComponent,
    CareersComponent,
    CustomerReviewsComponent,
    BlogsComponent,
    FaqComponent,
    ContactUsComponent,
    HomeComponent,
    SearchComponent,
    IntroComponent,
    HomeServicesComponent,
    HomeHouseExpertComponent,
    HomeRequestComponent,
    HomeFaqComponent,
    StopleaksComponent,
    BitebackComponent,
    SalonComponent,
    ChatPopupComponent,
    ServicesComponent,
    SignupComponent,
    LoginComponent,
    OtpVerificationComponent,
    ForgotPasswordComponent,
    SetPasswordComponent,
    CheckEmailComponent,
    PasswordResetComponent,
    LandingPageComponent,
    ServiceDetailsComponent,
    FailedToPayComponent,
    ThankYouComponent,
    CartComponent,

  
 

   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
