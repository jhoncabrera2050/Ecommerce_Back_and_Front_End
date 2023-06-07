import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { ClienteService } from 'src/app/service/cliente.service';
declare var iziToast:any;
@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent {
  public cliente : any ={
    genero:''
  };
  public token: any; 

  constructor(
    private _clienteService:ClienteService,
    private _adminService:AdminService,
    private _router:Router
  ){
    this.token = this._adminService.getToken();
  }

registro(registroForm : NgForm){
    if(registroForm.valid){
      console.log(this.cliente)
      this._clienteService.registro_cliente_admin(this.cliente,this.token).subscribe(
        response=>{
          console.log(response);
          iziToast.show({
            title :'SUCCESS',
            titleColor : '#1DC74C',
            color : '#FFF',
            class : 'text-success',
            position : 'topRight',
            message:'Se registro correctamente el cliente'
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
          this._router.navigate(['panel/clientes'])
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
