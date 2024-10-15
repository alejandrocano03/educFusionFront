
export class Usuario  {
  nombre!: string;
  apellido!: string;
  correoElectronico!: string;
  contraseñaCifrada!: string;
  rol!: string;
  fechaRegistro!: Date;
  ultimaFechaAcceso?: Date;
}
