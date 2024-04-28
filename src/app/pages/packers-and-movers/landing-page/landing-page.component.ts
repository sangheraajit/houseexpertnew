import {
  Component,
  ElementRef,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from "@angular/core";
import { Router } from "@angular/router";

import { Subscription } from "rxjs";

import { GoogleMap } from "@angular/google-maps";

import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";

import * as moment from "moment";
import { SubcategoryService } from "src/app/service/subcategory.service";
import { GoogleAddressService } from "src/app/service/google-address.service";
import { CartService } from "src/app/service/cart.service";
import { httpService } from "src/app/service/http.service";
import { OrderService } from "src/app/service/order.service";
import { StorageService } from "src/app/service/storage.service";
import { UserService } from "src/app/service/user.service";
import { AuthService } from "src/app/service/auth.service";
import { LoginComponent } from "src/app/auth/login/login.component";
import { NgbDate, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastService } from "src/app/service/toast.service";
import { environment } from "src/environments/environment";
import { MoverPakersStepsComponent } from "../mover-pakers-steps/mover-pakers-steps.component";
import { OtpVerificationComponent } from "src/app/auth/otp-verification/otp-verification.component";

//import {  LoadingService } from 'src/app/service/interceptor/loading.service';
// import { Location } from '@angular/common';

export interface StepType {
  label: string;
  fields: any[];
}
declare var Razorpay: any;

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"],
})
export class LandingPageComponent {
  truck = "../../../../assets/images/truck.png";
  cheerful = "../../../../assets/images/cheerful-delivery.png";
  tender = "../../../../assets/images/tender.png";
  shapblue = "../../../../assets/images/arrow-light.png";
  shappink = "../../../../assets/images/pink-shape.svg";
  outsideplace = "../../../../assets/images/hand-presenting.png";

  bookingInformation: any;
  jheader: any;

  //items!: MenuItem[];
  activeIndex: number = 0;
  //Citylist: any;
  Options!: any[];
  subscription!: Subscription;
  userAddress: string = "";
  userLatitude: string = "";
  userLongitude: string = "";
  ShowTokenAmount = false;
  display: boolean = false;
  displaystep2: boolean = false;
  displaystep3: boolean = false;
  displaystep4: boolean = false;
  displaystep5: boolean = false;
  displaystep6: boolean = false;
  displaystep7: boolean = false;
  submitted: boolean = true;
  currentStep = 1;
  value3: any;
  selectedcss = "";
  //Local Variable defined
  formattedaddress = " ";

  @ViewChild("searchfrom")
  public searchFromElementRef!: ElementRef;
  @ViewChild("searchto")
  public searchToElementRef!: ElementRef;
  @ViewChild(GoogleMap)
  public map!: GoogleMap;

  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDefaultUI: true,
    fullscreenControl: true,
    disableDoubleClickZoom: true,
    mapTypeId: "hybrid",
    // maxZoom:this.maxZoom,
    // minZoom:this.minZoom,
  };
  fromlatitude!: any;
  fromlongitude!: any;
  tolatitude!: any;
  tolongitude!: any;
  NextButtonLabel = "Next";
  fromcity = "";
  tocity = "";

  phone: string = "";

  Mainform!: FormGroup;
  //@ViewChild('ref') ref!: any;
  @Input() Articlemstlist: any;
  @Input() Citylist: any;
  @Input() PackageList: any;
  DistanceKM: any;
  isAuthenticated: boolean = false;
  currentUser: any;
  //ref: DynamicDialogRef = new DynamicDialogRef();
  isPaymentPending = true;
  private modalService = inject(NgbModal);
  phoneNumber: any;
  OptResponse: any;
  dateValue!: Date;
  minDate: any;
  jcustomer: any;
  constructor(
    public SubcategoryService: SubcategoryService,
    private router: Router,
    //private dialogService: DialogService,
    private ngZone: NgZone,
    private googleAddressService: GoogleAddressService,
    public cart: CartService,
    public apiservice: httpService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private orderService: OrderService,
    public storage: StorageService,
    public userService: UserService,
    private authService: AuthService // private location1: Location //public loader:LoadingService
  ) {
    /*  this.SubcategoryService.getAllarticle('', '').subscribe((res: any) => {
       console.log('getAllarticle', res);
       this.Articlemstlist = res;

     });; */
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    };
    this.storage.delete("mycart");
    // this.items = this.SubcategoryService.items;
    this.bookingInformation = this.SubcategoryService.getBookingInformation();
    this.jheader = this.bookingInformation.jheader[0];
    this.Options = this.SubcategoryService.Options;
    if (this.bookingInformation.categoryname != "Packers and Movers") {
      this.display = true;
    }
    //debugger;
    this.currentUser = this.authService.currentUserValue;
    this.SubcategoryService.getAllPackage().subscribe((res: any) => {
      console.log("getAllPackage", res);
      this.PackageList = res;
    });
  }
  ngOnInit() {
    /*  console.log("main ArticlemstlistAll Citylist", this.Citylist);
    console.log("main ArticlemstlistAll PackageList", this.PackageList);
    console.log("main ArticlemstlistAll Articlemstlist", this.Articlemstlist);
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    }); */
    this.Mainform = this.formBuilder.group({
      fromaddress: ["", Validators.required],
      toaddress: ["", Validators.required],
      // fromaddress1: ["", Validators.required],
      //toaddress1: ["", Validators.required],
      // housetype: ["", Validators.required],
      phoneNumber: new FormControl(undefined, [Validators.required]),
      movingdate: new FormControl(undefined, [Validators.required]),
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),

      email: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
        //       emailValidator(),
      ]),
    });
    this.currentUser = this.authService.currentUserValue;
    console.log("this.customerinformation currentUser", this.currentUser);

    this.isAuthenticated = this.authService.isLoggedIn();
  }
  public widgetForm: FormGroup = new FormGroup({
    customerinfo: new FormControl(""),
    packegeform: new FormControl(""),
  });

  getAddress(place: any, type: string) {
    // this.phone = this.getPhone(place);
    console.log("place", place);
    this.setaddress(place, type);

    this.ngZone.run(() => {
      this.setaddress(place, type);
    });
  }
  isEmptyObject() {
    //console.log(this.cart.listCartItems());
    // let filteritem = this.cart.cartItemsList.filter(
    //   (c: any) => c.name == this.item.itemname
    // );
    // console.log(this.cart.cartItemsList);
    // return false;
    return Object.keys(this.cart.cartItemsList).length === 0 ? true : false;
  }
  isDateSelected() {
    return this.SubcategoryService.getBookingInformation().jheader[0]
      .orderdate == ""
      ? true
      : false;
  }
  setaddress(place: any, type: string) {
    if (type == "from") {
      this.jheader.fromaddress =
        this.googleAddressService.getFormattedAddress(place);
      this.jheader.fromlat = this.googleAddressService.getlat(place);
      this.jheader.fromlong = this.googleAddressService.getlng(place);
      this.jheader.fromcity = this.googleAddressService.getDistrict(place);
    }
    if (type == "to") {
      this.jheader.toaddress =
        this.googleAddressService.getFormattedAddress(place);
      this.jheader.tolat = this.googleAddressService.getlat(place);
      this.jheader.tolong = this.googleAddressService.getlng(place);
      this.jheader.tocity = this.googleAddressService.getDistrict(place);
      if (this.jheader.fromcity == this.jheader.tocity) {
        // this.bookingInformation.movetype='Within city'
        this.jheader.incity = true;
      } else {
        // this.bookingInformation.movetype='Outside city'
        this.jheader.incity = false;
      }

      // Obtain the distance in meters by the computeDistanceBetween method
      // From the Google Maps extension using plain coordinates
      var distanceInMeters =
        google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng({
            lat: this.jheader.fromlat,
            lng: this.jheader.fromlong,
          }),
          new google.maps.LatLng({
            lat: this.jheader.tolat,
            lng: this.jheader.tolong,
          })
        );

      // Outputs: Distance in Meters:  286562.7470149898
      console.log("Distance in Meters: ", distanceInMeters);

      // Outputs: Distance in Kilometers:  286.5627470149898
      this.DistanceKM = (distanceInMeters * 0.001).toFixed(2);
      console.log("Distance in Kilometers: ", this.DistanceKM);
      this.jheader.totkm = this.DistanceKM;
      if (this.jheader.totkm < 150) {
        this.jheader.incity = true;
      } else {
        this.jheader.incity = false;
      }
      this.bookingInformation.jheader[0] = this.jheader;
    }
  }

  showDialog() {
    /*  if (this.bookingInformation.movetypev && this.bookingInformation.city) {
      //this.ticketService.ticketInformation.personalInformation = this.personalInformation;
      //this.router.navigate(['steps/seat']);

      return;
    } */
    //this.router.navigate(['sub-category/customer']);
    this.bookingInformation = this.SubcategoryService.getBookingInformation();
    this.jheader = this.bookingInformation.jheader[0];
    this.jcustomer = this.bookingInformation.jcustomer[0];
    if (this.isAuthenticated) {
      this.currentStep = 1;

      if (this.Mainform.valid) {
        this.submitted = true;
        this.display = true;
        this.displaystep2 = true;
        this.bookingInformation.type = "customerinfo";
        /*  const modalRef = this.modalService.open(MoverPakersStepsComponent, {
          size: "lg",
          centered: true,
        });
        //this.ref.onClose.subscribe((data: any) => {
        modalRef.componentInstance.result.then((data: any) => {

        }); */
        const { fromaddress, toaddress, phoneNumber, name, email, movingdate } =
          this.Mainform.value;
       /*  this.jheader.orderdate =
          moment(movingdate).format("YYYY-MM-DD h:mm:ss"); */

        if (
          this.jcustomer.cust_name == "" &&
          this.jcustomer.cust_email == "" &&
          this.jcustomer.cust_mobile == ""
        ) {
          this.jcustomer.cust_name = this.currentUser.custName;
          this.jcustomer.cust_email = this.currentUser.custEmail;
          this.jcustomer.cust_mobile = this.currentUser.custMobile;
        }
        this.bookingInformation.jheader[0] = this.jheader;
        this.SubcategoryService.setBookingInformation(this.bookingInformation);
        this.router.navigate(["mover-steps"]);
      } else {
        this.submitted = false;
      }
    } else {
      this.SendOPT();
    }
  }
  SendOPT() {
    this.submitted = true;

    if (this.Mainform.valid) {
      this.submitted = false;

      /*  this.phoneNumber = this.loginForm.value.phoneNumber?.e164Number;
        this.CountryCode = this.loginForm.value.phoneNumber?.dialCode;
        this.phoneNumberLast4Digit = this.phoneNumber.substring(
          this.phoneNumber.length - 4
        ); */
      this.phoneNumber = this.Mainform.value.phoneNumber;
      this.userService.SendOPT(this.phoneNumber).subscribe(
        (res: any) => {
          console.log("OptResponse res" + res);
          if (res.success) {
            this.OptResponse = res.data;

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
  openModal() {
    //this.activeModal.close(true);
    const modalRef = this.modalService.open(OtpVerificationComponent, {
      size: "lg",
      centered: true,
    });

    //modalRef.componentInstance.user = this.user;
    modalRef.componentInstance.phoneNumber = this.Mainform.value.phoneNumber;
    modalRef.componentInstance.result.then((data: any) => {
      console.log(data);
      if (data) {
        this.toastService.showSuccessToast(
          "info",
          "you are logged in successfully"
        );

        // window.location.reload();
        if (
          this.jcustomer.cust_name == "" &&
          this.jcustomer.cust_email == "" &&
          this.jcustomer.cust_mobile == ""
        ) {
          this.jcustomer.cust_name = this.currentUser.custName;
          this.jcustomer.cust_email = this.currentUser.custEmail;
          this.jcustomer.cust_mobile = this.currentUser.custMobile;
        }
      }
    });
  }
  OnSelected(type: any) {
    console.log("OnSelected", type);
    this.bookingInformation.housetype = type.value.name;
    this.selectedcss = "icon";
  }

  setCity(event: any) {
    if (event.value) {
      this.bookingInformation.city = event.value;
    }
  }
  SelectedDate(event: any) {
    console.log("SelectedDate", event);
    this.bookingInformation.jheader[0].orderdate =
      moment(event).format("YYYY-MM-DD H:mm:ss");
  }
  edittype(event: any) {
    if (this.bookingInformation.categoryname == "Packers and Movers") {
      if (event == "item") {
        this.currentStep = 3;
      }
      if (event == "date") {
        this.currentStep = 4;
      }
    } else {
      if (event == "item") {
        this.currentStep = 4;
      }
      if (event == "date") {
        this.currentStep = 5;
      }
    }

    this.prevPage();
  }

  nextPage() {
    //console.log('this.step1Information', this.bookingInformation);
    if (this.bookingInformation.categoryname == "Packers and Movers") {
      // debugger;
      if (this.currentStep == 1) {
        // this.jheader.fromaddress1 = this.Mainform.get('fromaddress1')?.value;
        // this.jheader.toaddress1 = this.Mainform.get('toaddress1')?.value;
        this.bookingInformation.jheader[0] = this.jheader;
      }
      if (this.currentStep == 2) {
        this.bookingInformation.type = "select-product";
        // Create an array of article_ids from cartItemsList
        const cartArticleIds = this.cart.cartItemsList.map(
          (element: any) => element.pid
        );

        // Iterate through jdetail and filter items that are in cartArticleIds
        this.bookingInformation.jdetail =
          this.bookingInformation.jdetail.filter((detail: any) => {
            return cartArticleIds.includes(detail.article_id);
          });
        // Iterate through cartItemsList and add missing items to jdetail
        this.cart.cartItemsList.forEach((element: any) => {
          const existingDetail = this.bookingInformation.jdetail.find(
            (detail: any) => detail.article_id === element.pid
          );

          if (existingDetail) {
            // Item already exists, update its quantity and line_total
            existingDetail.quantity += element.qty;
            existingDetail.line_total = existingDetail.quantity * element.price;
          } else {
            // Item not found, add it to the cart
            const details = {
              serv_id: 0,
              article_id: element.pid,
              quantity: element.qty,
              admin_rate: 0,
              partner_rate: 0,
              discount: 0,
              tax: 0,
              line_total: element.qty * element.price,
              linestatus: "new",
              item_name: element.name,
            };
            this.bookingInformation.jdetail.push(details);
          }
          // Recalculate the cart totals
          this.cart.computeCartTotals();
          this.bookingInformation.jheader[0].grandtotal = this.cart.cartTotal;
          this.bookingInformation.jheader[0].total = this.cart.cartTotal;
          this.bookingInformation.jheader[0].totalcft = this.cart.Totalcft;
          this.bookingInformation.jheader[0].tokenamount =
            this.cart.TokenAmount;
        });
      }
      this.SubcategoryService.setBookingInformation(this.bookingInformation);
      if (this.currentStep == 2 && this.DistanceKM > 150) {
        this.currentStep += 1;
        //} else if (this.currentStep == 3 && this.DistanceKM > 150) {
      } else if (this.currentStep == 3) {
        // this.display = false;
        if (this.DistanceKM > 150) {
          //this.currentStep += 1;
          this.NextButtonLabel = "Get Cost";
        }
        this.bookingInformation.jheader[0].tokenamount = 0;
        this.orderService
          .CreateOrUpdateOrder(this.bookingInformation)
          .subscribe((res: any) => {
            // alert('in');
            this.bookingInformation.orderresponse = res;
            console.log("bookingInformation res", res);
            this.currentStep += 1;
            this.jheader.vehiclename = res.vehiclename;
            this.jheader.orderno = res.orderno;
            this.jheader.Id = res.id;
            this.bookingInformation.jheader[0] = this.jheader;

            this.SubcategoryService.setBookingInformation(
              this.bookingInformation
            );
          });
        /*  const order={
        currency:'INR',
        id:'22333',
      } */
        // delete this.bookingInformation.movetype;
        // delete this.bookingInformation.housetype;
        // delete this.bookingInformation.type;
        // this.storage.delete('mycart');

        // this.orderService.createOrder(this.bookingInformation).subscribe((res: any) => {
        //   // alert('in');
        //   this.bookingInformation.orderresponse = res;
        //   console.log('bookingInformation res', res);
        //   this.cart.emptyCart();
        //   // this.paynow(res, this.bookingInformation);
        //   this.messageService.add({ severity: 'success', summary: 'Request', detail: 'Thankyou for being a Customer for  houseexpert' });
        //   //this.display=false;
        // });
      } else if (this.currentStep == 4) {
        /*  const order={
        currency:'INR',
        id:'22333',
      } */

        // this.storage.delete('mycart');
        //delete this.cart.cartItemsList;
        if (this.DistanceKM > 150) {
          this.cart.cartTotal = 0;
          this.bookingInformation.jheader[0].grandtotal = this.cart.cartTotal;
          this.bookingInformation.jheader[0].total = this.cart.cartTotal;

          this.bookingInformation.jheader[0].tokenamount = 0;
        } else {
          this.NextButtonLabel = "Pay ₹" + this.cart.TokenAmount + " Advance";
        }
        this.orderService
          .CreateOrUpdateOrder(this.bookingInformation)
          .subscribe((res: any) => {
            // alert('in');
            this.bookingInformation.orderresponse = res;
            console.log("bookingInformation res", res);
            this.currentStep += 1;

            // this.cart.cartTotal=res.totalamount;
            // this.cart.TokenAmount=this.cart.percentage(15,this.cart.cartTotal);
            // this.jheader.tokenamount = this.cart.TokenAmount;
            // this.jheader.grandtotal = this.cart.cartTotal;

            this.jheader.vehiclename = res.vehiclename;
            this.bookingInformation.jheader[0] = this.jheader;

            this.SubcategoryService.setBookingInformation(
              this.bookingInformation
            );

            if (this.DistanceKM > 150) {
              this.toastService.showInfoToast(
                "Request",
                "Thankyou for being a Customer for  house Expert"
              );
              this.display = false;
              // delete this.bookingInformation.movetype;
              delete this.bookingInformation.housetype;
              delete this.bookingInformation.type;
              delete this.bookingInformation.jdetail;
              this.cart.emptyCart();
              this.SubcategoryService.removeBookingInformation();
              this.jheader = "";
              //window.location.reload();
              setTimeout(() => {
                window.location.reload();
              }, 5000);
            }
            //this.paynow(res, this.bookingInformation);
          });
      } else if (this.currentStep == 5) {
        this.paynow(
          this.bookingInformation.orderresponse,
          this.bookingInformation
        );
        //delete this.bookingInformation.movetype;
        // delete this.bookingInformation.housetype;
        // delete this.bookingInformation.type;
        // this.cart.emptyCart();
        // delete this.bookingInformation.housetype;
        // delete this.bookingInformation.type;
        // delete this.bookingInformation.jdetail;
        // this.cart.emptyCart();
        // this.SubcategoryService.removeBookingInformation();
        // this.jheader = "";
        // window.location.reload();
      } else {
        if (this.currentStep == 4) {
          this.NextButtonLabel = "Pay ₹" + this.cart.TokenAmount + " Advance";
        } else {
          this.NextButtonLabel = "Next";
        }
        this.currentStep += 1;
        /*  if(this.currentStep==7)
      {
        this.currentStep=6;
      } */
      }
    } else if (this.bookingInformation.categoryname != "Packers and Movers") {
      if (this.currentStep == 2) {
        // this.jheader.fromaddress1 = this.Mainform.get('fromaddress1')?.value;
        // this.jheader.toaddress1 = this.Mainform.get('toaddress1')?.value;
        this.bookingInformation.jheader[0] = this.jheader;
      }
      if (this.currentStep == 3) {
        this.bookingInformation.type = "select-product";
        this.cart.cartItemsList.forEach((element: any) => {
          let details = {
            serv_id: 0,
            article_id: element.pid,
            quantity: element.qty,
            admin_rate: 0,
            partner_rate: 0,
            discount: 0,
            tax: 0,
            line_total: element.qty * element.price,
            linestatus: "new",
            item_name: element.name,
          };
          this.bookingInformation.jdetail.push(details);
          this.cart.computeCartTotals();
          this.bookingInformation.jheader[0].grandtotal = this.cart.cartTotal;
          this.bookingInformation.jheader[0].total = this.cart.cartTotal;
          this.bookingInformation.jheader[0].totalcft = this.cart.Totalcft;
          this.bookingInformation.jheader[0].tokenamount =
            this.cart.TokenAmount;
        });
      }
      this.SubcategoryService.setBookingInformation(this.bookingInformation);
      if (this.currentStep == 2) {
        this.currentStep += 1;
      } else if (this.currentStep == 3) {
        // this.display = false;
        this.currentStep += 1;

        /*  const order={
        currency:'INR',
        id:'22333',
      } */
        // delete this.bookingInformation.movetype;
        // delete this.bookingInformation.housetype;
        // delete this.bookingInformation.type;
        // this.storage.delete('mycart');

        // this.orderService.createOrder(this.bookingInformation).subscribe((res: any) => {
        //   // alert('in');
        //   this.bookingInformation.orderresponse = res;
        //   console.log('bookingInformation res', res);
        //   this.cart.emptyCart();
        //   // this.paynow(res, this.bookingInformation);
        //   this.messageService.add({ severity: 'success', summary: 'Request', detail: 'Thankyou for being a Customer for  houseexpert' });
        //   //this.display=false;
        // });
      }
      // else  if (this.currentStep == 2  ) {

      //   this.currentStep += 1;
      // }
      else if (this.currentStep == 4) {
        //this.NextButtonLabel = "Get Cost";
        this.NextButtonLabel = "Pay ₹" + this.cart.TokenAmount + " Advance";
        //this.cart.cartTotal = 0;
        this.bookingInformation.jheader[0].grandtotal = this.cart.cartTotal;
        this.bookingInformation.jheader[0].total = this.cart.cartTotal;

        this.bookingInformation.jheader[0].tokenamount = this.cart.TokenAmount;

        this.orderService
          .CreateOrUpdateOrder(this.bookingInformation)
          .subscribe((res: any) => {
            // alert('in');
            this.bookingInformation.orderresponse = res;
            console.log("bookingInformation res", res);
            this.currentStep += 1;

            this.bookingInformation.jheader[0] = this.jheader;

            this.SubcategoryService.setBookingInformation(
              this.bookingInformation
            );

            // if(this.DistanceKM > 150)
            // {
            //   this.messageService.add({ severity: 'success', summary: 'Request', detail: 'Thankyou for being a Customer for  house Expert' });
            //   this.display=false;
            //   // delete this.bookingInformation.movetype;
            //   delete this.bookingInformation.housetype;
            //   delete this.bookingInformation.type;
            //   delete this.bookingInformation.jdetail;
            //   this.cart.emptyCart();
            //   this.SubcategoryService.removeBookingInformation();
            //   this.jheader = "";
            //   window.location.reload();
            // }
            //this.paynow(res, this.bookingInformation);
          });
      } else if (this.currentStep == 5) {
        //this.currentStep += 1;
        this.paynow(
          this.bookingInformation.orderresponse,
          this.bookingInformation
        );
        //delete this.bookingInformation.movetype;
        // delete this.bookingInformation.housetype;
        // delete this.bookingInformation.type;
        // this.cart.emptyCart();
        // delete this.bookingInformation.housetype;
        // delete this.bookingInformation.type;
        // delete this.bookingInformation.jdetail;
        // this.cart.emptyCart();
        // this.SubcategoryService.removeBookingInformation();
        // this.jheader = "";
        // window.location.reload();
      } else {
        this.currentStep += 1;
        /*  if(this.currentStep==7)
      {
        this.currentStep=6;
      } */
        if (this.currentStep == 5) {
          this.NextButtonLabel = "Pay ₹" + this.cart.TokenAmount + " Advance";
        } else {
          this.NextButtonLabel = "Next";
        }
      }
    }
    this.showhide();
    localStorage.setItem("checkoutStep", this.currentStep.toString());
  }
  prevPage() {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
      localStorage.setItem("checkoutStep", this.currentStep.toString());
    }
    if (this.currentStep == 5) {
      this.NextButtonLabel = "Pay ₹" + this.cart.TokenAmount + " Advance";
    } else {
      this.NextButtonLabel = "Next";
    }
    this.showhide();
  }
  showhide() {
    console.log("currentStep", this.currentStep, this.bookingInformation);
    this.display = true;

    console.log("cart", this.cart);
  }
  paynow(res: any, order: any) {
    let paymentoptions = this.preparePaymentDetails(res, order);
    var rzp1 = new Razorpay(paymentoptions);
    rzp1.open();
    rzp1.on("payment.failed", function (response: any) {
      //this.message = "Payment Failed";
      // Todo - store this information in the server
      alert(response);

      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
      //this.error = response.error.reason;
    });
  }
  preparePaymentDetails(res: any, order: any) {
    console.log(
      "ShoppingCartComponent -> preparePaymentDetails -> order",
      order,
      this.cart.TokenAmount
    );

    console.log("In preparePaymentDetails");

    return {
      key: environment.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: this.cart.TokenAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 29935 refers to 29935 paise or INR 299.35.
      name: "House expert solutions pvt Ltd",
      currency: "INR",
      order_id: res.razorpayorderno, // order.id,//This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
      //"image": 'https://angular.io/assets/images/logos/angular/angular.png',

      handler: function (response: any, error: any) {
        console.log("handler response", response, error);
        var event = new CustomEvent("payment.success", {
          detail: response,
          bubbles: true,
          cancelable: true,
        });
        window.dispatchEvent(event);
      },
      prefill: {
        name: order.jcustomer[0].cust_name,
        email: order.jcustomer[0].cust_email,
        contact: order.jcustomer[0].cust_mobile,
      },
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        address: order.jheader[0].fromaddress,
      },
      theme: {
        color: "#2874f0",
      },
    };
  }

  handlePayment(response: any) {
    console.log("In handlePayment", response);

    /* this.paymentService.capturePayment({
      amount: this.payableAmount,
      payment_id: response.razorpay_payment_id
    })
      .subscribe(res => {
      console.log("ShoppingCartComponent -> AFTER CAPTURE -> res", res)
        this.paymentResponse = res;
        this.changeRef.detectChanges();
       },
      error => {
        this.paymentResponse = error;
      }); */
  }

  /* @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    //this.message = "Success Payment";
    console.log("onPaymentSuccess",event);
  } */
  @HostListener("window:payment.success", ["$event"])
  onPaymentSuccess(event: any): void {
    console.log("onPaymentSuccess", event);
    // this.bookingInformation.orderresponse
    let paymentdetail = {
      spname: "payment_save",
      jpayment: [
        {
          orderid: this.bookingInformation.orderresponse.orderno,
          paymenttype: "token",
          paymentid: event.detail.razorpay_payment_id,
          paymentmode: "razorpay",
          referenceno: this.bookingInformation.orderresponse.razorpayorderno,
          currency: "INR",
          credit: this.cart.TokenAmount,
        },
      ],
      pid: 0,
    };
    this.apiservice.apicall(paymentdetail).subscribe((data: any) => {
      console.log("paymentId", data.message);

      this.toastService.showErrorToast(
        "success",
        "Thankyou for being a Customer for houseexpert"
      );
      this.orderService
        .SendWhatsAppsJobConfirmation(this.jheader.Id)
        .subscribe((res: any) => {});
      this.orderService
        .SendWhatsAppsAdvancePay(this.jheader.Id)
        .subscribe((res: any) => {});
      this.display = false;
      this.isPaymentPending = false;
      delete this.bookingInformation.housetype;
      delete this.bookingInformation.type;
      delete this.bookingInformation.jdetail;
      this.cart.emptyCart();
      this.SubcategoryService.removeBookingInformation();
      this.jheader = "";
      setTimeout(() => {
        window.location.reload();
      }, 5000);

      //this.router.navigate(['bookinglist'])
    });
  }
  saveChanges() {
    /*  if (this.ref && this.ref.isValid() && this.widgetForm.valid) {
      // save form
    } else {
      // this.toastr.warning("Form not saved!");
    } */
  }
  ngOnDestroy(): void {
    /*  if (this.ref) {
      this.ref.close();
    } */
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  onHide() {
    if (this.isPaymentPending) {
      this.orderService
        .SendWhatsAppsPaymentPending(this.jheader.Id)
        .subscribe((res: any) => {});
    } else {
    }
    delete this.bookingInformation.housetype;
    delete this.bookingInformation.type;
    delete this.bookingInformation.jdetail;
    this.cart.emptyCart();
    this.SubcategoryService.removeBookingInformation();
    this.jheader = "";
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }
  onDateSelection(date: NgbDate) {
    this.jheader.orderdate = moment(date).format("YYYY-MM-DD h:mm:ss");
    this.bookingInformation.jheader[0] = this.jheader;
    this.SubcategoryService.setBookingInformation(this.bookingInformation);
  }
}
