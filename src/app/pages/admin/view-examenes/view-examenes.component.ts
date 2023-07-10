import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-examenes',
  templateUrl: './view-examenes.component.html',
  styleUrls: ['./view-examenes.component.css'],
})
export class ViewExamenesComponent implements OnInit {
  examenes: any = [];

  constructor(private examenService: ExamenService) {}

  ngOnInit(): void {
    this.examenService.listarCuestionarios().subscribe({
      next: (data) => {
        this.examenes = data;
      },
      error: (error) =>
        Swal.fire('Error', 'Error al cargar lo examenes', 'error'),
    });
  }

  public eliminarExamen(examenId: any) {
    Swal.fire({
      title: 'Eliminar Examen',
      text: '¿Estas seguro de eliminar el examen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.examenService.eliminarExamen(examenId).subscribe({
          next: (data) => {
            this.examenes = this.examenes.filter(
              (examen: any) => examen.id != examenId
            );
            Swal.fire(
              'Examen eliminado',
              'El examen ha sido eliminado de la BD',
              'success'
            );
          },
          error: (error) =>
            Swal.fire('Error', 'Error al eliminar el examen', 'error'),
        });
      }
    });
  }
}
