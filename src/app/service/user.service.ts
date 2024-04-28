import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, ReplaySubject } from 'rxjs';
import { httpService } from './http.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  /* private currentUserSubject = new BehaviorSubject<any>({} as any);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated =  this.isAuthenticatedSubject.asObservable(); */
  apiUrl = environment.CommonApiServer + 'api/User/';
  constructor(private httpservice:httpService,private http: HttpClient) { }
  register(reqdata:any){



    return this.httpservice.postService(reqdata)
    //return data;
  }
  login(reqdata:any){
    return this.httpservice.postService(reqdata)
    //return data;
  }
  SendOPT(mobileNo:any){
   return this.http.post(this.apiUrl+"SendOTP?mobileNo="+ mobileNo,{});
    //return data;
  }
  VerifyOPT(mobileNo:any,code:any){
    return this.http.post(this.apiUrl+"VerifyOTP?mobileNo="+ mobileNo+"&code="+code,{});
     //return data;
   }
  forget(data:any){
    let datatemp:any
    let header = {
      headers:new HttpHeaders({
        'Content-type':'application/json'
      })
    }
   //return this.httpservice.postService("https://localhost:44305/api/User/ForgotPassword?email="+data.email, {}, false, header)
   return datatemp;
  }
  reset(data:any){
    let datatemp:any
    let header = {
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJqYW50bzQxMTVAZ21haWwuY29tIiwiSWQiOiIxNiIsImV4cCI6MTY0OTQwOTgxOX0.mb4_4pswCHCEbPROI2vUC1Ffciwg7l4mti5LZTCNago'
      })
    }
   //return this.httpservice.putService("https://localhost:44322/api/User/ResetPassword", data, true, header)
   return datatemp;
  }
  /* setAuth(user: any) {

    this.currentUserSubject.next(user);
    localStorage.setItem("user", user);

    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
    localStorage.setItem("isAuthenticated", "true");
  }
  purgeAuth() {

    // Set current user to an empty object
    this.currentUserSubject.next({} as any);
    localStorage.removeItem("user");
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem("isAuthenticated");
  }
  getCurrentUser(): any {
    return (localStorage.getItem("user")?localStorage.getItem("user"):this.currentUserSubject.value);
  } */
}
