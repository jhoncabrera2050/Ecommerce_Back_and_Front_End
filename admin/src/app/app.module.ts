import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }  from '@angular/forms';
import { HttpClient,HttpClientModule }  from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { InicioComponent } from './components/inicio/inicio.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { IndexClienteComponent } from './components/clientes/index-cliente/index-cliente.component';
import { CreateClienteComponent } from './components/clientes/create-cliente/create-cliente.component';
import { EditClienteComponent } from './components/clientes/edit-cliente/edit-cliente.component';
import { CreateProductoComponent } from './components/productos/create-producto/create-producto.component';
import { NgxTinymceModule } from 'ngx-tinymce';
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { GaleriaProductoComponent } from './components/productos/galeria-producto/galeria-producto.component';
import { UpdateProductoComponent } from './components/productos/update-producto/update-producto.component';
import { ConfigComponent } from './components/config/config.component';
import { CreateDescuentoComponent } from './components/descuento/create-descuento/create-descuento.component';
import { EditDescuentoComponent } from './components/descuento/edit-descuento/edit-descuento.component';
import { IndexDescuentoComponent } from './components/descuento/index-descuento/index-descuento.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SidebarComponent,
    LoginComponent,
    IndexClienteComponent,
    CreateClienteComponent,
    EditClienteComponent,
    CreateProductoComponent,
    IndexProductoComponent,
    GaleriaProductoComponent,
    UpdateProductoComponent,
    ConfigComponent,
    CreateDescuentoComponent,
    EditDescuentoComponent,
    IndexDescuentoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    NgxTinymceModule.forRoot({
      baseURL : '../../../assets/tinymce/'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
