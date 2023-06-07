import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { ClienteService } from 'src/app/service/cliente.service';
declare var iziToast:any;
@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent {
  public cliente:any = {}
  public id:any;
  public token:any;
  constructor(private _route : ActivatedRoute,
    private _clienteService : ClienteService,
    private _adminService : AdminService,
    private _router : Router
    ){
    this.token = this._adminService.getToken();
  }
  ngOnInit(): void{
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this._clienteService.obtener_cliente_admin(this.id,this.token).subscribe(
          response=>{
            console.log(response);
            if(response.data == undefined){
              this.cliente = undefined;
            }else{
              this.cliente = response.data;
            }
          },
          error=>{

          }
        )
      }
    )
  }
actualizar(updateForm: NgForm){
    if(updateForm.valid){
      this._clienteService.actualizar_cliente_admin(this.id,this.cliente,this.token).subscribe(
        response=>{
            iziToast.show({
              title :'SUCCESS',
              titleColor : '#1DC74C',
              color : '#FFF',
              class : 'text-success',
              position : 'topRight',
              message:'Se actualizo correctamente el cliente'
            });
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
