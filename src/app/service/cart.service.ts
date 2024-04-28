import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public allItems: any = {};
  public cartData: any = [];
  public cartItemsList: any = {};
  public cartTotal: any = 0;
  public Totalcft: any = 0;
  public TokenAmount: any = 0;
  public cartItemsStorageName = 'mycart';
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor(public storage: StorageService) {
    this.loadCart();
  }

  loadCart() {
    let temp = this.storage.get('mycart');
    if (temp === undefined || temp === '' || temp === null) {
      this.cartData = {};
      //this.cartItemsList=[]
    } else {
      this.cartData = temp;
    }
  }

  addToCart(pid: any, qty: any, replace: string) {

    if (this.cartData[pid] == undefined) {
      this.cartData[pid] = 0;
    }
    if (replace === '') {
      this.cartData[pid] = this.cartData[pid] + qty;
    } else {
      this.cartData[pid] = parseInt(qty);
    }

    if (this.cartData[pid] == 0) {
      delete this.cartData[pid];
    }
    this.storeItems();
  }

  storeItems() {
    this.storage.set({
      'mycart': this.cartData
    });
    this.listCartItems();
  }

  listCartItems() {
    let tempCart: any = [];
    let getActualItems = Object.keys(this.cartData);
    let cartDataItems = this.cartData;
    let tempTotal = 0;

    var onlyChoosenItems = (this.allItems).filter(function (item: any) {
      //console.log("getActualItems.indexOf", getActualItems.indexOf(item.itemname))
      //if (getActualItems.indexOf(item.itemname) !== -1) {
      //myArray.find(item => item.id === 2)
      if (getActualItems.find(x => x === item.itemname)) {
        tempCart.push({
          pid: item.id,
          name: item.itemname,
          qty: cartDataItems[item.itemname],
          price: item.cft_rate * cartDataItems[item.itemname],
          cft: item.cft
        });
       // tempTotal += item.cft_rate * cartDataItems[item.itemname];
      }
    });


    this.cartItemsList = tempCart;
    //console.log("cartItemsList", this.cartItemsList)
    this.computeCartTotals();
  }
  percentage(percent: number, total: number) {
    return ((percent / 100) * total).toFixed(2)
  }
  loadCheckoutInfo(storageKey: string) {
    return this.storage.get(storageKey)
  }

  emptyCart() {
    this.storage.set({
      mycart: {}
    })
  }
  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    let totalcftValue: number = 0;
    for (let currentCartItem of this.cartItemsList) {
      totalPriceValue += currentCartItem.qty * currentCartItem.price;
      totalQuantityValue += currentCartItem.qty;
      //totalcftValue+=currentCartItem.cft
      totalcftValue+=(currentCartItem.cft*currentCartItem.qty)
    }
    
    // publish the new values ... all sbscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    this.cartTotal = totalPriceValue;
    this.Totalcft = totalcftValue;
    this.TokenAmount = this.percentage(15, this.cartTotal)


  }
}
