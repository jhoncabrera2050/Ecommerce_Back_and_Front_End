// import { Component } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { AdminService } from 'src/app/service/admin.service';
// import { ProductoService } from 'src/app/service/producto.service';

// declare var iziToast:any;
// declare var jQuery:any;
// declare var $:any;
// @Component({
//   selector: 'app-create-producto',
//   templateUrl: './create-producto.component.html',
//   styleUrls: ['./create-producto.component.css']
// })

// export class CreateProductoComponent {
//   public producto:any = {};

//   public imgSelect : any | ArrayBuffer= 'assets/img/01.jpg';
//   public config : any = {};
//   public token: any;
//   public file: File | null = null;
//   // public file: File;
//   constructor(
//     private _productoService : ProductoService,
//     private _adminService : AdminService,

//   ){
//     this.config = {
//       height:500
//     }
//     this.token = this._adminService.getToken() ?? '';
//   }
//   registro(registroForm:NgForm){
//     if(registroForm.valid){
//       console.log(this.producto);
//       console.log(this.file);
//       //inyectamos primero nuestro servicio
//       if (this.file) {
//         this._productoService.registro_producto_admin(this.producto, this.file, this.token).subscribe(
//           response => {
//             console.log(response);
//           },
//           error => {
//             console.log(error);
//           }
//         );
//       } else {
//         // Manejar el caso en el que `this.file` sea `null`
//       }
//     }else{
//       iziToast.show({
//         title :'ERROR',
//         titleColor : '#FF0000',
//         class : 'text-danger',
//         position : 'topRight',
//         message:'los datos del formulario no son validos'
//       });
//       this.imgSelect = 'assets/img/01.jpg';
//       this.file = null;
//     }
//   }

  
//   fileChangeEvent(event:any):void{
//     const files: FileList = event.target.files;
//       if(files && files.length > 0){
//           const file: File = files[0];
//           if(file.size <= 4000000){
//             if(file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg' ){
//               const reader = new FileReader();
//               reader.onload = e => this.imgSelect = reader.result;
//               console.log(this.imgSelect);
//               reader.readAsDataURL(file);
//               $('input-portada').text(file.name);
//               this.file = file;
//             }else{
//               iziToast.show({
//                 title :'ERROR',
//                 titleColor : '#FF0000',
//                 class : 'text-danger',
//                 position : 'topRight',
//                 message:'la imagen no puede superar los 4MB'
//               });
//               this.imgSelect = 'assets/img/01.jpg';
//               this.file = null;
//             }
//           }else{
//           iziToast.show({
//             title :'ERROR',
//             titleColor : '#FF0000',
//             class : 'text-danger',
//             position : 'topRight',
//             message:'no hay una imagen de envio'
//           });
//       }
//     }else{
//       iziToast.show({
//         title :'ERROR',
//         titleColor : '#FF0000',
//         class : 'text-danger',
//         position : 'topRight',
//         message:'no hay una imagen de envio'
//       });
//     }
//     console.log(this.file);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { ProductoService } from 'src/app/service/producto.service';
import { Router } from '@angular/router';
declare var iziToast:any;
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {

  public producto : any =  {
    categoria: ''
  };
  public file : any = undefined;
  public imgSelect : any | ArrayBuffer = 'assets/img/01.jpg';
  public config : any = {};
  public token;
  public load_btn = false;
  public config_global : any = {};

  constructor(
    private _productoService : ProductoService,
    private _adminService : AdminService,
    private _router:Router
  ) { 
    this.config = {
      height: 500
    }
    this.token = this._adminService.getToken();
    this._adminService.obtener_config_publico().subscribe(
      response=>{
        this.config_global = response.data;
        console.log(this.config_global);
        
      }
    )
  }

  ngOnInit(): void {
  }

  registro(registroForm:NgForm){
    if(registroForm.valid){
      
      if(this.file == undefined){
        iziToast.show({
          title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'Debe subir una portada para registrar'
        });
      }else{
        console.log(this.producto);
        console.log(this.file);
        this.load_btn = true;
        this._productoService.registro_producto_admin(this.producto,this.file,this.token).subscribe(
          response=>{
            iziToast.show({
                title: 'SUCCESS',
                titleColor: '#1DC74C',
                color: '#FFF',
                class: 'text-success',
                position: 'topRight',
                message: 'Se registro correctamente el nuevo producto.'
            });
            this.load_btn = false;

            this._router.navigate(['/panel/productos']);
          },
          error=>{
            console.log(error);
            this.load_btn = false;
          }
        );
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
