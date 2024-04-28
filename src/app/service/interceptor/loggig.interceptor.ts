import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable()
export class LoggigInterceptor implements HttpInterceptor {

  constructor(private loaderService:LoadingService) {}



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const started = Date.now()
    this.loaderService.show();

  return next.handle(req).pipe(
      finalize(() => {
        this.loaderService.hide()
          const elapsed = Date.now() - started;
          console.log(`URL: ${req.url} Method: ${req.method} Time took: ${elapsed} ms`)
      }))
  }
}

