import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public registrarUsuario(user: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/usuarios/`, user);
  }

  public actualizarUsuario(user: any) {
    return this.http.put<any>(`${baseUrl}/usuarios/`,user);
  }

  public getUsuario(username: any) {
    return this.http.get<any>(`${baseUrl}/usuarios/${username}`);
  }

  public subirFoto( file : any ) : Observable<any>{
    return this.http.post<any>(`${baseUrl}/usuarios/upload/`,file);
  }

  public getFoto(filename: any) {
    return this.http.get(`${baseUrl}/usuarios/foto/${filename}`, { responseType : 'blob' });
  }
}
