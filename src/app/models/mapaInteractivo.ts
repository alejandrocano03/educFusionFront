import { CentroEducativo } from "./centroEducativo";

export class MapaInteractivo {
  coordenadasGeograficas?: string;
  parametrosZoom?: string;
  parametrosCentro?: string;
  capasDetalles?: string;

  centro!: CentroEducativo;

}
