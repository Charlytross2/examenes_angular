import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    @Inject(DOCUMENT) document: any,
    public loginService: LoginService
  ) {}

  public cerrarSesion() {
    this.loginService.logout();
    window.location.reload();
  }

  public verificarPagina(pag : string) {
    return !document.location.href.includes(pag);
  }
}
