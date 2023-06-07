import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { global } from 'src/app/services/global';
declare var noUiSlider:any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {

  public config_global : any = {};
  public filter_categoria = '';
  public productos : Array<any> = [];
  public filter_producto = '';
  public load_data = true;
  public url:any;
  public carrito_data : any = {
    variedad: '',
    cantidad: 1
  };
  constructor(
    private _clienteService:ClienteService,
    private _route: ActivatedRoute,
  ) {
    this.url = global.url;
    this._clienteService.listar_productos_publico(this._clienteService).subscribe(
      response=>{
        this.productos = response.data;
        this.load_data = false;
      },
      error=>{
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
    // Obtener el token aquí y asignarlo a this.token
    
    // Llamar al método listar_producto_publico con filtro y token
  }
}
