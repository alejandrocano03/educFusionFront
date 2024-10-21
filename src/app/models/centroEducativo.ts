import { CategoriaCentros } from "./categoriaCentros";


export class CentroEducativo {
  nombre!: string;
  direccion!: string;
  tipoCentro!: string;
  numeroAlumnos!: number;
  numeroMaestros!: number;
  nivelesEducativosOfrecidos!: string;
  coordenadasGeograficas!: string; 
  categoria?: CategoriaCentros;
  datosRendimientoAcademico?: string
}
