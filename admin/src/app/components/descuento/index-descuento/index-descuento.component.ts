import { Component, OnInit } from '@angular/core';
import { DescuentoService } from 'src/app/service/descuento.service';
import {global} from 'src/app/service/global';
declare var iziToast:any;
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-index-descuento',
  templateUrl: './index-descuento.component.html',
  styleUrls: ['./index-descuento.component.css']
})
export class IndexDescuentoComponent implements OnInit {
  public load_data = true;
  public filtro = '';
  public token;
  public descuentos : Array<any> = [];
  public arr_descuentos : Array<any> = [];
  public url;
  public page = 1;
  public pageSize = 20;
  public load_btn =false;

  constructor(
    private _descuentoService : DescuentoService
  ) { 
    this.token = localStorage.getItem('token');
    this.url = global.url;
  }

  ngOnInit(): void {
    this.init_data();
  }
  init_data(){
    this._descuentoService.listar_descuentos_admin(this.filtro,this.token).subscribe(
      response=>{
          console.log(response);
          this.descuentos = response.data;
          this.descuentos.forEach(element => {
            var tt_inicio = Date.parse(element.fecha_inicio+"T00:00:00")/1000;
            var tt_fin = Date.parse(element.fecha_fin+"T00:00:00")/1000;

            var today = Date.parse(new Date().toString())/1000;

            if(today>tt_inicio){
              element.estado = 'Expirado';
            }
            if(today<tt_inicio){
              element.estado = 'Proximamente';
            }
            if(today>= tt_inicio && today<= tt_fin){
              element.estado = 'En progreso';
            }
            
        });

          
          this.load_data = false;
      },
      error=>{
        console.log(error);
        
      }
    )
  }
  filtrar(){
    if(this.filtro){

    }else{
      iziToast.show({
        title: 'CORRECTO',
        titleColor: '#1DC740',
        class: 'text-success',
        position: 'topRight',
        message: 'Ingrese un filtro para buscar'
      });
    }
  }
  eliminar(id:any){
    this.load_btn = true;
    this._descuentoService.eliminar_descuento_admin(id,this.token).subscribe(
       response=>{
        iziToast.show({
          title :'SUCCESS',
          titleColor : '#1DC74C',
          color : '#FFF',
          class : 'text-success',
          position : 'topRight',
          message:'Se elimino correctamente el cliente'
        });
        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.load_btn = false;
        this.init_data();
       },
       error=>{
        console.log(error);
        this.load_btn = false;
       }
    )
  }
}
