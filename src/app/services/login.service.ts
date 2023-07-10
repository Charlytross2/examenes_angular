import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Usuario } from '../entities/usuario';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  //generamos metodo para generar token
  generarToken(loginData: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/generate-token`, loginData);
  }

  //iniciar sesion y establecemos el token en el local storage
  public loginUser(token: string) {
    localStorage.setItem('token', token);
  }

  public isLoggedIn(): boolean {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr === undefined || tokenStr === '' || tokenStr === null) {
      return false;
    }
    return true;
  }

  //cerrando sesion y eliminando el token
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //obtenemos el token
  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): any | null {
    let user = localStorage.getItem('user');
    if (user != null) {
      return JSON.parse(user);
    }
    return null;
  }

  public getUserRole() {
    let user = this.getUser();
    return user!.authorities[0].authority;
  }

  public getCurrentUser() : Observable<Usuario> {
    return this.http.get<any>(`${baseUrl}/actual`);
  }
}
