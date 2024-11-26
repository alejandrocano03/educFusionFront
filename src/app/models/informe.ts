import { Usuario } from './usuario';
import { CentroEducativo } from './centroEducativo';

export class Informe {
  tipoInforme?: string;
  datosIncluidos?: string;
  fechaGeneracion?: Date;

  autorInforme!: Usuario;
  centro?: CentroEducativo;
}
