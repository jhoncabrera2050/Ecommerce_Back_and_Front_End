import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service'
declare var iziToast:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {
  public cliente : any ={
    genero:''
  }; 

  constructor(
    private _clienteService:ClienteService,
    private _router:Router
  ){

  }

  registro(registroForm : NgForm){
    if(registroForm.valid){
      console.log(this.cliente)
      this._clienteService.registro_cliente(this.cliente).subscribe(
        response=>{
          console.log(response);
          iziToast.show({
            title :'SUCCESS',
            titleColor : '#1DC74C',
            color : '#FFF',
            class : 'text-success',
            position : 'topRight',
            message:'Se registro correctamente el usuario'
          });
          this.cliente = {
            genero:'',
            nombres:'',
            apellidos:'',
            f_nacimiento:'',
            telefono:'',
            dni:'',
            email:''
          }
          this._router.navigate(['login'])
        },error=>{
          console.log(error);
        }
      )
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
