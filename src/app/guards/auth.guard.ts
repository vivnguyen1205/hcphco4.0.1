import {Injectable} from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
    Route
} from '@angular/router';
import {Observable} from 'rxjs';
import {AppService} from '@services/app.service';
import { TokenStorageService } from '@services/token-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root',
    
})
export class AuthGuard  {
    constructor(
        private router: Router,
        private appService: AppService, 
        private tokenService: TokenStorageService,
        private jwtHelper: JwtHelperService,
    ) {}

    async canActivate(activateRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Promise<boolean> {
        const token = this.tokenService.getToken();
 
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            // console.log(this.jwtHelper.decodeToken(token))
            return true;
        }
 
        // const isRefreshSuccess = await this.tryRefreshingTokens(token);
        // if (!isRefreshSuccess) {
        //     this.authService.logout();
        // }
 
        const url: string = routerState.url;
        return this.checkLogin(url);
    }
 
    canLoad(route: Route): boolean {
        let url = `/${route.path}`;
        return this.checkLogin(url);
      }
   
      checkLogin(url: string): boolean {
        var loggedInUser = this.tokenService.getUser();
        if (loggedInUser) {
          var listPermission = JSON.parse(loggedInUser.permissions);
          if (listPermission != null && listPermission != '' || listPermission == '')
            return true;
   
          else {
            this.router.navigate(['/login'], {
              queryParams: {
                returnUrl: url
              }
            });
            return false;
          }
   
   
   
        }
        else {
          this.router.navigate(['/login'], {
            queryParams: {
              returnUrl: url
            }
          });
          return false;
        }
      }

    // canActivate(
    //     next: ActivatedRouteSnapshot,
    //     state: RouterStateSnapshot
    // ):
    //     | Observable<boolean | UrlTree>
    //     | Promise<boolean | UrlTree>
    //     | boolean
    //     | UrlTree {
    //     return this.getProfile();
    // }

    // canActivateChild(
    //     next: ActivatedRouteSnapshot,
    //     state: RouterStateSnapshot
    // ):
    //     | Observable<boolean | UrlTree>
    //     | Promise<boolean | UrlTree>
    //     | boolean
    //     | UrlTree {
    //     return this.canActivate(next, state);
    // }

    // async getProfile() {
    //     if (this.appService.user) {
    //         return true;
    //     }

    //     try {
    //         await this.appService.getProfile();
    //         return true;
    //     } catch (error) {
    //         return false;
    //     }
    // }
}
