import { Injectable } from '@angular/core';
import { global } from './global'
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders }  from '@angular/common/http';
import { JwtHelperService  } from "@auth0/angular-jwt"
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public url;
    constructor(
      private _http:HttpClient,
    ) {
      this.url = global.url
    }

login_admin(data:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'login_admin',data,{headers:headers});
}
  
getToken(){
    return localStorage.getItem('token');
}

public isAuthenticated(allowRoles: string[]): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);
      console.log(decodedToken);
      if (!decodedToken) {
        console.log('Token inválido');
        localStorage.removeItem('token');
        return false;
      }
    } catch (error) {
      console.log('Error al decodificar el token');
      localStorage.removeItem('token');
      return false;
    }

    return allowRoles.includes(decodedToken['role']);
}
}
