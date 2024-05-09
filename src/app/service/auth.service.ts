import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user";
import { StorageService } from "./storage.service";
import { LOCAL_VARIABLES } from "../constants/constants";

interface JWTToken {
  name: string;
  exp: number;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly API_URL = environment.CommonApiServer + "api/User/";

  private userSubject = new BehaviorSubject<User | null>(null);
  public user!: Observable<User | null>;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  constructor(
    private readonly http: HttpClient,

    private readonly route: Router,
    private storageService: StorageService
  ) {
    this.userSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem(LOCAL_VARIABLES.CURRENT_USER) || "{}")
    );
    this.user = this.userSubject.asObservable();
  }
  public get currentUserValue(): User | null {
    return this.userSubject.value;
  }

  get token() {
    return this.storageService.getFromStorage(LOCAL_VARIABLES.TOKEN);
  }

  set token(token: string) {
    if (!this.storageService.isEmpty(token)) {
      this.storageService.putInStorage(LOCAL_VARIABLES.TOKEN, token);
    }
  }

  // /**
  //  * @param  {string} token
  //  * @returns Date
  //  */
  // getTokenExpirationDate(token: string) {
  //   const decoded = jwt_decode<JWTToken>(token);

  //   if (decoded.exp === undefined) {
  //     return null;
  //   }

  //   const date = new Date(0);
  //   date.setUTCSeconds(decoded.exp);

  //   return date;
  // }

  // /**
  //  * @returns boolean
  //  */
  // isTokenExpired() {
  //   if (!Boolean(this.token)) {
  //     return true;
  //   }
  //   const date = this.getTokenExpirationDate(this.token);
  //   if (date === undefined) {
  //     return false;
  //   }

  //   return !(date !== null ? date.valueOf() > new Date().valueOf() : false);
  // }

  /**
   * @description Function to set userDetails in local storage
   * @param  {string} token
   * @param  {string} CUSTOMER_ID
   *  @param  {string} name
   * @param  {string} image
   * @param  {string} userCode
   * @param  {string} user_type
   * @returns void
   */
  setUserDetails(
    token: string | undefined,
    CUSTOMER_ID: string | undefined,
    name: string | undefined,
    image: any,
    userCode: string | undefined,
    user_type: string | undefined
  ) {
    this.storageService.putInStorage(LOCAL_VARIABLES.TOKEN, token);
    this.storageService.putInStorage(LOCAL_VARIABLES.CUSTOMER_ID, CUSTOMER_ID);
    this.storageService.putInStorage(LOCAL_VARIABLES.NAME, name);
    this.storageService.putInStorage(LOCAL_VARIABLES.IMAGE, image);

    this.storageService.putInStorage(LOCAL_VARIABLES.USER_CODE, userCode);
    this.storageService.putInStorage(LOCAL_VARIABLES.USER_TYPE, user_type);
    //this.storageService.putInStorage(LOCAL_VARIABLES.CLIENT_THEME, clientTheme);
  }

  removeUserDetails() {
    localStorage.removeItem(LOCAL_VARIABLES.CURRENT_USER);

    this.storageService.removeFromStorage(LOCAL_VARIABLES.TOKEN);
    this.storageService.removeFromStorage(LOCAL_VARIABLES.CUSTOMER_ID);
    this.storageService.removeFromStorage(LOCAL_VARIABLES.NAME);
    this.storageService.removeFromStorage(LOCAL_VARIABLES.IMAGE);

    this.storageService.removeFromStorage(LOCAL_VARIABLES.USER_CODE);
    this.storageService.removeFromStorage(LOCAL_VARIABLES.USER_TYPE);
    this.storageService.removeFromStorage(LOCAL_VARIABLES.USER_EMAIL);
    this.storageService.removeFromStorage(LOCAL_VARIABLES.USER_PHONE);
    this.storageService.removeFromStorage(LOCAL_VARIABLES.USER_CITY);
    this.storageService.removeFromStorage(LOCAL_VARIABLES.USER_ADDREES);
    this.userSubject.next({} as any);
    //this.common.pageAccessList = [];
    // this.common.showNotification = false;
    //this.common.showSettings = false;
  }

  async isAuthenticated(path: any) {
    const newPath = path.charAt(0).toUpperCase() + path.slice(1);

    const promise = new Promise((resolve, reject) => {
      if (this.storageService.getFromStorage(LOCAL_VARIABLES.TOKEN) !== null) {
        resolve(this.storageService.getFromStorage(LOCAL_VARIABLES.TOKEN));
      } else {
        reject(this.route.navigate(["/auth/login"]));
      }
    });

    return promise;
  }
  isLoggedIn(): boolean {
    let currentUser = this.currentUserValue;

    if (!currentUser) {
      return false;
    }

    // check if token is expired
    if (currentUser.token) {
      const jwtToken = JSON.parse(atob(currentUser.token.split(".")[1]));

      const tokenExpired = Date.now() > jwtToken.exp * 1000;

      return !tokenExpired;
    }
    return false;
  }
  setUser(data: any) {
    this.storageService.putInStorage(LOCAL_VARIABLES.CURRENT_USER, data);

    this.storageService.putInStorage(LOCAL_VARIABLES.TOKEN, data.token);
    this.storageService.putInStorage(LOCAL_VARIABLES.TOKEN, data.custMobile);
    this.storageService.putInStorage(LOCAL_VARIABLES.NAME, data.custName);

    //this.storageService.putInStorage(LOCAL_VARIABLES.IMAGE, data.userImage);

    this.storageService.putInStorage(LOCAL_VARIABLES.USER_CODE, data.id);
    this.storageService.putInStorage(LOCAL_VARIABLES.CUSTOMER_ID, data.id);
    this.storageService.putInStorage(
      LOCAL_VARIABLES.USER_EMAIL,
      data.custEmail
    );
    this.storageService.putInStorage(
      LOCAL_VARIABLES.USER_PHONE,
      data.custMobile
    );
    this.storageService.putInStorage(LOCAL_VARIABLES.USER_CITY, data.custCity);
    this.storageService.putInStorage(
      LOCAL_VARIABLES.USER_ADDREES,
      data.custAddress
    );
    this.storageService.putInStorage(LOCAL_VARIABLES.TOKEN, data.token);
    this.storageService.putInStorage(LOCAL_VARIABLES.CUSTOMER_ID, data.id);
    this.emitLoginSuccess(data);
  }
  emitLoginSuccess(data: any): void {
    this.userSubject.next(data);
  }
  purgeAuth() {
    // Set current user to an empty object

    this.removeUserDetails();
    // Set auth status to false

    localStorage.clear();
    window.location.reload();
  }
  logOutUserSession() {
    const URL = `${this.API_URL}/logOut/${this.storageService.getFromStorage(
      LOCAL_VARIABLES.USER_CODE
    )}`;
    return this.http.get(URL);
  }
}
