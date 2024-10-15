import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends ApiService{

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Obtiene todos los usuarios.
   * @returns Un Observable que emite una lista de usuarios.
   */
  getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
  }

  /**
   * Obtiene un usuario por su ID.
   * @param id - El ID del usuario a obtener.
   * @returns Un Observable que emite el usuario correspondiente.
   */
  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuarios/${id}`);
  }

  /**
   * Crea un nuevo usuario.
   * @param usuario - El objeto Usuario a crear.
   * @returns Un Observable que emite el usuario creado.
   */
  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/usuarios`, usuario);
  }

  /**
   * Actualiza un usuario existente.
   * @param usuario - El objeto Usuario a actualizar.
   * @returns Un Observable que emite el usuario actualizado.
   */
updateUsuario(usuario: Usuario): Observable<Usuario> {
  return this.http.put<Usuario>(`${this.apiUrl}/usuarios`, usuario);
}


  /**
   * Elimina un usuario por su ID.
   * @param id - El ID del usuario a eliminar.
   * @returns Un Observable que completa una vez eliminado.
   */
  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/usuarios/${id}`);
  }

/**
 * Autentica un usuario usando correo electrónico y contraseña cifrada.
 * @param correoElectronico - El correo electrónico del usuario.
 * @param contraseñaCifrada - La contraseña cifrada del usuario.
 * @returns Un Observable que emite el usuario autenticado.
 */
authenticate(correoElectronico: string, contraseñaCifrada: string): Observable<Usuario> {
  // Crea un objeto Usuario con los datos de autenticación para recuperar el usuario con el que hace login comparando con el correo.
  const usuarioTemporal: Usuario = {
    correoElectronico: correoElectronico,
    contraseñaCifrada: contraseñaCifrada,
    nombre: '',
    apellido: '',
    rol: '',
    fechaRegistro: new Date() 
  };

  // Envía una solicitud POST con el objeto Usuario en el cuerpo
  return this.http.post<Usuario>(`${this.apiUrl}/usuarios/login`, usuarioTemporal);
}

}
