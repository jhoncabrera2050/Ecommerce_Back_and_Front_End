import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { global } from 'src/app/services/global';
import {  io } from "socket.io-client";
declare var iziToast:any;
declare var Cleave:any;
declare var StickySidebar:any;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{
  public idcliente;
  public token;
  public url;
  public total_pagar = 0;

  public socket = io('http://localhost:3000');


  public carrito_arr : Array<any>=[];
  // public url;
  public subtotal = 0;

  constructor(
    private _clienteService:ClienteService
  ){
    this.url = global.url;
    this.idcliente= localStorage.getItem('_id');
    this.token= localStorage.getItem('token');
    this._clienteService.obtener_carrito_cliente(this.idcliente, this.token).subscribe(response => {
      console.log(response);
      this.carrito_arr = response.data;
      this.calcular_carrito();
    });
  }

  //METODO DE PAGO
  ngOnInit(): void {
    setTimeout(()=>{
      new Cleave('#cc-number', {
        creditCard: true,
        onCreditCardTypeChanged: function (type:any) {
            // update UI ...
        }
    });

    new Cleave('#cc-exp-date', {
      date: true,
      datePattern: ['m', 'y']
    });

    var sidebar = new StickySidebar('.sidebar-sticky', {topSpacing: 20});
  })


  }
  calcular_carrito(){
    this.carrito_arr.forEach((element:any) => {
      this.subtotal = this.subtotal + parseInt(element.producto.precio);
    });
    this.total_pagar = this.subtotal;
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
        this._clienteService.obtener_carrito_cliente(this.idcliente,this.token).subscribe(
          response=>{
            this.carrito_arr = response.data;
            this.calcular_carrito();
          }
        )
        console.log(response);
        
      }
    );
  }
}
