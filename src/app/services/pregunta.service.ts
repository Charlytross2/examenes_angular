import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class PreguntaService {
  constructor(private http: HttpClient) {}

  public listarPreguntasExamen(examenId: any): Observable<any> {
    return this.http.get<any>(`${baseUrl}/pregunta/examen/todos/${examenId}`);
  }

  public eliminarPregunta(id: any) {
    return this.http.delete<any>(`${baseUrl}/pregunta/${id}`);
  }

  public guardarPregunta(pregunta: any) {
    return this.http.post<any>(`${baseUrl}/pregunta/`, pregunta);
  }

  public actualizarPregunta(pregunta: any) {
    return this.http.put<any>(`${baseUrl}/pregunta/`, pregunta);
  }

  public obtenerPregunta(id: any) {
    return this.http.get<any>(`${baseUrl}/pregunta/${id}`);
  }

  public listarPreguntasDeExamenPrueba(examenId: any) {
    return this.http.get<any>(`${baseUrl}/pregunta/examen/todos/${examenId}`);
  }

  public evaluarExamen(preguntas: any, usernameUsuario : any) {
    return this.http.post<any>(`${baseUrl}/pregunta/evaluar-examen/`, {
      preguntas: preguntas,
      username : usernameUsuario
    });
  }
}
