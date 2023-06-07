import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { global } from 'src/app/service/global';
import { ProductoService } from 'src/app/service/producto.service';
declare var iziToast:any;
declare var $:any;
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-galeria-producto',
  templateUrl: './galeria-producto.component.html',
  styleUrls: ['./galeria-producto.component.css']
})
export class GaleriaProductoComponent implements OnInit {

  public producto : any = {};
  public id:any;
  public token:any;

  public file : any = undefined;
  public load_btn = false;
  public load_btn_eliminar = false;
  public url:any;

  constructor(
    private _route: ActivatedRoute,
    private _productoService : ProductoService
  ) {
    this.token = localStorage.getItem('token');
    this.url = global.url;
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];

        this.init_data();
      
      }
    );
   }

   init_data(){
    this._productoService.obtener_producto_admin(this.id,this.token).subscribe({
      next: response=>{
        if(response.data == undefined){
          this.producto = undefined;
        }else{
          this.producto = response.data;
               
        }
        console.log(this.producto);
        
        
      },
      error: error=>{
        console.log(error);
        
      }
    });
   }

  ngOnInit(): void {
  }

  fileChangeEvent(event:any):void{
    var file:any;
    if(event.target.files && event.target.files[0]){
      file=<File>event.target.files[0];
      
      
    }else{
      iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          class: 'text-danger',
          position: 'topRight',
          message: 'No hay una imagen'
      });
      
    }

    if(file.size<= 4000000){
      //sdsd
      if(file.type == 'image/png' || file.type =='image/webp' || file.type =='image/jpg' || file.type =='image/gif' || file.type =='image/jpeg'){
        
        this.file = file;

      }else{
        iziToast.show({
            title: 'ERROR',
            titleColor: '#fc0303',
            class: 'text-danger',
            position: 'topRight',
            message: 'El archivo debe ser una imagen'
        });
        $('input-img').val('');  
        this.file = undefined;  
      }

    }else{
      iziToast.show({
          title: 'ERROR',
          titleColor: '#fc0303',
          class: 'text-danger',
          position: 'topRight',
          message: 'la imagen no puede superar los 4MB'
      }); 
      $('input-img').val('');
      this.file = undefined;
    }
    console.log(this.file);
    
  }

  subir_imagen(){
    if(this.file != undefined){
      let data = {
        imagen: this.file,
        _id: uuidv4()
      }
      console.log(data);
      this._productoService.agregar_imagen_galeria_admin(this.id,data,this.token).subscribe({
        next: response=>{
          this.init_data();
          $('input-img').val(''); 
          
        }
      });
    }else{
      iziToast.show({
          title: 'ERROR',
          titleColor: '#fc0303',
          class: 'text-danger',
          position: 'topRight',
          message: 'Debe seleccionar una imagen para subir'
      }); 
    }
  }


}