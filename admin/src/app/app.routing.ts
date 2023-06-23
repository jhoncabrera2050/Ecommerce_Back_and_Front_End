import { Routes, RouterModule } from "@angular/router";

import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";
import { AdminGuard } from "./guards/admin.guard";
import { IndexClienteComponent } from "./components/clientes/index-cliente/index-cliente.component";
import { CreateClienteComponent } from "./components/clientes/create-cliente/create-cliente.component";
import { EditClienteComponent } from "./components/clientes/edit-cliente/edit-cliente.component";
import { CreateProductoComponent } from "./components/productos/create-producto/create-producto.component";
import { IndexProductoComponent } from "./components/productos/index-producto/index-producto.component";
import { GaleriaProductoComponent } from "./components/productos/galeria-producto/galeria-producto.component";
import { UpdateProductoComponent } from "./components/productos/update-producto/update-producto.component";
import { ConfigComponent } from "./components/config/config.component";
import { IndexDescuentoComponent } from "./components/descuento/index-descuento/index-descuento.component";
import { CreateDescuentoComponent } from "./components/descuento/create-descuento/create-descuento.component";
import { EditDescuentoComponent } from "./components/descuento/edit-descuento/edit-descuento.component";

const appRoutes: Routes = [
    {path : '', redirectTo:'inicio', pathMatch : 'full'},
    {path:'',component:InicioComponent, canActivate: [AdminGuard]},
    {path: 'panel', children:[
        {path:'clientes',component:IndexClienteComponent,canActivate:[AdminGuard]},
        {path:'clientes/registro',component:CreateClienteComponent,canActivate:[AdminGuard]},
        {path: 'clientes/:id', component: EditClienteComponent, canActivate:[AdminGuard]},
        {path:'producto/registro', component:CreateProductoComponent,canActivate:[AdminGuard]},
        { path: 'productos', component:IndexProductoComponent,canActivate:[AdminGuard] },
        { path: 'productos/:id', component:UpdateProductoComponent,canActivate:[AdminGuard] },
        {path:'productos/galeria/:id', component:GaleriaProductoComponent, canActivate:[AdminGuard]},
        {path:'descuentos', component: IndexDescuentoComponent, canActivate:[AdminGuard]},
        {path:'descuentos/registro', component: CreateDescuentoComponent, canActivate:[AdminGuard]},
        {path:'descuentos/:id', component: EditDescuentoComponent, canActivate:[AdminGuard]},
        {path:'configuraciones', component:ConfigComponent, canActivate:[AdminGuard]},
    ]},
    {path: 'login', component:LoginComponent}
    
];

export const AppRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
