import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = {
    username: '',
    password: '',
  };

  constructor(
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) {}

  formSubmit() {
    if (
      this.loginData.username.trim() === '' ||
      this.loginData.username.trim() === null
    ) {
      this.snackBar.open('El nombre de usuario es requerido!', 'Aceptar', {
        duration: 3000,
      });
      return;
    }
    if (
      this.loginData.password.trim() === '' ||
      this.loginData.password.trim() === null
    ) {
      this.snackBar.open('La contraseña es requerida!', 'Aceptar', {
        duration: 3000,
      });
      return;
    }

    this.loginService.generarToken(this.loginData).subscribe({
      next: (data: any) => {
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe({
          next: (user) => {
            this.loginService.setUser(user);

            if (this.loginService.getUserRole() === 'Admin') {
              // mostramos el dashboard admin
              this.router.navigate(['admin']);
              this.loginService.loginStatusSubject.next(true);
            } else if (this.loginService.getUserRole() === 'Normal') {
              this.router.navigate(['user-dashboard/0']);
              this.loginService.loginStatusSubject.next(true);
            } else this.loginService.logout();
          },
        });
      },
      error: (error: string) =>
        this.snackBar.open(
          'Detalles invalidos, vuelva a intentarlo',
          'Aceptar',
          { duration: 3000 }
        ),
    });
  }
}
