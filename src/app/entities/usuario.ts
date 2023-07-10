import { Authority } from "./authority";

export interface Usuario {
    id:                    number;
    username:              string;
    password:              string;
    nombre:                string;
    apellido:              string;
    email:                 string;
    telefono:              string;
    habilitado:            boolean;
    perfil:                string;
    enabled:               boolean;
    authorities:           Authority[];
    accountNonLocked:      boolean;
    credentialsNonExpired: boolean;
    accountNonExpired:     boolean;
}