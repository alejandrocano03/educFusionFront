import { Usuario } from './Usuario';
import { CentroEducativo } from './centroEducativo';

export class OpinionUsuario {
  fechaOpinion?: Date;
  comentario?: string;
  valoracion?: number;
  ubicacionComentario?: string;

  usuario!: Usuario;
  centro!: CentroEducativo;
}
