import { CentroEducativo } from "./centroEducativo";

export class EstadisticaRendimiento {
  añoAcademico?: number;
  nivelEducativo?: string;
  numeroAlumnos?: number;
  promedioCalificaciones?: number;
  numeroAlumnosNEEs?: number;
  datosEspecificosRendimiento?: string;

  centro!: CentroEducativo;

}
