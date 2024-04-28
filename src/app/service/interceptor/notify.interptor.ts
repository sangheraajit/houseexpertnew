import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from "@angular/common/http";
import { iif, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ToastService } from "../toast.service";



@Injectable()
export class NotifyInterceptor implements HttpInterceptor {
  constructor(public messageService: ToastService) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {



    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          let body = event.body
          if(body?.results)
          {
          let results = JSON.parse(body?.results);
          //console.log("results",JSON.parse(results))
          if (results?.Table) {
            let Table = results?.Table[0];
            let document = Table.document;
            if (document) {
              let data = JSON.parse(document)
              if (data.Error) {
                this.messageService.showErrorToast("error",  data.Error );
              }
              else if (data.Done) {
                this.messageService.showSuccessToast('Success', 'Data saved succsufully' );
              }
            }
            else {
              /* if(!Array.isArray(Table))
              {

                  //data.forEach(element => {
                    let message=""
                    for (let [key, value] of Object.entries(Table)) {
                      console.log(`${key}: ${value}`);
                      message=`${key}: ${value}`
                      this.messageService.add({severity:'error', summary: 'Error', detail: message});
                    }
                 // });

              }*/
            }
          }
          else
          {
            this.messageService.showErrorToast('Error', "Something went wrong");
          }
        }
      }
      })
    );
  }
}
