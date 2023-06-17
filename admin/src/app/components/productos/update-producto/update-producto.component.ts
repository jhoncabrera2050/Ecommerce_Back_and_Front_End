import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/service/producto.service';
import { global } from 'src/app/service/global';
import { AdminService } from 'src/app/service/admin.service';
declare var iziToast:any;
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.component.html',
  styleUrls: ['./update-producto.component.css']
})
export class UpdateProductoComponent implements OnInit {


  public producto : any = {};
  public config : any = {};
  public imgSelect : String | ArrayBuffer | any;
  public load_btn = false;
  public id : any;
  public file : any = undefined;
  public token;
  public url;
  public config_global : any = {}

  constructor(
  private _router : Router,
  private _route : ActivatedRoute,
  private _productoService:ProductoService,
  private _adminService : AdminService
  ){
    this.config = {
      height: 500
    }
    this.token = localStorage.getItem('token');
    this.url = global.url;
    this._adminService.obtener_config_publico().subscribe(
      response=>{
        this.config_global = response.data;
        console.log(this.config_global);
    
        
      }
    )
  }
  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        console.log(this.id);
        this._productoService.obtener_producto_admin(this.id,this.token).subscribe(
          response=>{
            if(response.data == undefined){
              this.producto = undefined;
            }else{ 
              this.producto = response.data;
              this.imgSelect = this.url + 'obtener_portada/'+this.producto.portada;
            }
          },
          error=>{
            console.log(error);
          }
        )
      }
    )
  }

  actualizar(actualizarForm:NgForm){
    if(actualizarForm.valid){
      console.log(this.producto);
      console.log(this.file);

      var data : any={};

      if(this.file != undefined){
        data.portada = this.file;
      }

      data.titulo = this.producto.titulo;
      data.stock = this.producto.stock;
      data.precio = this.producto.precio;
      data.categoria = this.producto.categoria;
      data.descripcion = this.producto.descripcion;
      data.contenido = this.producto.contenido;

      this.load_btn = true;
      this._productoService.actualizar_producto_admin(data,this.id,this.token).subscribe(
        response=>{
          console.log(response);
          iziToast.show({
            title: 'CORRECTO',
            titleColor: '#1DC740',
            class: 'text-success',
            position: 'topRight',
            message: 'Se actualizo correctamente el nuevo producto'
          });
          this.load_btn = false;
          this._router.navigate(['/panel/productos']);
        },
        error=>{
          console.log(error);
          this.load_btn = false;
        }
        
      )
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FC2E2E',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos o estan incompletos!!!'
      });
      this.load_btn = false;
    }
  }

  fileChangeEvent(event:any):void{
    let file: any;

    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0];
      console.log(file);
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FC2E2E',
        class: 'text-danger',
        position: 'topRight',
        message: 'No hay una imagen de envio'
    });
   }

   if(file.size <= 8000000){

    if(file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg'){

      const reader  = new FileReader();
      reader.onload = e => this.imgSelect = reader.result;
      console.log(this.imgSelect);

      reader.readAsDataURL(file);

      $('#input-portada').text(file.name);
      this.file = file;

    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FC2E2E',
        class: 'text-danger',
        position: 'topRight',
        message: 'El archivo debe ser de formato (.PNG; .WEBP; .JPG; .GIF; .JPEG)',
    });
    this.load_btn = false;
    $('#input-portada').text('Seleccionar imagen');
    this.imgSelect = 'assets/img/01.jpg';
    this.file = undefined;
    }   

   }else{
    iziToast.show({
      title: 'ERROR',
      titleColor: '#FC2E2E',
      class: 'text-danger',
      position: 'topRight',
      message: 'La imagen no puede suparar los 8MB'
  });
  this.load_btn = true;
  $('#input-portada').text('Seleccionar imagen');
  this.imgSelect = 'assets/img/01.jpg';
  this.file = undefined;

  }

  console.log(this.file);

  }
}
