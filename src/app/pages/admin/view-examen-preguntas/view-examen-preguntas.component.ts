import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-examen-preguntas',
  templateUrl: './view-examen-preguntas.component.html',
  styleUrls: ['./view-examen-preguntas.component.css'],
})
export class ViewExamenPreguntasComponent implements OnInit {
  preguntas: any = [];
  examenId: any;
  titulo: any;

  constructor(
    private route: ActivatedRoute,
    private preguntasService: PreguntaService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.examenId = this.route.snapshot.params['id'];
    this.titulo = this.route.snapshot.params['titulo'];
    this.preguntasService.listarPreguntasExamen(this.examenId).subscribe({
      next: (data) => {
        this.preguntas = data;
      },
      error: (error) =>
        Swal.fire('Error', 'Error al listar las preguntas del examen', 'error'),
    });
  }

  public eliminarPregunta(preguntaId: any) {
    Swal.fire({
      title: 'Eliminar pregunta',
      text: '¿Estás seguro , quieres eliminar esta pregunta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.preguntasService.eliminarPregunta(preguntaId).subscribe({
          next: () => {
            this.snack.open('Pregunta eliminada', '', {
              duration: 3000,
            });
            this.preguntas = this.preguntas.filter(
              (pregunta: any) => pregunta.id != preguntaId
            );
          },
          error: (error) => {
            this.snack.open('Error al eliminar la pregunta', '', {
              duration: 3000,
            });
          },
        });
      }
    });
  }
}
