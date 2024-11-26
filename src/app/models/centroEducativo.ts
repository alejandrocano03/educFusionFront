import { CategoriaCentros } from "./categoriaCentros";


export class CentroEducativo {
  id!: number;
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
