import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-examen',
  templateUrl: './add-examen.component.html',
  styleUrls: ['./add-examen.component.css'],
})
export class AddExamenComponent implements OnInit {
  categorias: any = [];

  examenData = {
    titulo: '',
    descripcion: '',
    puntosMaximos: '',
    numeroPreguntas: '',
    activo: true,
    categoria: {
      id: '',
    },
  };

  constructor(
    private categoriaService: CategoriaService,
    private snackBar: MatSnackBar,
    private examenService: ExamenService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe({
      next: (data) => (this.categorias = data),
      error: (error) =>
        Swal.fire('Error!!', 'Error al cargar las categorias', 'error'),
    });
  }

  formSubmit() {
    if (
      this.examenData.titulo.trim() === '' ||
      this.examenData.titulo === null
    ) {
      this.snackBar.open('El titulo es requerido', '', {
        duration: 3000,
      });
      return;
    }

    this.examenService.agregarExamen(this.examenData).subscribe({
      next: (data) => {
        Swal.fire(
          'Examen guardado',
          'El examen ha sido guardado con exito',
          'success'
        );
        this.examenData = {
          titulo: '',
          descripcion: '',
          puntosMaximos: '',
          numeroPreguntas: '',
          activo: true,
          categoria: {
            id: '',
          },
        };
        this.router.navigate(['/admin/examenes'])
      },
      error: (error) =>
        Swal.fire('Error', 'Error al guardar el examen', 'error'),
    });
  }
}
