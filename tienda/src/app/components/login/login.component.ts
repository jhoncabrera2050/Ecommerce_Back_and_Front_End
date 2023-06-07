import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
declare var jQuery:any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public user:any ={};
  public usuario : any = {};
  public token : any ='';
  constructor(
    private _clienteService:ClienteService,
    private _router : Router,
  ) {
    this.token = localStorage.getItem('token');
    if(this.token){
      this._router.navigate(['/'])
    }
  }

  ngOnInit(): void{
  }

login(loginForm: NgForm){
    if(loginForm.valid){
      let data = {
        email: this.user.email,
        password : this.user.password
      }
      this._clienteService.login_cliente(data).subscribe(
        response=>{
          if(response.data == undefined){
            iziToast.show({ 
              title :'ERROR',
              titleColor : '#FF0000',
              class : 'text-danger',
              position : 'topRight',
              message : response.message
            });
          }else{
            this.usuario = response.data;
            localStorage.setItem('token', response.token);
            localStorage.setItem('_id',response.data._id);
            console.log(this.usuario)
            this._clienteService.obtener_cliente_guest(response.data._id, response.token).subscribe(
              response => {
                console.log(response);
              },
              error => {
                console.log('Error al obtener cliente:', error);
              }
            );
            
            this._router.navigate(['/']);
          }
        },
        error=>{
          console.log(error);
        }
      );
    }else{
      iziToast.show({
        title :'ERROR',
        titleColor : '#FF0000',
        class : 'text-danger',
        position : 'topRight',
        message:'los datos del formulario no son validos'
      });
    }
}
}
