import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { DescuentoService } from 'src/app/service/descuento.service';
declare var iziToast:any;
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-create-descuento',
  templateUrl: './create-descuento.component.html',
  styleUrls: ['./create-descuento.component.css']
})
export class CreateDescuentoComponent implements OnInit{
  public descuento : any =  {};
  public file : any = undefined;
  public imgSelect : any | ArrayBuffer = 'assets/img/01.jpg';
  public token: any;
  public load_btn = false;
  constructor(
    private _adminService :AdminService,
    private _descuentoService :DescuentoService,
    private _router:Router
  ){
    this.token = this._adminService.getToken();
  }
  ngOnInit(): void {
    
  }
  registro(registroForm:any){
    if(registroForm.valid){
      
      if(this.file == undefined){
        iziToast.show({
          title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'Debe subir un banner para registrar'
        });
      }else{
        if(this.descuento.descuento >= 1 && this.descuento.descuento <=100){
          this.load_btn = true;
          this._descuentoService.registro_descuento_admin(this.descuento,this.file,this.token).subscribe(
            response=>{
              iziToast.show({
                  title: 'SUCCESS',
                  titleColor: '#1DC74C',
                  color: '#FFF',
                  class: 'text-success',
                  position: 'topRight',
                  message: 'Se registro correctamente el nuevo descuento.'
              });
              this.load_btn = false;
  
              this._router.navigate(['/panel/descuentos']);
            },
            error=>{
              this.load_btn = false;
            }
          );
        }else{
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'El descuento debe ser entre 0% a 100%'
        });
        }
      }
      
    }else{
      iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'Los datos del formulario no son validos'
      });
      this.load_btn = false;

      $('#input-portada').text('Seleccionar imagen');
        this.imgSelect = 'assets/img/01.jpg';
        this.file = undefined;
    }
  }
  fileChangeEvent(event:any){
    var file:any;
    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0];
      
      
    }else{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
      iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'No hay un imagen de envio'
      });
    }

    if(file.size <= 4000000){

      if(file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg'){
    
        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        console.log(this.imgSelect);
        
        reader.readAsDataURL(file);

        $('#input-portada').text(file.name);
        this.file = file; 

      }else{
        iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'El archivo debe ser una imagen'
        });
        $('#input-portada').text('Seleccionar imagen');
        this.imgSelect = 'assets/img/01.jpg';
        this.file = undefined;
      }
    }else{
      iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'La imagen no puede superar los 4MB'
      });
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
    }
    
    console.log(this.file);
    
  }
}
