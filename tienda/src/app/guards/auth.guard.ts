import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private clienteService: ClienteService, private router: Router) { }

  canActivate(): boolean {
    if (this.clienteService.isAuthenticated()) {
      return true; // El usuario está autenticado, permite la navegación
    } else {
      this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
      return false; // Bloquea la navegación
    }
  }
}
