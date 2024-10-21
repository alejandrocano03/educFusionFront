import { CentroEducativo } from './centroEducativo';
import { Usuario } from './usuario';

export class OpinionUsuario {
  fechaOpinion?: Date;
  comentario?: string;
  valoracion?: number;
  ubicacionComentario?: string;

  usuario!: Usuario;
  centro!: CentroEducativo;
}
