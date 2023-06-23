import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { DescuentoService } from 'src/app/service/descuento.service';
import {global} from 'src/app/service/global';
declare var iziToast:any;
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-edit-descuento',
  templateUrl: './edit-descuento.component.html',
  styleUrls: ['./edit-descuento.component.css']
})
export class EditDescuentoComponent implements OnInit {
  public descuento : any =  {};
  public file : any = undefined;
  public imgSelect : any | ArrayBuffer = 'assets/img/01.jpg';
  public token: any;
  public load_btn = false;
  public id:any;
  public url:any;
  constructor(
    private _adminService :AdminService,
    private _descuentoService :DescuentoService,
    private _router:Router,
    private _route:ActivatedRoute
  ){
    this.token = this._adminService.getToken();
    this.url = global.url;
  }
  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        console.log(this.id);
        this._descuentoService.obtener_descuento_admin(this.id,this.token).subscribe(
          response=>{
            if(response.data == undefined){
              this.descuento = undefined;
            }else{ 
              this.descuento = response.data;
              this.imgSelect = this.url + 'obtener_banner_descuento/'+this.descuento.banner;
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
      console.log(this.descuento);
      console.log(this.file);
      if(this.descuento.descuento >= 1 && this.descuento.descuento <=100){
        var data : any={};

        if(this.file != undefined){
          data.banner = this.file;
        }
  
        data.titulo = this.descuento.titulo;
        data.fecha_inicio = this.descuento.fecha_inicio;
        data.fecha_fin = this.descuento.fecha_fin;
        data.descuento = this.descuento.descuento;
  
        this.load_btn = true;
        this._descuentoService.actualizar_descuento_admin(data,this.id,this.token).subscribe(
          response=>{
            console.log(response);
            iziToast.show({
              title: 'CORRECTO',
              titleColor: '#1DC740',
              class: 'text-success',
              position: 'topRight',
              message: 'Se actualizo correctamente el nuevo descuento'
            });
            this.load_btn = false;
            this._router.navigate(['/panel/descuentos']);
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
          message: 'El descuento debe ser entre 0% a 100%'
        });
      }
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
