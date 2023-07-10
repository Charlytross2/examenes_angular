import { Examen } from './../../../entities/examen';
import { Usuario } from './../../../entities/usuario';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CalificacionService } from 'src/app/services/calificacion.service';
import { ExamenService } from 'src/app/services/examen.service';
import { Observable, Subscription, flatMap, forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-load-examen',
  templateUrl: './load-examen.component.html',
  styleUrls: ['./load-examen.component.css'],
})
export class LoadExamenComponent implements OnInit {
  catId: any;
  examenes: Examen[] = [];
  user!: any;

  constructor(
    private route: ActivatedRoute,
    private examenService: ExamenService,
    private calificacionService: CalificacionService,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.catId = this.route.params.subscribe((params) => {
      this.catId = params['catId'];
      if (this.catId == 0) {
        this.examenService
          .obtenerExamenesActivos()
          .pipe(
            flatMap((exams: Examen[]) => {
              this.examenes = exams;
              const httpRequests: Observable<any>[] = [];
              exams.forEach((exam) => {
                const request = this.calificacionService.verificarExamen(
                  this.user.username,
                  exam.id
                );
                httpRequests.push(request);
              });
              return forkJoin(httpRequests);
            })
          )
          .subscribe({
            next: (results) => {
              for(let i = results.length - 1; i >= 0; i--){
                if (results[i]) {
                  this.examenes.splice(i, 1);
                  results.splice(i, 1);
                }
              }
            },
            error: (error) =>
              this.snackBar.open('Error al cargar los examenes', '', {
                duration: 3000,
              }),
          });
      } else {
        this.examenService
          .getExamenesActivosCategoria(this.catId)
          .pipe(
            flatMap((exams: Examen[]) => {
              this.examenes = exams;
              const httpRequests: Observable<any>[] = [];
              exams.forEach((exam) => {
                const request = this.calificacionService.verificarExamen(
                  this.user.username,
                  exam.id
                );
                httpRequests.push(request);
              });
              return forkJoin(httpRequests);
            })
          )
          .subscribe({
            next: (results) => {
              for(let i = results.length - 1; i >= 0; i--){
                if (results[i]) {
                  this.examenes.splice(i, 1);
                  results.splice(i, 1);
                }
              }
            },
            error: (error) =>
              this.snackBar.open('Error al cargar los examenes', '', {
                duration: 3000,
              }),
          });
      }
    });
  }
}
