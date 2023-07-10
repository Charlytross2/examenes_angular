import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-perfil',
  templateUrl: './actualizar-perfil.component.html',
  styleUrls: ['./actualizar-perfil.component.css'],
})
export class ActualizarPerfilComponent implements OnInit {
  user: any = new Object();
  username: string = '';
  passwordBool: boolean = true;
  display!: FormControl;
  file_store!: FileList;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.username = this.router.snapshot.params['username'];
    this.display = new FormControl('', Validators.required);
    this.userService.getUsuario(this.username).subscribe({
      next: (data) => {
        this.user = data;
        this.display.setValue(this.user.perfil);
      },
      error: (error) =>
        this.snackBar.open('Error al cargar el usuario', 'Error', {
          duration: 3000,
        }),
    });
  }

  public manejarInputFile(l: FileList): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : '';
      this.display.patchValue(`${f.name}${count}`);
    } else {
      this.display.patchValue('');
    }
  }

  public onSubmit() {
    if (this.file_store != undefined) {
      const uploadImageData = new FormData();
      uploadImageData.append(
        'imageFile',
        this.file_store.item(0)!,
        this.file_store.item(0)!.name
      );

      this.userService.subirFoto(uploadImageData).subscribe({
        next: () =>
          this.snackBar.open('Foto cargada', 'Success', { duration: 3000 }),
        error: console.log,
      });
    }

    this.userService.actualizarUsuario(this.user).subscribe({
      next: () => {
        Swal.fire('Actualizado', 'Usuario actualizado con exito', 'success');
        this.route.navigate(['/admin/profile']);
      },
      error: (error) =>
        this.snackBar.open('Error al actualizar', 'Error', {
          duration: 3000,
        }),
    });
  }
}
