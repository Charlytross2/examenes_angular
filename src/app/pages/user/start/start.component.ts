import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalificacionService } from 'src/app/services/calificacion.service';
import { LoginService } from 'src/app/services/login.service';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  examenId: any;
  username: any;
  preguntas: any;
  puntosConseguidos = 0;
  respuestasCorrectas = 0;
  intentos = 0;

  esEnviado = false;
  timer: any;

  constructor(
    private locationSt: LocationStrategy,
    private route: ActivatedRoute,
    private preguntaService: PreguntaService,
    private userService: LoginService,
    private calificacionService : CalificacionService
  ) {}

  ngOnInit(): void {
    this.userService
      .getCurrentUser()
      .subscribe((user) => (this.username = user.username));
    this.prevenirBotonRetroceso();
    this.examenId = this.route.snapshot.params['examenId'];
    this.cargarPreguntas();
  }

  public cargarPreguntas() {
    this.preguntaService
      .listarPreguntasDeExamenPrueba(this.examenId)
      .subscribe({
        next: (data: any) => {
          this.preguntas = data;
          this.timer = this.preguntas.length * 2 * 60;
          this.preguntas.forEach((pregunta: any) => {
            pregunta['respuestaDada'] = '';
          });
          this.iniciarTemporizador();
        },
        error: (error) => {
          Swal.fire(
            'Error',
            'Error al cargar las preguntas de la prueba',
            'error'
          );
        },
      });
  }

  public enviarCuestionario() {
    Swal.fire({
      title: '¿Quieres enviar el examen?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Enviar',
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.evaluarExamen();
      }
    });
  }

  public obtenerHoraFormateada() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} : min : ${ss} seg`;
  }

  public evaluarExamen() {
    this.preguntaService
      .evaluarExamen(this.preguntas, this.username)
      .subscribe({
        next: (data: any) => {
          this.puntosConseguidos = data.puntosMaximos;
          this.respuestasCorrectas = data.respuestasCorrectas;
          this.intentos = data.intentos;
          this.esEnviado = true;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  public iniciarTemporizador() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evaluarExamen();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  public prevenirBotonRetroceso() {
    history.pushState(null, null!, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null!, location.href);
    });
  }

  imprimirPagina() {
    this.calificacionService.generarPdf(this.username, this.examenId)
    .subscribe((response: ArrayBuffer) => {
      this.guardarArchivo(response, `${this.username}.pdf`);
    });
  }

  guardarArchivo(data: ArrayBuffer, filename: string): void {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
