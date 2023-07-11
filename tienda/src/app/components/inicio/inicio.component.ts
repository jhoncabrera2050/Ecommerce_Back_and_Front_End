import { Component, OnInit } from '@angular/core';
import {GuestService} from 'src/app/services/guest.service'
import {global} from 'src/app/services/global';
import { ClienteService } from 'src/app/services/cliente.service';
declare var tns:any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public descuento_activo : any = undefined;
  public url:any;
  public new_productos : Array<any> = [];
  public mas_vendidos : Array<any> = [];
  public categorias : Array<any> = [];
  constructor(
    private _guestService:GuestService,
    private _clienteService: ClienteService,
  ) { 
    this.url = global.url;
    this._clienteService.obtener_config_publico().subscribe(
      response=>{
        
        response.data.categorias.forEach((element: { titulo: string; }) => {
          if(element.titulo == 'Bebidas'){
            this.categorias.push({
              titulo:element.titulo,
              portada: 'assets/img/ecommerce/home/categories/04.jpg'
            });
          }else if(element.titulo == 'Entradas'){
            this.categorias.push({
              titulo:element.titulo,
              portada: 'assets/img/ecommerce/home/categories/05.jpg'
            });
          }else if(element.titulo == 'jhon'){
            this.categorias.push({
              titulo:element.titulo,
              portada: 'assets/img/ecommerce/home/categories/07.jpg'
            });
          }
        });

        console.log(this.categorias);
        
 
      }
    )
  }

  ngOnInit(): void {
    this._guestService.obtener_descuento_activo().subscribe(
      response=>{
        this.descuento_activo = response.data[0];
        console.log(this.descuento_activo);
      }
    )
    this._guestService.listar_productos_nuevos_publico().subscribe(
      response=>{
        this.new_productos = response.data;
      }
    )

    this._guestService.listar_productos_masvendidos_publico().subscribe(
      response=>{
        this.mas_vendidos = response.data;
      }
    )
    setTimeout(()=>{
      tns({
        container: '.cs-carousel-inner',
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        mode: 'gallery',
        navContainer: '#pager',
        responsive: {
          0: { controls: false },
          991: { controls: true }
        }
      });

      tns({
        container: '.cs-carousel-inner-two',
        controls: false,
        responsive: {
          0: {
            gutter: 20
          },
          400: {
            items: 2,
            gutter: 20
          },
          520: {
            gutter: 30
          },
          768: {
            items: 3,
            gutter: 30
          }
        }
        
      });

      tns({
        container: '.cs-carousel-inner-three',
        controls: false,
        mouseDrag: !0,
        responsive: {
          0: {
            items: 1,
            gutter: 20
          },
          420: {
            items: 2,
            gutter: 20
          },
          600: {
            items: 3,
            gutter: 20
          },
          700: {
            items: 3,
            gutter: 30
          },
          900: {
            items: 4,
            gutter: 30
          },
          1200: {
            items: 5,
            gutter: 30
          },
          1400: {
            items: 6,
            gutter: 30
          }
        }
        
        
      });

      tns({
        container: '.cs-carousel-inner-four',
        nav: false,
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        controlsContainer:'#custom-controls-trending',
        responsive: {
          0: {
            items: 1,
            gutter: 20
          },
          480: {
            items: 2,
            gutter: 24
          },
          700: {
            items: 3,
            gutter: 24
          },
          1100: {
            items: 4,
            gutter: 30
          }
        }
        
      });

      tns({
        container: '.cs-carousel-inner-five',
        controls: false,
        gutter: 30,
        responsive: {
          0: { items: 1 },
          380: { items: 2 },
          550: { items: 3 },
          750: { items: 4 },
          1000: { items: 5 },
          1250: { items: 6 }
        }
        
      });

      tns({
        container: '.cs-carousel-inner-six',
        controls: false,
        gutter: 15,
        responsive: {
          0: { items: 2 },
          500: { items: 3 },
          1200: { items: 3 }
        }
        
      });

    },500);
  }
}
