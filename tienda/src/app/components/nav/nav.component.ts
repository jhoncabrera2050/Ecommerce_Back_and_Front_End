import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { global } from 'src/app/services/global';
import {  io } from "socket.io-client";
import { GuestService } from 'src/app/services/guest.service';

declare var $:any;
declare var iziToast:any;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public token;
  public id;
  public user: any = undefined;
  public user_lc : any | string | null = undefined;  
  public op_cart = false;
  public config_global : any = {};

  public carrito_arr : Array<any> | any =[];
  public url;
  public subtotal : any = 0;

  

  public socket = io('http://localhost:3000');
  constructor(
    private _clienteService: ClienteService,
    private _guestService: GuestService,
    private _router : Router,

  ) {
    this.url=global.url;
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');
    console.log(this.user_lc);
    this._clienteService.obtener_config_publico().subscribe(
      response=>{
        this.config_global = response.data;
        console.log(this.config_global);
 
      }
    )

    if(this.token){
      this._clienteService.obtener_cliente_guest(this.id, this.token).subscribe(response => {
        this.user_lc = response.data;
        localStorage.setItem('user_data', JSON.stringify(this.user_lc));
        this.obtener_carrito();
        
      });
    }
  }
  // this.socket.on('new-carrito', function(data:any) {
    //   if (!this.user.isLoggedIn()) {
    //     return this.sendError('You must be logged in to create a new cart.');
    //   }
    //   this.obtener_carrito();
    // }.bind(this));

    

  obtener_carrito(){
    this._clienteService.obtener_carrito_cliente(this.user_lc._id, this.token).subscribe(response => {
      console.log(response);
      this.carrito_arr = response.data;
      this.calcular_carrito();
    });
  }
  handleNewCarrito(data: any): void {
    console.log(data);
    this.obtener_carrito();
  }

  handleNew2Carrito(data: any): void {
    console.log(data);
    this.obtener_carrito();
  }
  ngOnInit(): void {
  
    this.socket.on('new-carrito', this.handleNewCarrito.bind(this));
    this.socket.on('new-carrito-add', this.handleNew2Carrito.bind(this));
  }

    
  logout(){
    window.location.reload();
    localStorage.clear();
    this._router.navigate(['/']);
  }
  op_modalcart(){
    if(!this.op_cart){
      this.op_cart = true;
      $('#cart').addClass('show');
    }else{
      this.op_cart = false;
      $('#cart').removeClass('show');
    }
  }


  calcular_carrito(){
    this.subtotal= 0;
    this.carrito_arr.forEach((element:any) => {
      this.subtotal = this.subtotal + parseInt(element.producto.precio);
    });
  }

  eliminar_item(id:any){
    this._clienteService.eliminar_carrito_cliente(id,this.token).subscribe(
      response=>{ 
        iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Se eliminó el producto correctamente.'
        });
        this.socket.emit('delete-carrito',{data:response.data});
        console.log(response);
        
      }
    );
  }

}
