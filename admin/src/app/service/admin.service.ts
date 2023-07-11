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
    private _http: HttpClient,
  ) { 
    this.url = global.url;
  }

  login_admin(data:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'login_admin',data,{headers:headers});
  }

  getToken(){
    return localStorage.getItem('token');
  }

 
  public isAuthenticated(allowRoles : string[]):boolean{

    const token = localStorage.getItem('token');
    

    if(!token){
      return false;
    }

    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);

      console.log(decodedToken);
      
      if(helper.isTokenExpired(token)){
        localStorage.clear();
        return false;
      }

      if(!decodedToken){
          console.log('NO ES VALIDO');
          localStorage.removeItem('token');
          return false;
        }
      } catch (error) {
        localStorage.removeItem('token');
        return false;
      }
    

    return allowRoles.includes(decodedToken['role']);
  }
  
  actualiza_config_admin(id:any,data:any,token:any):Observable<any>{
    if(data.logo){
      let headers = new HttpHeaders({'Authorization':token});

      const fd = new FormData();
      fd.append('titulo',data.titulo);
      fd.append('serie',data.serie);
      fd.append('correlativo',data.correlativo);
      fd.append('categorias',JSON.stringify(data.categorias));
      fd.append('logo',data.logo);
      return this._http.put(this.url+'actualiza_config_admin/'+id,fd,{headers:headers});
    }else{
      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this._http.put(this.url+'actualiza_config_admin/'+id,data,{headers:headers});
    }
    
  }

  obtener_config_admin(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_config_admin',{headers:headers});
  }

  obtener_config_publico():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'obtener_config_publico',{headers:headers});
  }

  obtener_mensajes_admin(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_mensajes_admin',{headers:headers});
  }

  cerrar_mensaje_admin(id:any,data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'cerrar_mensaje_admin/'+id,data,{headers:headers});
  }

  obtener_ventas_admin(desde:any,hasta:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_ventas_admin/'+desde+'/'+hasta,{headers:headers});
  }

  obtener_detalles_ordenes_cliente(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_detalles_ordenes_cliente/'+id,{headers:headers});
  }
  //KPI
  kpi_ganancias_mensuales_admin(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'kpi_ganancias_mensuales_admin',{headers:headers});
  }
}

