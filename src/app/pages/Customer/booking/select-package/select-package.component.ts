import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from "@angular/core";

//import {  LoadingService } from 'src/app/service/interceptor/loading.service';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from "@angular/forms";

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { SubcategoryService } from "src/app/service/subcategory.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-select-package",
  templateUrl: "./select-package.component.html",
  styleUrls: ["./select-package.component.scss"],
})
export class SelectPackageComponent
  implements OnInit, ControlValueAccessor, Validator
{
  dateValue!: Date;
  minimumDate = new Date();

  @Input() PackageList: any;
  @Input() pagename: any = "package";

  @Input() orderHeader: any;
  @Input() ArticlemstlistAll: any;
  
  selectedValues: any;
  selectedPackage: any;
  public gstrate = environment.gstrate;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(
    public SubcategoryService: SubcategoryService,
    private activeModal: NgbActiveModal
  ) {}
  public packegeform: FormGroup = new FormGroup({
    packageid: new FormControl("", [Validators.required]),
  });
  ngOnInit() {
   
    console.log('ArticlemstlistAll', this.ArticlemstlistAll);
    console.log("PackageList", this.PackageList);
    console.log("orderHeader", this.orderHeader);
     console.log("pagename", this.pagename);
    this.selectedValues =this.orderHeader.packageid;
    console.log("onSelect package event", this.selectedValues);
    if (this.pagename == "package" || this.pagename == "mybooking") {
      this.SubcategoryService.getAllPackage2(
        0,
        this.orderHeader.totalcft,
        Math.ceil(this.orderHeader.totkm),
        this.orderHeader.fromlift == true
          ? 0
          : Math.ceil(this.orderHeader.fromfloor),
        this.orderHeader.tolift == true
          ? 0
          : Math.ceil(this.orderHeader.tofloor)
      ).subscribe(
        (res: any) => {
          /*  console.log('getAllPackage', res);

      this.PackageList = res;
      this.PackageList.forEach((element: any) => {
        element.packageTotal = element.getcalculateamounts;

    // this.PackageList.forEach((element:any) => {
    //   element.packageTotal=element.packageamount+this.jheader.total;

    }); */
          // debugger;
          let data: any = res;

          console.log(data.results);
         
            //this.sourcedatadtl.load(JSON.parse(JSON.parse(data.results).Table[0].document));
            this.PackageList = data
            this.PackageList.forEach((element: any) => {
              element.packageTotal = element.getcalculateamounts;
            });
          
        },

        (err) => {
          // this.message = err.error.msg;
        }
      );
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
    this.selectedValues = event;
    this.selectedPackage = item;
  }
  public onTouched: () => void = () => {};

  writeValue(val: any): void {
    val && this.packegeform.setValue(val, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    //console.log("on change");
    this.packegeform.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    //console.log("on blur");
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.packegeform.disable() : this.packegeform.enable();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    //console.log("Basic Info validation", c);
    return this.packegeform.valid
      ? null
      : { invalidForm: { valid: false, message: "fields are invalid" } };
  }
  closeModal() {
    this.activeModal.close();
  }
  SaveData() {
    


   
    
    // publish the new values ... all sbscribers will receive the new data
   
    var cartTotal = this.selectedPackage.packageTotal;
    //var Totalcft = totalcftValue;
    var TokenAmount = this.percentage(15, cartTotal)

    this.orderHeader.packageid=this.selectedValues;
    var gstamount = Math.round(
      (cartTotal * this.gstrate) / 100
    );
      
      this.orderHeader.total=cartTotal,
      this.orderHeader.TokenAmount=TokenAmount,
      this.orderHeader.grandtotal=cartTotal
      
    this.passEntry.emit(this.orderHeader);
    this.activeModal.close(this.orderHeader);
  }
  
  percentage(percent: number, total: number) {
    return ((percent / 100) * total).toFixed(2)
  }
}
