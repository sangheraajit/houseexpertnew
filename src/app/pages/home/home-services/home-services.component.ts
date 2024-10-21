import { Component, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { httpService } from "src/app/service/http.service";
import { SubcategoryService } from "src/app/service/subcategory.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-home-services",
  templateUrl: "./home-services.component.html",
  styleUrls: ["./home-services.component.scss"],
})
export class HomeServicesComponent {
  services = [
    {
      name: "Painting Services",
      icon: "../../../assets/images/home-services/painting.svg",
      url: "services",
    },
    {
      name: "Cleaning Services",
      icon: "../../../assets/images/home-services/cleaning.svg",
      url: "services",
    },
    {
      name: "Estate Agents & Rental Agreement",
      icon: "../../../assets/images/home-services/estate.svg",
      url: "services",
    },
    {
      name: "Electrician & AC Services",
      icon: "../../../assets/images/home-services/electrician.svg",
      url: "services",
    },
    {
      name: "Carpentry & Plumbing Services",
      icon: "../../../assets/images/home-services/carpentry.svg",
      url: "services",
    },
    {
      name: "Packers and Movers Services",
      icon: "../../../assets/images/home-services/packers.svg",
      url: "landing-page",
    },
    {
      name: "Pest Control Services",
      icon: "../../../assets/images/home-services/pest-control.svg",
      url: "services",
    },
    {
      name: "Beauty Parlour & Barber Service",
      icon: "../../../assets/images/home-services/beauty.svg",
      url: "services",
    },
  ];
  cities = [
    { name: "Kolkata", url: "/kolkata" },
    { name: "Bangalore", url: "/bangalore" },
    { name: "Mumbai", url: "/mumbai" },
    { name: "Pune", url: "/pune" },
    { name: "Gurgaon", url: "/gurgaon" },
    { name: "Chennai", url: "/chennai" },
    { name: "Ahamdabaad", url: "/ahamdabaad" },
  ];
  selectedOption: string | undefined;
  @Input() CategoryList: any;
  FeaturedPartnerList: any;
  fragment: any;
  cat_id: any;
  cat_name: any;
  ImageserverUrl=environment.ImageserverUrl
  constructor(
    private apiservice: httpService,
    public SubcategoryService: SubcategoryService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit() {
   /*  this.actRoute.paramMap.subscribe((params) => {
      this.fragment = params.get("fragment");
      this.cat_id = params.get("cat_id");
      this.cat_name = params.get("cat_name");
      this.fragment = params.get("fragment");
      console.log(this.cat_name);
      this.getChildCategories(this.cat_id);
    }); */

    //this.getAllCategories();
    //this.getAllfeaturedParters()
  }
  /* getAllCategories() {
    let spname = "get_category_read";
    let ptype = "readallactive";
    let pid = 0;
    this.apiservice.apiPost(spname, ptype, pid).subscribe((res: any) => {
      console.log("getAlllCategories", res);
      let temp = res.filter(
        (c: { isleaf: boolean; active: boolean }) =>
          c.isleaf == false && c.active == true
      );
      this.CategoryList = temp;
    });
  } 
  getChildCategories(cat_id: number) {
    /*  let spname = "get_childcategory_read"
  let ptype = "readall"
  let pid = cat_id
  this.apiservice.apiPost(spname, ptype, pid).subscribe((res: any) => {
    console.log('getChildCategories', res);
    this.CategoryList = res;

  });
    this.SubcategoryService.getChildCategories(cat_id).subscribe((res: any) => {
      console.log("getChildCategories", res);
      this.CategoryList = res;
    });
  } */
}
