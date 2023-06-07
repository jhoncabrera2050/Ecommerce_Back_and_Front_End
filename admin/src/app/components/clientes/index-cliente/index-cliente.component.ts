import { Component } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { ClienteService } from 'src/app/service/cliente.service';
declare var iziToast:any;
declare var jQuery:any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent {
  public clientes : Array<any>=[];
  public user:any ={};
  public usuario : any = {};
  public token : any ='';
  public filtro_apellidos = '';
  public filtro_correo = '';
  public load_data = true;
  constructor(
    private _clienteService:ClienteService,
    private _adminService : AdminService
  ) {
    this.token = this._adminService.getToken();
    console.log(this.token);
  }

  ngOnInit(): void{
    this.init_Data();
  }
  init_Data(){
    this._clienteService.listar_clientes_filtro_admin(null,null,this.token).subscribe(
      response=>{
        this.clientes = response.data;
        setTimeout(()=>{
          this.load_data = false
        },500)
      },
      error=>{
        console.log(error);
      }
    )
  }


filtro(tipo:any){
    if(tipo == 'apellidos'){
      this._clienteService.listar_clientes_filtro_admin(tipo,this.filtro_apellidos,this.token).subscribe(
        response=>{
          this.clientes = response.data;
          console.log(this.clientes)
        },
        error=>{
          console.log(error);
        }
      )
    }else if(tipo == 'correo'){
      this._clienteService.listar_clientes_filtro_admin(tipo,this.filtro_correo,this.token).subscribe(
        response=>{
          this.clientes = response.data;
          console.log(this.clientes)
        },
        error=>{
          console.log(error);
        }
      )
    }
}

eliminar(id:any){
  this._clienteService.eliminar_cliente_admin(id,this.token).subscribe(
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
      this.init_Data();
     },
     error=>{
      console.log(error);
     }
  )
}
  
}




