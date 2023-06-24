import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.css']
})
export class SiderbarComponent {
  public user_lc: any = {};
  public token;
  public id;
  public user: any = undefined;
  constructor(
    private _clienteService: ClienteService,
    private _router:Router
  ) {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');
    console.log(this.user_lc);
    if (localStorage.getItem('user_data')) {
      const userData = localStorage.getItem('user_data');
      if (userData !== null) {
        this.user_lc = JSON.parse(userData);
      } else {
        this.user_lc = undefined;
      }
    } else {
      this.user_lc = undefined;
    }
    
    if(this.token){
      this._clienteService.obtener_cliente_guest(this.id, this.token).subscribe(
        response => {
          console.log(response);
          this.user = response.data;
          localStorage.setItem('user_data', JSON.stringify(this.user));
          if (localStorage.getItem('user_data')) {
            const userData = localStorage.getItem('user_data');
            if (userData !== null) {
              this.user_lc = JSON.parse(userData);
            } else {
              this.user_lc = undefined;
            }
          } else {
            this.user_lc = undefined;
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  logout(){
    window.location.reload();
    localStorage.clear();
    this._router.navigate(['/']);
  }
}
