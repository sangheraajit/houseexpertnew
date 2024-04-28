import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from './user.service';
import { take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.info(route, "route!!!", route?.routeConfig?.path);
    return this.auth
      .isAuthenticated(route?.routeConfig?.path)
      .then((authenticated: boolean | any) => {
        if (authenticated) {
          return true;
        } else {
          return false;
        }
      });
  }
}
