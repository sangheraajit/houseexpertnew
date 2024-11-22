import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAddressService } from 'src/app/service/google-address.service';
import { httpService } from 'src/app/service/http.service';
import { LoadingService } from 'src/app/service/interceptor/loading.service';
import { StorageService } from 'src/app/service/storage.service';
import { SubcategoryService } from 'src/app/service/subcategory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent {
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
    }
   
  
  ];

  faqs = [
    { question: 'What services do you offer?', answer: 'Booking is easy! You can book online through our secure website, give us a call at [phone number], or send us an email at [email address].'},
    { question: 'How do I book a service?', answer: 'Booking is easy! You can book online through our secure website, give us a call at [phone number], or send us an email at [email address].' },
    { question: 'How much do your services cost?', answer: 'Booking is easy! You can book online through our secure website, give us a call at [phone number], or send us an email at [email address].'},
    { question: 'Do you offer free quotes or consultations?', answer: 'Booking is easy! You can book online through our secure website, give us a call at [phone number], or send us an email at [email address].' },
    
  ];
  expandedIndex: number = 1;
  toggleAccordion(index: number) {
    this.expandedIndex = this.expandedIndex === index ? 1 : index;
  }
  cat_id: any;
  cat_name: any;
  CategoryList: any;
  CategoryServicesList: any;
  ImageserverUrl = environment.ImageserverUrl;
  ArticlemstlistAll: any;
  PackageList: any;
  isPackersandMovers = false;
  Citylist: any;
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
      //this.fragment = params.get('fragment');
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
    this.SubcategoryService.getAllCities().subscribe((citylist) => {
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
    this.getCategoryServices(this.cat_id);
    //this.storageservice.delete('mycart');

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

}
