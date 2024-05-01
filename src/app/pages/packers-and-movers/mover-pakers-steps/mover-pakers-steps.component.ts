import { DatePipe } from "@angular/common";
import { Component, ElementRef, EventEmitter, HostListener, Input, NgZone, Output, ViewChild } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { GoogleMap } from "@angular/google-maps";
import { NgbDate, NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/service/auth.service";
import { CartService } from "src/app/service/cart.service";
import { GoogleAddressService } from "src/app/service/google-address.service";
import { httpService } from "src/app/service/http.service";
import { OrderService } from "src/app/service/order.service";
import { SubcategoryService } from "src/app/service/subcategory.service";
import { ToastService } from "src/app/service/toast.service";
import { UserService } from "src/app/service/user.service";
import { environment } from "src/environments/environment";
declare var Razorpay: any;
@Component({
  selector: "app-mover-pakers-steps",
  templateUrl: "./mover-pakers-steps.component.html",
  styleUrls: ["./mover-pakers-steps.component.scss"],
})
export class MoverPakersStepsComponent {
  active = 1;
  display: boolean = false;
  submitted = true;
  paymentInformation: any;
  @Input() Citylist: any;
  subscription!: Subscription;
  public bookingInformation: any;
  jheader: any;
  jcustomer: any;
  fromlatitude!: any;
  fromlongitude!: any;
  tolatitude!: any;
  tolongitude!: any;
  @ViewChild("searchfrom")
  public searchFromElementRef!: ElementRef;
  @ViewChild("searchto")
  public searchToElementRef!: ElementRef;
  @ViewChild(GoogleMap)
  public map!: GoogleMap;
  //cat_name = '';
  // isPaintingDisplay: boolean = false;
  // isAirConditionDisplay: boolean = false;
  // isPackersandMovers: boolean = false;

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

  public Customerform: FormGroup = new FormGroup({
    fromaddress: new FormControl("", [Validators.required]),
    toaddress: new FormControl("", [Validators.required]),
    fromfloor: new FormControl("", [Validators.required]),
    tofloor: new FormControl("", [Validators.required]),
    cust_name: new FormControl("", [Validators.required]),
    cust_mobile: new FormControl("", [Validators.required]),
    cust_email: new FormControl("", [Validators.required]),
    fromlift: new FormControl("", [Validators.required]),
    tolift: new FormControl("", [Validators.required]),
  });
  currentUser: any;
  isAuthenticated: boolean = false;
  ImageserverUrl = environment.ImageserverUrl;
  ArticlemstlistAll: any;
  PackageList: any;
  minDate: any;
  selectedPackageValues: any;
  itemstomove = "";
  orderdate: any;
  showTimeRanges: boolean = false;
  isselecteddate: any;
  iscurrenttime: any =0;
  strselectedtime=""
  Articlemstlist!: any;
  selectedPackageName=""
  DistanceKM: any;
  isPaymentPending = true;
  @Output() SelectedDate = new EventEmitter<any>();
  @Output() SelectedTime = new EventEmitter<any>();
  constructor(
    public SubcategoryService: SubcategoryService,
    private ngZone: NgZone,
    private googleAddressService: GoogleAddressService,
    public userService: UserService,
    private authService: AuthService,
    //public ref: DynamicDialogRef, public config: DynamicDialogConfig
    public cartService: CartService,
    private datePipe: DatePipe,
    private orderService: OrderService,
    public apiservice: httpService,
    private toastService: ToastService,
  ) {
    /*   if(config.data.Citylist)
    {
      console.log("step2 constructor",config.data.Citylist)
      this.Citylist = config.data.Citylist;
    } */

    /*  this.subscription = this.SubcategoryService.Citylist.subscribe(
      (citylist) => {
        this.Citylist = citylist;
      }
    ); */
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    };
    this.SubcategoryService.getAllarticle("", "").subscribe((res: any) => {
      console.log("getAllarticle", res);
      this.ArticlemstlistAll = res.map((article: any) => ({
        cat_id: article.cat_id,
        cft: article.cft,
        id: article.id,
        imageurl: article.imageurl,
        itemgroup: article.itemgroup,
        itemgroup1: article.itemgroup1,
        itemname: article.itemname,
        qty: 0,
        active: true,
      }));
      this.Articlemstlist=this.ArticlemstlistAll;
      this.cartService.allItems = this.ArticlemstlistAll;
      this.cartService.listCartItems();
    });
    /* this.SubcategoryService.getAllPackage().subscribe((res: any) => {
      console.log('getAllPackage', res);
      this.PackageList = res;
    }); */
    

    this.currentUser = this.authService.currentUserValue;
    console.log("this.customerinformation currentUser", this.currentUser);

    this.isAuthenticated = authService.isLoggedIn();

    this.bookingInformation = this.SubcategoryService.getBookingInformation();
    this.jheader = this.bookingInformation.jheader[0];
    this.jcustomer = this.bookingInformation.jcustomer[0];
    if (this.isAuthenticated) {
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
    console.log("step  constructor bookingInformation", this.bookingInformation);
  }

  ngOnInit() {
    if (this.bookingInformation.categoryname == "Packers and Movers") {
      this.Customerform.controls["fromaddress"].setValue(
        this.jheader.fromaddress
      );
      this.Customerform.controls["toaddress"].setValue(this.jheader.toaddress);
    }
  }
  getAddress(place: any, type: string) {
    // this.phone = this.getPhone(place);

    this.setaddress(place, type);

    this.ngZone.run(() => {
      this.setaddress(place, type);
    });
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

  get f(): { [key: string]: AbstractControl } {
    return this.Customerform.controls;
  }
  changeQty(product: any, change: any, replace: string) {
    if (product.qty + change >= 0) {
      product.qty += change;
    }
    if (change !== "") {
      change = parseInt(change) || 1;
      this.cartService.addToCart(product.itemname, change, replace);
    } else {
      this.cartService.addToCart(product.itemname, 1, replace);
    }
  }
  onSelect(item: any, event: any, packageamount: any) {
    //packageamount
    console.log("onSelect package event", event);
    // this.selectedPackageValues=event;
    //sthis.bookingInformation.selecteddate =event.toDateString();
    this.selectedPackageName=item.packagename;
    if (this.selectedPackageValues === event) {
      this.selectedPackageValues = null;
      return;
    }
    // compute cart total price and quantity
    this.cartService.computeCartTotals();

    this.selectedPackageValues = event;
    this.jheader.packageid = event;
    this.jheader.selectedpackage = item;
    //this.packegeform.controls["packageid"].setValue(event);
    //this.cart.cartTotal=this.cart.cartTotal+packageamount
    this.cartService.cartTotal = packageamount;
    this.cartService.TokenAmount = this.cartService.percentage(
      15,
      this.cartService.cartTotal
    );
    this.jheader.tokenamount = this.cartService.TokenAmount;
    this.jheader.grandtotal = this.cartService.cartTotal;
    this.bookingInformation.jheader[0] = this.jheader;

    this.SubcategoryService.setBookingInformation(this.bookingInformation);
  }
  nextPage(step: number) {
    this.active = step;
    this.bookingInformation.jheader[0] = this.jheader;
    this.SubcategoryService.setBookingInformation(this.bookingInformation);
    console.log("step  next bookingInformation", this.bookingInformation);
    if (step == 3) {
      this.bookingInformation.type = 'select-product';
      // Create an array of article_ids from cartItemsList
      const cartArticleIds = this.cartService.cartItemsList.map(
        (element: any) => element.pid
      );

      // Iterate through jdetail and filter items that are in cartArticleIds
      this.bookingInformation.jdetail =
        this.bookingInformation.jdetail.filter((detail: any) => {
          return cartArticleIds.includes(detail.article_id);
        });
      // Iterate through cartItemsList and add missing items to jdetail
      this.cartService.cartItemsList.forEach((element: any) => {
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
            linestatus: 'new',
            item_name: element.name,
          };
          this.bookingInformation.jdetail.push(details);
        }
        // Recalculate the cart totals
        this.cartService.computeCartTotals();
        this.bookingInformation.jheader[0].grandtotal = this.cartService.cartTotal;
        this.bookingInformation.jheader[0].total = this.cartService.cartTotal;
        this.bookingInformation.jheader[0].totalcft = this.cartService.Totalcft;
        this.bookingInformation.jheader[0].tokenamount =
          this.cartService.TokenAmount;
      });
    }
    this.SubcategoryService.setBookingInformation(this.bookingInformation);
      const date = new Date(this.jheader.orderdate);
      this.orderdate = {
        year: date.getFullYear(),
        month: date.getMonth() + 1, // JavaScript months are 0-based, NgbDatePicker months are 1-based
        day: date.getDate(),
      };
      this.SubcategoryService.getAllPackage2(
        0,
        this.jheader.totalcft,
        Math.ceil(this.jheader.totkm),
        this.jheader.fromlift == true ? 0 : Math.ceil(this.jheader.fromfloor),
        this.jheader.tolift == true ? 0 : Math.ceil(this.jheader.tofloor)
      ).subscribe((res: any) => {
        console.log("getAllPackage", res);

        this.PackageList = res;
        this.PackageList.forEach((element: any) => {
          element.packageTotal = element.getcalculateamounts;

          // this.PackageList.forEach((element:any) => {
          //   element.packageTotal=element.packageamount+this.jheader.total;
        });
      });
    
    if (step == 4) {
      this.itemstomove = this.cartService.cartItemsList
        .map((item: any) => {
          return item.name + "(" + item.qty + ")";
        })
        .join(",");
        this.orderService
        .CreateOrUpdateOrder(this.bookingInformation)
        .subscribe((res: any) => {
          // alert('in');
          this.bookingInformation.orderresponse = res;
          console.log('bookingInformation res', res);
        

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
            this.toastService.showSuccessToast(
              'success',
             'Thankyou for being a Customer for  house Expert',
            );
            this.display = false;
            // delete this.bookingInformation.movetype;
            delete this.bookingInformation.housetype;
            delete this.bookingInformation.type;
            delete this.bookingInformation.jdetail;
            this.cartService.emptyCart();
            this.SubcategoryService.removeBookingInformation();
            this.jheader = '';
            //window.location.reload();
          }
        });
    }
  }
  navChanged(event:any) {
    console.log('navChanged1', event);
    console.log("step  navChanged bookingInformation", this.bookingInformation);
    this.bookingInformation.jheader[0] = this.jheader;
    this.SubcategoryService.setBookingInformation(this.bookingInformation);
    this.bookingInformation = this.SubcategoryService.getBookingInformation();
    this.jheader = this.bookingInformation.jheader[0];
    if (event.nextId == 3) {
     console.log("orderdate",this.orderdate);
      this.SubcategoryService.getAllPackage2(
        0,
        this.jheader.totalcft,
        Math.ceil(this.jheader.totkm),
        this.jheader.fromlift == true ? 0 : Math.ceil(this.jheader.fromfloor),
        this.jheader.tolift == true ? 0 : Math.ceil(this.jheader.tofloor)
      ).subscribe((res: any) => {
        console.log("getAllPackage", res);

        this.PackageList = res;
        this.PackageList.forEach((element: any) => {
          element.packageTotal = element.getcalculateamounts;

          // this.PackageList.forEach((element:any) => {
          //   element.packageTotal=element.packageamount+this.jheader.total;
        });
      });
    }
    if (event.nextId == 4) {
      this.itemstomove = this.cartService.cartItemsList
        .map((item: any) => {
          return item.name + "(" + item.qty + ")";
        })
        .join(",");

        this.orderService
        .CreateOrUpdateOrder(this.bookingInformation)
        .subscribe((res: any) => {
          // alert('in');
          this.bookingInformation.orderresponse = res;
          console.log('bookingInformation res', res);
        

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
            this.toastService.showSuccessToast(
              'success',
             'Thankyou for being a Customer for  house Expert',
            );
            this.display = false;
            // delete this.bookingInformation.movetype;
            delete this.bookingInformation.housetype;
            delete this.bookingInformation.type;
            delete this.bookingInformation.jdetail;
            this.cartService.emptyCart();
            this.SubcategoryService.removeBookingInformation();
            this.jheader = '';
            //window.location.reload();
          }
        });
    }
  }
  toggleTimeRanges() {
    this.showTimeRanges = !this.showTimeRanges;
  }
  selecttime(inputdate: any,strselectedtime:string) {
    console.log("orderdate",this.orderdate);
    this.iscurrenttime = inputdate;
    this.strselectedtime=strselectedtime;
    var dateTime = this.datePipe.transform(this.formatDate(this.orderdate), 'yyyy-MM-ddT'+ (("00" + this.iscurrenttime).slice(-2))  + ':00:00');//var dateTime = moment(this.isselecteddate,"yyyy-MM-dd");
    this.showTimeRanges=false;
    this.bookingInformation.jheader[0].orderdate =
      moment(dateTime).format("YYYY-MM-DD H:mm:ss");
    this.SelectedDate.emit(dateTime);
    
  }
  formatDate(date: NgbDate) {
    
    // NgbDates use 1 for Jan, Moement uses 0, must substract 1 month for proper date conversion
    var ngbObj =  JSON.parse(JSON.stringify(date));
    var newMoment = moment();

    if (ngbObj) {
      ngbObj.month--;
      newMoment.month(ngbObj.month);
      newMoment.dates(ngbObj.day);
      newMoment.year(ngbObj.year);
    }

    // Convert date to "Mon Feb 01" format
    if (newMoment.isValid()) {
      return newMoment.format('ddd MMM DD');
    } else {
      return '';
    }
  }
  searchData(searchValue: any) {
    this.Articlemstlist = this.ArticlemstlistAll.filter((item: any) => {
      return item.itemname.toLowerCase().includes(searchValue.toLowerCase());
    });
  }
  paynow() {
   
    let paymentoptions = this.preparePaymentDetails(   this.bookingInformation.orderresponse,
      this.bookingInformation);
    var rzp1 = new Razorpay(paymentoptions);
    rzp1.open();
    rzp1.on('payment.failed', function (response: any) {
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
      'ShoppingCartComponent -> preparePaymentDetails -> order',
      order,
      this.cartService.TokenAmount
    );

    console.log('In preparePaymentDetails');

    return {
      key: environment.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: this.cartService.TokenAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 29935 refers to 29935 paise or INR 299.35.
      name: 'House expert solutions pvt Ltd',
      currency: 'INR',
      order_id: res.razorpayorderno, // order.id,//This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
      //"image": 'https://angular.io/assets/images/logos/angular/angular.png',

      handler: function (response: any, error: any) {
        console.log('handler response', response, error);
        var event = new CustomEvent('payment.success', {
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
        color: '#2874f0',
      },
    };
  }

  handlePayment(response: any) {
    console.log('In handlePayment', response);

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
  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    console.log('onPaymentSuccess', event);
    // this.bookingInformation.orderresponse
    let paymentdetail = {
      spname: 'payment_save',
      jpayment: [
        {
          orderid: this.bookingInformation.orderresponse.orderno,
          paymenttype: 'token',
          paymentid: event.detail.razorpay_payment_id,
          paymentmode: 'razorpay',
          referenceno: this.bookingInformation.orderresponse.razorpayorderno,
          currency: 'INR',
          credit: this.cartService.TokenAmount,
        },
      ],
      pid: 0,
    };
    this.apiservice.apicall(paymentdetail).subscribe((data: any) => {
      console.log('paymentId', data.message);

      this.toastService.showSuccessToast(
       'success',
      'Thankyou for being a Customer for houseexpert',
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
      this.cartService.emptyCart();
      this.SubcategoryService.removeBookingInformation();
      this.jheader = '';
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
/*     if (this.ref) {
      this.ref.close();
    }
 */    if (this.subscription) {
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
    this.cartService.emptyCart();
    this.SubcategoryService.removeBookingInformation();
    this.jheader = '';
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }
}
