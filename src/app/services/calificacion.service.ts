import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class CalificacionService {

  constructor(private http: HttpClient) {}

  verificarExamen(username: any, examenId: any) {
    return this.http.get(`${baseUrl}/calificacion/ver/`, {
      params: {
        username: username,
        examenId: examenId,
      },
    });
  }



  generarPdf(username: any, examenId: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/pdf' });
    return this.http.get<any>(`${baseUrl}/calificacion/pdf`, {
      params : {
        username : username,
        examenId : examenId
      },
      headers: headers,
      responseType : 'arraybuffer' as 'json'
    });
  }
}
