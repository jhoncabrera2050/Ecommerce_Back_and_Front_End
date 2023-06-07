import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
declare var  iziToast:any;
declare var $:any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  public cliente : any = {};
  public id:any;
  public token:any;

  constructor(
    private _clienteService:ClienteService
  ){
    this.id = localStorage.getItem('_id');
    this.token = localStorage.getItem('token');
    if(this.id){
      this._clienteService.obtener_cliente_guest(this.id,this.token).subscribe(
        response=>{
          console.log(response);
          this.cliente = response.data;
        },
        error=>{
          console.log(error);
        }
      )
    }
  }
  //actualizar la data de un usuario
  actualizar(actualizarForm:NgForm){
    if(actualizarForm.valid){
      this.cliente.password = $('#input_password').val();
      console.log(this.cliente)
      this._clienteService.actualizar_perfil_cliente_guest(this.id,this.cliente,this.token).subscribe(
        response=>{
          iziToast.show({
            title :'SUCCESS',
            titleColor : '#1DC74C',
            color : '#FFF',
            class : 'text-success',
            position : 'topRight',
            message:'Se actualizo su perfil correctamente'
          });
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
