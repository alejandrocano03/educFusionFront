import { Usuario } from './usuario';
import { CentroEducativo } from './CentroEducativo';

export class Informe {
  tipoInforme?: string;
  datosIncluidos?: string;
  fechaGeneracion?: Date;

  autorInforme!: Usuario;
  centro!: CentroEducativo;
}
