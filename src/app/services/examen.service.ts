import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Examen } from '../entities/examen';

@Injectable({
  providedIn: 'root',
})
export class ExamenService {
  constructor(private http: HttpClient) {}

  public listarCuestionarios(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/examen/`);
  }

  public agregarExamen(examen: any) {
    return this.http.post<any>(`${baseUrl}/examen/`, examen);
  }

  public eliminarExamen(id: any) {
    return this.http.delete(`${baseUrl}/examen/${id}`);
  }

  public actualizarExamen(examen: any) {
    return this.http.put(`${baseUrl}/examen/`, examen);
  }

  public obtenerExamen(id: any) {
    return this.http.get<any>(`${baseUrl}/examen/${id}`);
  }

  public obtenerExamenesActivos() : Observable<Examen[]>{
    return this.http.get<Examen[]>(`${baseUrl}/examen/activo`);
  }

  public listarExamenesCategoria(categoriaId: any) {
    return this.http.get(`${baseUrl}/examen/categoria/${categoriaId}`);
  }

  public getExamenesActivosCategoria(categoriaId: any) {
    return this.http.get<any>(
      `${baseUrl}/examen/categoria/activo/${categoriaId}`
    );
  }
}
