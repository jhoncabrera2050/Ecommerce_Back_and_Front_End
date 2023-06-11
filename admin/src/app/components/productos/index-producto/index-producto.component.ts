import { Component, OnInit } from '@angular/core';
import { global } from 'src/app/service/global';
import { ProductoService } from 'src/app/service/producto.service';
// import { Workbook } from 'exceljs';
// import * as fs from 'file-saver';

declare var iziToast:any;
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {
  public load_data = true;
  public filtro = '';
  public token;
  public productos : Array<any> = [];
  public arr_productos : Array<any> = [];
  public url;
  public page = 1;
  public pageSize = 20;
  public load_btn =false;

  constructor(
    private _productoService : ProductoService
  ) { 
    this.token = localStorage.getItem('token');
    this.url = global.url;
  }

  ngOnInit(): void {
      this.init_data();
  }

  init_data(){
    this._productoService.listar_productos_admin(this.filtro,this.token).subscribe(
      response=>{
          console.log(response);
          this.productos = response.data;
          this.productos.forEach(element => {
              this.arr_productos.push({
                titulo: element.titulo,
                stock: element.stock,
                precio: element.precio,
                categoria: element.categoria,
                nventas: element.nventas
              });
          });
          console.log(this.arr_productos);
          
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
    this._productoService.eliminar_producto_admin(id,this.token).subscribe(
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