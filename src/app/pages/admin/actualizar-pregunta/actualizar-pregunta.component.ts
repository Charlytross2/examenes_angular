import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-pregunta',
  templateUrl: './actualizar-pregunta.component.html',
  styleUrls: ['./actualizar-pregunta.component.css'],
})
export class ActualizarPreguntaComponent implements OnInit {
  preguntaId: any;
  pregunta: any;
  examen: any;

  constructor(
    private route: ActivatedRoute,
    private preguntaService: PreguntaService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.preguntaId = this.route.snapshot.params['id'];
    this.preguntaService.obtenerPregunta(this.preguntaId).subscribe({
      next: (data) => {
        this.pregunta = data;
      },
      error: (error) =>
        Swal.fire('Error', 'Error al cargar la pregunta', 'error'),
    });
  }

  public actualizarDatos() {
    this.preguntaService.actualizarPregunta(this.pregunta).subscribe({
      next: (data) => {
        Swal.fire(
          'Pregunta actualizada',
          'La pregunta ha sido actualizada con exito',
          'success'
        ).then((e) =>
          this.router.navigate([
            '/admin/ver-preguntas/' +
              this.pregunta.examen.id +
              '/' +
              this.pregunta.examen.titulo,
          ])
        );
      },
      error: (error) =>
        this.snackBar.open('Error al actualizar la pregunta', '', {
          duration: 3000,
        }),
    });
  }
}
