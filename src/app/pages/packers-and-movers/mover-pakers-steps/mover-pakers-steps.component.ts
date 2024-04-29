import { DatePipe } from "@angular/common";
import { Component, ElementRef, EventEmitter, Input, NgZone, Output, ViewChild } from "@angular/core";
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
import { SubcategoryService } from "src/app/service/subcategory.service";
import { UserService } from "src/app/service/user.service";
import { environment } from "src/environments/environment";
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
  selectedValues: any;
  itemstomove = "";
  orderdate: any;
  showTimeRanges: boolean = false;
  isselecteddate: any;
  iscurrenttime: any =0;
  strselectedtime=""
  Articlemstlist!: any;
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
    private datePipe: DatePipe
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
    // this.selectedValues=event;
    //sthis.bookingInformation.selecteddate =event.toDateString();
    if (this.selectedValues === event) {
      this.selectedValues = null;
      return;
    }
    // compute cart total price and quantity
    this.cartService.computeCartTotals();

    this.selectedValues = event;
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
    }
    if (step == 4) {
      this.itemstomove = this.cartService.cartItemsList
        .map((item: any) => {
          return item.name + "(" + item.qty + ")";
        })
        .join(",");
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
}
