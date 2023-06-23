import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { global } from 'src/app/services/global';
import {  io } from "socket.io-client";



declare var $:any;
// import { io } from "socket.io-client";
import { GuestService } from 'src/app/services/guest.service';
import { PageEvent } from '@angular/material/paginator';
declare var iziToast:any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {

  public config_global : any = {};
  public filter_categoria = '';
  public productos : Array<any> =[];
  public filter_producto = '';
  public filter_cat_productos = 'todos';
  public url;
  public load_data = true;

  public socket = io('http://localhost:3000');

  public route_categoria : any;
  public page = 1;
  public pageSize = 7;

  public sort_by = 'Defecto';
  public carrito_data : any = {
    // variedad: '',
    cantidad: 1
  };
  public btn_cart = false;
  public token;



  public descuento_activo : any = undefined;


  

  constructor(
    private _clienteService:ClienteService,
    private _route: ActivatedRoute,
    private _guestService:GuestService
  ) { 
    this.token = localStorage.getItem('token');
    this.url = global.url;
    this._clienteService.obtener_config_publico().subscribe(
      response=>{
        this.config_global = response.data;

        
      }
    )
    this._route.params.subscribe(
        params=>{
          this.route_categoria = params['categoria'];
          
          if(this.route_categoria){
            this._clienteService.listar_productos_publico('').subscribe(
              response=>{
                this.productos = response.data;
                this.productos = this.productos.filter(item=>item.categoria.toLowerCase()==this.route_categoria);
                this.load_data = false;
                 
              }
            );
          }else{
            this._clienteService.listar_productos_publico('').subscribe(
              response=>{
      
                this.productos = response.data;
                this.load_data = false;
                
              }
            );
          }
          
        }
      );


        



  }
  

  hideSliderValue(value: number | null) {
    return '';
  }
  onSliderChange(event: any) {
    console.log('Valor actual del slider:', event.value);
  }
  minValue=30;
  maxValue=80;

  ngOnInit(): void {
    this._guestService.obtener_descuento_activo().subscribe(
      response=>{
        this.descuento_activo = response.data[0];
        console.log(this.descuento_activo);
      }
    )
  }
 
  buscar_categorias(){
    if(this.filter_categoria){
      var search = new RegExp(this.filter_categoria, 'i');
      this.config_global.categorias = this.config_global.categorias.filter((item:any)=>search.test(item.titulo)
      );
    }else{
      this._clienteService.obtener_config_publico().subscribe(
        response=>{
          this.config_global = response.data;
        }
      )
    }
  }

  buscar_producto(){
    this._clienteService.listar_productos_publico(this.filter_producto).subscribe(
      response=>{

        this.productos = response.data;
        this.load_data = false;
      }
    );
  }

  buscar_precios(){

    this._clienteService.listar_productos_publico(this.filter_producto).subscribe(
      response=>{

        this.productos = response.data;
        let min =  this.minValue;
        let max = this.maxValue;

        console.log(min);
        console.log(max);

        this.productos = this.productos.filter((item)=>{
          return item.precio >= min &&
                  item.precio <= max
        });
      }
    );  
    
  }


  buscar_por_categoria(){
      if(this.filter_cat_productos == 'todos'){
        this._clienteService.listar_productos_publico(this.filter_producto).subscribe(
          response=>{
    
            this.productos = response.data;
            this.load_data = false;
            
          }
        );
      }else{
        this._clienteService.listar_productos_publico(this.filter_producto).subscribe(
          response=>{
    
            this.productos = response.data;
            this.productos = this.productos.filter(item=>item.categoria==this.filter_cat_productos);
            this.load_data = false;
          }
        );
        
      }
      
  }
 
  reset_productos(){
    this.filter_producto = '';
    this._clienteService.listar_productos_publico('').subscribe(
      response=>{

        this.productos = response.data;
        this.load_data = false;
        
      }
    );
  }

  orden_por(){
      if(this.sort_by == 'Defecto'){
        this._clienteService.listar_productos_publico('').subscribe(
          response=>{
  
            this.productos = response.data;
            this.load_data = false;
            
          }
        );
      }else if(this.sort_by == 'Popularidad'){
        this.productos.sort(function (a, b) {
          
          if (a.nventas < b.nventas) {
            return 1;
          }
          if (a.nventas > b.nventas) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }else if(this.sort_by == '+-Precio'){
        this.productos.sort(function (a, b) {
          
          if (a.precio < b.precio) {
            return 1;
          }
          if (a.precio > b.precio) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }else if(this.sort_by == '-+Precio'){
        this.productos.sort(function (a, b) {
          
          if (a.precio > b.precio) {
            return 1;
          }
          if (a.precio < b.precio) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }else if(this.sort_by == 'azTitulo'){
        this.productos.sort(function (a, b) {
          
          if (a.titulo > b.titulo) {
            return 1;
          }
          if (a.titulo < b.titulo) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }else if(this.sort_by == 'zaTitulo'){
        this.productos.sort(function (a, b) {
          
          if (a.titulo < b.titulo) {
            return 1;
          }
          if (a.titulo > b.titulo) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }
  }

 
  // agregar_producto(producto:any){
  //   let data = {
  //     producto: producto._id,
  //     cliente: localStorage.getItem('_id'),
  //     cantidad: 1,
  //     variedad: producto.variedades[0].titulo,
  //   }
  //   this.btn_cart =true;
  //   this._clienteService.agregar_carrito_cliente(data,this.token).subscribe(
  //     response=>{
  //       if(response.data == undefined){
  //         iziToast.show({
  //             title: 'ERROR',
  //             titleColor: '#FF0000',
  //             color: '#FFF',
  //             class: 'text-danger',
  //             position: 'topRight',
  //             message: 'El producto ya existe en el carrito'
  //         });
  //         this.btn_cart =false;
  //       }else{
  //         console.log(response);
  //         iziToast.show({
  //             title: 'SUCCESS',
  //             titleColor: '#1DC74C',
  //             color: '#FFF',
  //             class: 'text-success',
  //             position: 'topRight',
  //             message: 'Se agregó el producto al carrito.'
  //         });
  //         this.socket.emit('add-carrito-add',{data:true});
  //         this.btn_cart =false;
  //       }
  //     }
  //   );
  // }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
  }



  agregar_producto(producto:any){
    let data = {
      producto: producto._id,
      cliente: localStorage.getItem('_id'),
      cantidad: 1,
      // variedad: producto.variedades[0].titulo,
    }
    this.btn_cart =true;
    this._clienteService.agregar_carrito_cliente(data,this.token).subscribe(
      response=>{
        if(response.data == undefined){
          iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              color: '#FFF',
              class: 'text-danger',
              position: 'topRight',
              message: 'El producto ya existe en el carrito'
          });
          this.btn_cart =false;
        }else{
          console.log(response);
          iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position: 'topRight',
              message: 'Se agregó el producto al carrito.'
          });
          this.socket.emit('add-carrito-add',{data:true});
          this.btn_cart =false;
        }
      }
    );

 }
  
}
