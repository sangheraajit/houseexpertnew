import { Component, OnInit, HostListener, EventEmitter } from "@angular/core";
// import { DDLItem, DDLItemCategory } from "../../../@core/models/model";
import { DomSanitizer } from "@angular/platform-browser";
//import {  MessageService } from 'primeng/api';
import { Router } from "@angular/router";

import { OrderService } from "src/app/service/order.service";
import { UserService } from "src/app/service/user.service";
import { AuthService } from "src/app/service/auth.service";
import { environment } from "src/environments/environment";
import { httpService } from "src/app/service/http.service";
import { ToastService } from "src/app/service/toast.service";
//import { PackersAndMoversMainComponent } from "src/app/sub-category/packers-and-movers-main/packers-and-movers-main.component";
declare var Razorpay: any;
@Component({
  selector: "app-my-booking",
  templateUrl: "./my-booking.component.html",
  styleUrls: ["./my-booking.component.scss"],
})
export class MyBookingComponent implements OnInit {
  private msg: string = "";
  public dialog: any;
  public dialogdetail: any[] = [];
  public dialogpayment: any[] = [];
  public ddlpart: any[] = [];
  public ddlcust: any;
  public ddlpackage: any[] = [];
  public showdetail = false;
  public showpayment = false;
  public packagename = "";
  public vehiclename = "";
  public partnername = "Not Assigned";
  public strdate = "";
  public paidamount = 0;
  public gstrate = environment.gstrate;
  public insurancerate = environment.insurancerate;
  public NextButtonLabel = "";
  private orderno = "";
  public payamount = "";
  private razorpayorderno = "";
  private paymenttype = "";
  currentUser: any;
  public noimageurl =
    "../../assets/images/all-categories/icons/diploma-interface-svgrepo-com.svg";
  public ImageserverUrl = environment.ImageserverUrl + "article/";
  constructor(
    public userService: UserService,
    private orderService: OrderService,
    private messageService: ToastService,
    //private packersAndMoversMainComponent: PackersAndMoversMainComponent,
    private ServiceObj: httpService,
    private _sanitizer: DomSanitizer,
    private router: Router,
    private authService: AuthService
  ) {
    if (
      localStorage.getItem("Message") != null &&
      localStorage.getItem("Message") != undefined
    )
      this.msg = localStorage.getItem("Message") as string;
    this.getProvList();
    //this.getCustList();

    if (this.msg.length > 0) {
      this.dialog = JSON.parse(this.msg);
      this.getPackList();
      this.getVehicleList();
      this.getorderdetaillist(this.dialog.id);
      this.getpaymentdetaillist(this.dialog.id);
    }
    //this.dialog.orderdate.getHours()}}":00"{{this.dialog.orderdate.getHours()>12?"PM":"AM"}}-{{ this.dialog.orderdate.getHours()+2}}":00"{{this.dialog.orderdate.getHours()>12?"PM":"AM"
    if (Number(new Date(this.dialog.orderdate).getHours()) > 12) {
      this.strdate = (
        (Number(new Date(this.dialog.orderdate).getHours()) - 12).toString() +
        ":00" +
        "PM"
      ).toString();
      this.strdate =
        this.strdate +
        "-" +
        (
          (Number(new Date(this.dialog.orderdate).getHours()) - 10).toString() +
          ":00" +
          "PM"
        ).toString();
    } else {
      this.strdate = (
        Number(new Date(this.dialog.orderdate).getHours()).toString() +
        ":00" +
        "AM"
      ).toString();
      this.strdate =
        this.strdate +
        "-" +
        (
          (Number(new Date(this.dialog.orderdate).getHours()) + 2).toString() +
          ":00" +
          "AM"
        ).toString();
    }
    this.dialog.totkm = Math.ceil(this.dialog.totkm);
    if (
      this.dialog.orderstatus == "Quotation" ||
      this.dialog.orderstatus == "quotation"
    ) {
      this.payamount = this.dialog.tokenamount;
      this.NextButtonLabel = "Pay Token Amount ₹ " + this.payamount;
      this.paymenttype = "token";
    } else if (
      this.dialog.orderstatus == "Adminapproved" ||
      this.dialog.orderstatus == "adminapproved"
    ) {
      this.payamount = (
        this.dialog.grandtotal +
        this.dialog.gstamount +
        this.dialog.insuranceamount -
        this.dialog.discount -
        this.paidamount
      ).toString();
      //this.payamount =  (this.dialog.grandtotal - this.paidamount).toString();
      this.NextButtonLabel = "Pay Balance Amount ₹ " + this.payamount;
      this.paymenttype = "balance";
    }
  }

  private message = null;

  position = "toast-top-right";
  animationType = "flyLeft";
  title = "Result";
  content = `I'm cool toaster!`;
  timeout = 5000;
  toastsLimit = 5;
  type = "info";
  noedit = true;
  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    console.log("this.customerinformation currentUser", this.currentUser);
  }
  // closeModal() {
  //    this.activeModal.close();
  // }

  private getorderdetaillist(oid: string) {
    let pwhere1 = " orderid ='" + oid + "'";
    let body = {
      spname: "data_get",
      ptype: "readwhere",
      ptabname: "torderdtl",
      pid: 0,
      pwhere: pwhere1,
    };

    this.ServiceObj.apicall(body).subscribe(
      (res: any) => {
        // debugger;
        let data: any = res;

        console.log(data.results);
        if (data.length > 0) {
          this.dialogdetail = data;
          //this.sourcedatadtl.load(JSON.parse(data.results.table[0].document));
          //this.dialogdetail = JSON.parse(data.results.table[0].document);
        }
      },

      (err: any) => {
        this.message = err.error.msg;
      }
    );
  }
  insuranceamountchange() {
    this.dialog.insuranceamount =
      (this.dialog.forinsurance * environment.insurancerate) / 100;
  }
  discountamountchange() {}
  public processPayment() {
    let order = {
      amount: (Number(this.payamount) * 100).toString(),
      orderid: this.dialog.id,
    };

    var res: any;

    this.orderService.createRazorOrder(order).subscribe((res: any) => {
      this.razorpayorderno = res.razorpayorderno;

      this.paynow(
        this.payamount,
        this.razorpayorderno,
        this.currentUser.custName,
        this.currentUser.custEmail,
        this.currentUser.custMobile,
        this.currentUser.custAddress
      ); // {
      //this.paynow(res, order);
    });
  }
  paynow(
    TokenAmount: any,
    razorpayorderno: any,
    cust_name: any,
    cust_email: any,
    cust_mobile: any,
    fromaddress: any
  ) {
    let paymentoptions = this.preparePaymentDetails(
      TokenAmount,
      razorpayorderno,
      cust_name,
      cust_email,
      cust_mobile,
      fromaddress
    );
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

  preparePaymentDetails(
    TokenAmount: any,
    razorpayorderno: any,
    cust_name: any,
    cust_email: any,
    cust_mobile: any,
    fromaddress: any
  ) {
    // console.log(
    //   'ShoppingCartComponent -> preparePaymentDetails -> order',
    //   order,
    //   TokenAmount
    // );

    console.log("In preparePaymentDetails");

    return {
      key: environment.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: Number(TokenAmount) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 29935 refers to 29935 paise or INR 299.35.
      name: "House expert solutions pvt Ltd",
      currency: "INR",
      order_id: razorpayorderno, // order.id,//This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
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
        name: cust_name,
        email: cust_email,
        contact: cust_mobile,
      },
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        address: fromaddress,
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
          orderid: this.dialog.id,
          paymenttype: this.paymenttype, //'token',
          paymentid: event.detail.razorpay_payment_id,
          paymentmode: "razorpay",
          referenceno: this.razorpayorderno,
          currency: "INR",
          credit: this.payamount,
        },
      ],
      pid: 0,
    };
    this.ServiceObj.apicall(paymentdetail).subscribe((data: any) => {
      console.log("paymentId", data.message);

      this.messageService.showSuccessToast(
        "Request",
        "Thankyou for being a Customer for houseexpert"
      );
      this.orderService
        .SendWhatsAppsAdvancePay(this.dialog.id)
        .subscribe((res: any) => {});
      this.router.navigate(["bookinglist"]);
      //this.display = false;

      // delete this.bookingInformation.housetype;
      // delete this.bookingInformation.type;
      // delete this.bookingInformation.jdetail;
      // this.cart.emptyCart();
      // this.SubcategoryService.removeBookingInformation();
      // this.jheader = '';
      /*  setTimeout(() => {
        window.location.reload();
      }, 5000); */
      //need to review
      //this.router.navigate(['bookinglist'])
    });
  }
  private getpaymentdetaillist(oid: string) {
    let pwhere1 = " orderid ='" + oid + "'";
    let body = {
      spname: "data_get",
      ptype: "readwhere",
      ptabname: "tpayment",
      pid: 0,
      pwhere: pwhere1,
    };

    this.ServiceObj.apicall(body).subscribe(
      (res: any) => {
        // debugger;
        let data: any = res;
        console.log(data);
        // console.log(data.results);
        if (!this.dialog.forinsurance)
          //this.dialog.forinsurance = 100000;
          this.dialog.forinsurance = 0;
        if (!this.dialog.gstamount) this.dialog.gstamount = 0;
        //this.dialog.gstamount = Math.round((this.dialog.grandtotal * environment.gstrate)/100) ;
        if (!this.dialog.insuranceamount) this.dialog.insuranceamount = 0;
        //this.dialog.insuranceamount = Math.round((this.dialog.forinsurance * environment.insurancerate)/100) ;

        //if (data.results.table.length > 0) {
        if (data.length > 0) {
          this.paidamount = 0;
          //this.sourcedatapay.load(JSON.parse(data.results.table[0].document));
          //this.dialogpayment = JSON.parse(data.results.table[0].document);
          this.dialogpayment = data; // JSON.parse(data.results).Table;
          this.dialogpayment.forEach((itm) => {
            if (itm.credit) {
              this.paidamount += Number(itm.credit);
            }
            if (itm.debit) {
              this.paidamount -= Number(itm.debit);
            }
          });
          if (
            this.dialog.orderstatus == "Quotation" ||
            this.dialog.orderstatus == "quotation"
          ) {
            this.payamount = this.dialog.tokenamount;
            this.NextButtonLabel = "Pay Token Amount ₹ " + this.payamount;
            this.paymenttype = "token";
          } else if (
            this.dialog.orderstatus == "Adminapproved" ||
            this.dialog.orderstatus == "adminapproved" ||
            this.dialog.orderstatus == "ready"
          ) {
            this.payamount = (
              this.dialog.grandtotal +
              this.dialog.gstamount +
              this.dialog.insuranceamount -
              this.dialog.discount -
              this.paidamount
            ).toString();
            //this.payamount =  (this.dialog.grandtotal- this.paidamount).toString();
            this.NextButtonLabel = "Pay Balance Amount ₹ " + this.payamount;
            this.paymenttype = "balance";
          }
        }
      },

      (err: any) => {
        this.message = err.error.msg;
      }
    );
  }
  private getCustList() {
    // this.spinner.show();
    let body = {
      spname: "getdropdown",
      pdrptype: "DDL_CUST",
    };

    this.ServiceObj.apicall(body).subscribe(
      (res: any) => {
        let data: any = res;
        if (data.length > 0) {
          this.ddlcust = data as DDLItem[];
        }
      },
      (err: any) => {
        this.message = err.error.msg;
        // this.spinner.hide();
      }
    );
  }
  private getPackList() {
    // this.spinner.show();
    let body = {
      spname: "getdropdown",
      pdrptype: "DDL_PACKAGE",
    };

    this.ServiceObj.apicall(body).subscribe(
      (res: any) => {
        let data: any = res;
        if (data.length > 0) {
          this.ddlpackage = data as any[];
          this.packagename = this.ddlpackage.find(
            (x) => x.idval == this.dialog.packageid
          ).textval;
        }
      },
      (err: any) => {
        this.message = err.error.msg;
        // this.spinner.hide();
      }
    );
  }
  private getProvList() {
    // this.spinner.show();
    let body = {
      spname: "getdropdown",
      pdrptype: "DDL_PARTNER",
    };

    this.ServiceObj.apicall(body).subscribe(
      (res: any) => {
        let data: any = res;
        if (data.length > 0) {
          this.ddlpart = data as DDLItem[];
          if (this.dialog.part_id && this.dialog.part_id > 0)
            this.partnername = this.ddlpart.find(
              (x) => x.idval == this.dialog.part_id
            ).textval;
        }
      },
      (err: any) => {
        this.message = err.error.msg;
        // this.spinner.hide();
      }
    );
  }
  private getVehicleList() {
    // this.spinner.show();
    let body = {
      spname: "data_get",
      ptype: "read",
      ptabname: "tvehiclemst",
      pid: this.dialog.vehicleid,
    };

    this.ServiceObj.apicall(body).subscribe(
      (res: any) => {
        let data: any = res;
        if (data.length > 0) {
          this.vehiclename = data[0].vehiclename;
        }
      },
      (err: any) => {
        this.message = err.error.msg;
        // this.spinner.hide();
      }
    );
  }
  getSeverity(status: string) {
    switch (status) {
      case "Completed":
      case "ready":
        return "success";
      case "Token":
      case "adminapproved":
        return "warning";
      case "Quotation":
      case "new":
        return "danger";
      default:
        return "danger";
    }
  }
}
export class DDLItem {
  idval: string = "";
  textval: string = "";
}
