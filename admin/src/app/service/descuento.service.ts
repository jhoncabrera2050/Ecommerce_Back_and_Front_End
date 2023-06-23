import { Injectable } from '@angular/core';
import { global } from './global'
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class DescuentoService {
  public url;

  constructor (
    private _http: HttpClient,
  
   ){
    this.url = global.url;
    }
    listar_descuentos_admin(filtro:any,token:any):Observable<any>{
      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this._http.get(this.url+'listar_descuentos_admin/'+filtro,{headers:headers});
    }
    eliminar_descuento_admin(id:any,token:any):Observable<any>{
      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this._http.delete(this.url+'eliminar_descuento_admin/'+id,{headers:headers});
    }
}
