import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './view-categorias.component.html',
  styleUrls: ['./view-categorias.component.css'],
})
export class ViewCategoriasComponent implements OnInit {

  categorias: any = [
  ];

  constructor(private categoriaService : CategoriaService){}

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      {
      next : dato => this.categorias = dato,
      error : error => Swal.fire('Error!!','Error al cargar las categorias','error')
      }
    );
  }
  
}
