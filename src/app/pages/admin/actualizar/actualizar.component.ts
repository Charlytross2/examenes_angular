import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css'],
})
export class ActualizarComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private examenService: ExamenService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  examenId = 0;
  examen: any;
  categorias: any;

  ngOnInit(): void {
    //cargamos el id del examen de los parametros de ruta url
    this.examenId = this.route.snapshot.params['id'];
    this.examenService.obtenerExamen(this.examenId).subscribe({
      next: (data) => {
        this.examen = data;
      },
      error: (error) => {
        Swal.fire('Error', 'Error al cargar el examen', 'error');
      },
    });

    this.categoriaService.listarCategorias().subscribe({
      next: (data: any) => {
        this.categorias = data;
      },
      error: (error) => {
        Swal.fire('ERROR', 'Error al cargar las categorías', 'error');
      },
    });
  }

  public actualizarDatos() {
    this.examenService.actualizarExamen(this.examen).subscribe({
      next: (data) => {
        Swal.fire(
          'Examen actualizado',
          'El examen ha sido actualizado con éxito',
          'success'
        ).then((e) => {
          this.router.navigate(['/admin/examenes']);
        });
      },
      error: (error) => {
        Swal.fire(
          'Error en el sistema',
          'No se ha podido actualizar el examen',
          'error'
        );
      },
    });
  }
}
