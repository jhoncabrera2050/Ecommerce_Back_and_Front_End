import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";
import { PerfilComponent } from "./components/usuario/perfil/perfil.component";
import { AuthGuard } from "src/app/guards/auth.guard";
import { IndexProductoComponent } from "./components/productos/index-producto/index-producto.component";
import { ShowProductoComponent } from "./components/productos/show-producto/show-producto.component";
import { CarritoComponent } from "./components/carrito/carrito.component";

const appRoutes: Routes = [
    {path: '', component:InicioComponent},
    {path: 'login', component:LoginComponent},
    {path: 'cuenta/perfil', component:PerfilComponent,canActivate: [AuthGuard]},
    {path: 'carrito', component: CarritoComponent, canActivate:[AuthGuard] },
    {path: 'productos', component:IndexProductoComponent},
    {path:'productos/:slug', component:ShowProductoComponent},
    
];

export const AppRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
