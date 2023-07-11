import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GuestService } from 'src/app/services/guest.service';
declare var iziToast:any;
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit{
  public contacto:any={};
  public load_btn = false;
  constructor(
    private _guestService:GuestService
  ){}
  ngOnInit(): void {
    
  }
  registro(registroForm:NgForm){
    if(registroForm.valid){
      this.load_btn = true;
      this._guestService.enviar_mensaje_contacto(this.contacto).subscribe(
        response=>{
          console.log(response);
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Se envio correctamente el mensaje'
        });
        this.contacto = {};
        this.load_btn = false;
        }
      );
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
