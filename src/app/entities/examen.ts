import { Categoria } from "./categoria";

export interface Examen {
    id:              number;
    titulo:          string;
    descripcion:     string;
    puntosMaximos:   number;
    numeroPreguntas: number;
    activo:          boolean;
    categoria:       Categoria;
}