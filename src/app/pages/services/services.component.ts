import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GoogleAddressService } from 'src/app/service/google-address.service';
import { httpService } from 'src/app/service/http.service';
import { LoadingService } from 'src/app/service/interceptor/loading.service';
import { StorageService } from 'src/app/service/storage.service';
import { SubcategoryService } from 'src/app/service/subcategory.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  plumber = '../../../assets/images/plumber-making.png';
  shapblue ='../../../assets/images/purple-shape.svg';

services = [
    {
      id:1,
      warranty: '30 DAYS WARRANTY',
      title: 'Deep clean AC service (Window)',
      reviews: '4.83 (1.2M reviews)',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolorullamcorper',
      imageUrl: '../../../assets/images/ac-repairing.png',
      price:"600",
      time:'30 Min'
    },
    {
      id:2,
      warranty: '30 DAYS WARRANTY',
      title: 'Deep clean AC service (Window)',
      reviews: '4.83 (1.2M reviews)',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolorullamcorper',
      imageUrl: '../../../assets/images/ac-repairing.png',
      price:"600",
      time:'30 Min'
    },
    {
      id:3,
      warranty: '30 DAYS WARRANTY',
      title: 'Deep clean AC service (Window)',
      reviews: '4.83 (1.2M reviews)',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolorullamcorper',
      imageUrl: '../../../assets/images/ac-repairing.png',
      price:"600",
      time:'30 Min'
    },
  
  ];
  Citylist: any;
  bookingInformation: any;

  
  activeIndex: number = 0;
  //Citylist: any;
  Options!: any[];
  subscription!: Subscription;
  currentStep = 1;
  isPaintingDisplay = false;
  isAirConditionDisplay = false;
  isPackersandMovers = false;

  NextButtonLabel = 'Next';
  display: boolean = false;

  submitted: boolean = false;

  value3: any;
  selectedcss = '';
  cat_id: any;
  cat_name: any;

  CategoryList: any;
  CategoryServicesList: any;
  ImageserverUrl = environment.ImageserverUrl;
  ArticlemstlistAll: any;
  PackageList: any;
  address:any
  city:any
  isLoading: boolean=false;
  fragment: any;
  constructor(
    public SubcategoryService: SubcategoryService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private apiservice: httpService,
    private googleAddressService:GoogleAddressService,
    private loaderService: LoadingService,
    private storageservice: StorageService,

  ) {
    console.log('in constructor');
    this.actRoute.paramMap.subscribe((params) => {
      this.cat_id = params.get('cat_id');
      this.cat_name = params.get('cat_name');
      this.fragment = params.get('fragment');
      console.log(this.cat_name);
      //this.bookingInformation.categoryname = this.cat_name;
      this.isPackersandMovers = this.cat_name == 'Packers and Movers';
      //this.isAirConditionDisplay = (this.cat_name == "AC Service And Repair");
      //this.isAirConditionDisplay = this.cat_name == 'AC Repair';
    });


    // console.log("isPackersandMovers", this.isPackersandMovers)
    this.SubcategoryService.getAllPackage().subscribe((res: any) => {
      console.log('getAllPackage', res);
      this.PackageList = res;
    });
    this.SubcategoryService.getAllCities().subscribe((citylist:any) => {
      this.Citylist = citylist;
      console.log('Citylist', citylist);
    });
    if (this.isPackersandMovers)
    {
      //this.SubcategoryService.getAllCities();
      //this.SubcategoryService.getAllarticle('', '');
      this.SubcategoryService.getAllarticle('', '').subscribe((res: any) => {
        console.log('getAllarticle', res);
        this.ArticlemstlistAll = res;
      });
    }
    else
    {

      this.getChildCategories(this.cat_id);
    }
    this.storageservice.delete('mycart');

  }
  ngAfterViewInit(): void {
    if(this.fragment && this.fragment != '')
    {
    let element = document.getElementById(this.fragment);

        if(element) {
          element.scrollIntoView(); // scroll to a particular element
        }
      }
  }
  edittype(event: any) {
    if(this.isPackersandMovers)
    {
        if (event == "item") {
          this.currentStep = 3
        }
        if (event == "date") {
          this.currentStep = 4
        }
    }
    else
    {
      if (event == "item") {
        this.currentStep = 4
      }
      if (event == "date") {
        this.currentStep = 5
      }
    }
    this.prevPage()
  }

  ngOnInit() {
    this.bookingInformation = this.SubcategoryService.getBookingInformation();
    this.actRoute.paramMap.subscribe((params) => {
      this.cat_id = params.get('cat_id');
      this.cat_name = params.get('cat_name');
      this.fragment = params.get('fragment');
      console.log(this.cat_name);
      this.isPackersandMovers = this.cat_name == 'Packers and Movers';
      this.bookingInformation.categoryname = this.cat_name;
      //this.isAirConditionDisplay = this.cat_name == 'AC Repair';
    });
    this.loaderService.loading$.subscribe((v:any) => {
      console.log(v);
      this.isLoading = v;
    });
    //this.googleAddressService.getCurrentAddress(this.googleAddressService.latitude,this.googleAddressService.longitude);
    //this.googleAddressService.dropMarker(null)
    this.googleAddressService.placeResult.subscribe((res: any) => {
      console.log("placeResult",res)
      this.address=this.googleAddressService.getFormattedAddress(res)

      if(localStorage.getItem("cityname"))
      {
        this.city=localStorage.getItem("cityname");
      }
      if(!this.city)
      {
        this.city=this.googleAddressService.getLocality(res)
      }
    });



    console.log("city",this.city)
    //this.items = this.SubcategoryService.items;
    //this.bookingInformation = this.SubcategoryService.getBookingInformation();

    this.Options = this.SubcategoryService.Options;
  }

  showDialog() {
    if (this.bookingInformation.movetypev && this.bookingInformation.city) {
      //this.ticketService.ticketInformation.personalInformation = this.personalInformation;
      //this.router.navigate(['steps/seat']);

      return;
    }
    //console.log("this.bookingInformation",this.bookingInformation)
    this.bookingInformation.bookingInformation = this.bookingInformation;
    this.SubcategoryService.setBookingInformation(this.bookingInformation);
    this.display = true;
    //this.router.navigate(['/sub-category/step2']);
    // this.router.navigate(['step2'], {relativeTo:this.route});

    /*  this.router.navigate(["/feature/users"], {
       queryParams: { roleCode: data.roleCode }
     }); */
    /*   this.submitted = true;
  const ref = this.dialogService.open(this.bookingInformation, {
      data: {
        Citylist: this.Citylist,
      },
      header: 'steps',
      width: '70%',
    }); */
    //this.router.navigate(['/step'])
  }

  OnSelected(type: any) {
    console.log('OnSelected', type);
    this.bookingInformation.housetype = type.value;
    this.selectedcss = 'icon';
  }

  setCity(event: any) {
    if (event.value) {
      this.bookingInformation.city = event.value;
    }
  }
  getChildCategories(cat_id: number) {
    /*  let spname = "get_childcategory_read"
    let ptype = "readall"
    let pid = cat_id
    this.apiservice.apiPost(spname, ptype, pid).subscribe((res: any) => {
      console.log('getChildCategories', res);
      this.CategoryList = res;

    }); */
    this.SubcategoryService.getChildCategories(cat_id).subscribe((res: any) => {
      console.log('getChildCategories', res);
      this.CategoryList = res;
    });
  }
  getCategoryServices(cat_id: number) {
    this.SubcategoryService.getCategoryServices(cat_id).subscribe((res: any) => {
      console.log('getCategoryServices', res);
      this.CategoryServicesList = res;
    });
  }
  //painting code
  showCategoryDailog(category: any) {
    console.log('showPaintingDailog category', category);
    this.isAirConditionDisplay = (this.cat_name == "AC Service And Repair");
    this.isPaintingDisplay = this.cat_name == 'Painting';
    this.currentStep = 1;
    // this.isPaintingDisplay = true;
    this.isPackersandMovers = false;
    // this.isAirConditionDisplay = false;
    //localStorage.setItem("catname",this.cat_name);
    //this.bookingInformation.categoryname = this.cat_name;
    this.getCategoryServices(category.id);
    if(this.isAirConditionDisplay){
      this.SubcategoryService.getAllarticleByCat(category.id).subscribe((res: any) => {
        console.log('getAllarticle', res);
        this.ArticlemstlistAll = res;
      });
    // this.SubcategoryService.getAllarticle('', '').subscribe((res: any) => {
    //   console.log('getAllarticle', res);
    //   this.ArticlemstlistAll = res;
    // });
  }
  }

  showPaintingDailog(category: any) {
    console.log('showPaintingDailog category', category);
    this.currentStep = 1;
    this.isPaintingDisplay = true;
    this.isPackersandMovers = false;
    this.isAirConditionDisplay = false;
    this.getCategoryServices(category.id);
  }
  showAirConditionDailog(category: any) {
    console.log('showAirConditionDailog category', category);
    this.currentStep = 1;
    this.isAirConditionDisplay = true;
    this.isPaintingDisplay = false;
    this.isPackersandMovers = false;
    this.getCategoryServices(category.id);
  }
  nextPage() {
    // if (this.currentStep == 2) {
    //   this.cart.cartItemsList.forEach((element: any) => {
    //     let details = {
    //       serv_id: 0,
    //       article_id: element.pid,
    //       quantity: element.qty,
    //       admin_rate: 0,
    //       partner_rate: 0,
    //       discount: 0,
    //       tax: 0,
    //       line_total: element.qty * element.price,
    //       linestatus: "new",
    //     };
    //     this.bookingInformation.jheader[0].grandtotal = this.cart.cartTotal;
    //     this.bookingInformation.jheader[0].total = this.cart.cartTotal;
    //     this.bookingInformation.jdetail.push(details);
    //   });
    // }
    // this.SubcategoryService.setBookingInformation(this.bookingInformation);
    this.currentStep += 1;
    // localStorage.setItem("checkoutStep", this.currentStep.toString());
    // this.showhide();
  //   if (this.currentStep == 4) {

  //     this.orderService.createOrder(this.bookingInformation).subscribe((res: any) => {

  //       // alert('in');
  //       this.bookingInformation.orderresponse = res;
  //       this.SubcategoryService.setBookingInformation(this.bookingInformation);
  //     });
  // }
  //    else if (this.currentStep == 5) {
  //     this.paynow(this.bookingInformation.orderresponse, this.bookingInformation);

  //   }
  }
  prevPage() {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
      localStorage.setItem('checkoutStep', this.currentStep.toString());
    }
    // this.showhide();
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  SelectedDate(event: any) {
    console.log("SelectedDate", event)
    this.bookingInformation.jheader[0].orderdate = moment(event).format('YYYY-MM-DD H:mm:ss');
  }
}
