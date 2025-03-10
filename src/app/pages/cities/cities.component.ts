import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { httpService } from 'src/app/service/http.service';
import { StorageService } from 'src/app/service/storage.service';
import { SubcategoryService } from 'src/app/service/subcategory.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent {
Citylist: any;
cityname:any="";
constructor(

    private router: Router,
    private actRoute: ActivatedRoute,
    private apiservice: httpService,
    public SubcategoryService: SubcategoryService,
    private storageservice: StorageService,

  ) {
    console.log('in constructor');
    this.actRoute.paramMap.subscribe((params) => {
      this.cityname = this.titleCase(params.get('cityname'));
     
      console.log("cityname",this.cityname);
     
    });


  
    this.SubcategoryService.getAllCities().subscribe((citylist:any) => {
      this.Citylist = citylist;
      console.log('Citylist', citylist);
    });
   

  }
   titleCase(str:any) {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, function(match:any) {
        return match.toUpperCase();
    });
  }
}
