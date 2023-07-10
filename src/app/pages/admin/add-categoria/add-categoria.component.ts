import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css'],
})
export class AddCategoriaComponent {
  categoria: any = {
    titulo: '',
    descripcion: '',
  };

  constructor(
    private categoriaService: CategoriaService,
    private snackBar: MatSnackBar,
    private router : Router
  ) {}

  formSubmit() {
    if (this.categoria.titulo.trim() === '' || this.categoria.titulo === null) {
      this.snackBar.open('El titulo es requerido', '', {
        duration: 3000,
      });
      return;
    }
    this.categoriaService.guardarCategoria(this.categoria).subscribe({
      next : data => {
        this.categoria.titulo = '';
        this.categoria.descripcion = '';
        Swal.fire('Categoria agregada','La categoria ha sido agregada con exito','success')
        this.router.navigate(['/admin/categorias'])
      },
      error : error => Swal.fire('Error!!','Error al guardar la categoria','error')
    })
  }
}
