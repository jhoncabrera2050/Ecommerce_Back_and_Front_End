import {  Injectable } from "@angular/core"
import {  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateFn } from '@angular/router'
import { Observable } from "rxjs";
import { AdminService } from "src/app/service/admin.service";
import { Router } from '@angular/router';
@Injectable({
  providedIn:'root'
})
export class AdminGuard implements CanActivate{
  constructor(
    private _adminService:AdminService,
    private _router:Router
  ) {
    
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(!this._adminService.isAuthenticated(['admin'])){
      this._router.navigate(['/login']);
      return false;
    }else{
      return true;
    }
  }
}