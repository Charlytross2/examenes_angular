import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private loginService : LoginService){}

  public cerrarSesion() {
    this.loginService.logout();
    window.location.reload();
  }

}
