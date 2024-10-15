import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { OpinionUsuario } from '../models/opinionUsuario';

@Injectable({
  providedIn: 'root',
})
export class OpinionDeUsuarioService extends ApiService {

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Obtiene todas las opiniones de usuarios.
   * @returns Un Observable que emite una lista de opiniones.
   */
  getAllOpiniones(): Observable<OpinionUsuario[]> {
    return this.http.get<OpinionUsuario[]>(`${this.apiUrl}/opiniones`);
  }

  /**
   * Obtiene una opinión por su ID.
   * @param id - El ID de la opinión a obtener.
   * @returns Un Observable que emite la opinión correspondiente.
   */
  getOpinionById(id: number): Observable<OpinionUsuario> {
    return this.http.get<OpinionUsuario>(`${this.apiUrl}/opiniones/${id}`);
  }

  /**
   * Crea una nueva opinión de usuario.
   * @param opinion - El objeto OpinionDeUsuario a crear.
   * @returns Un Observable que emite la opinión creada.
   */
  createOpinion(opinion: OpinionUsuario): Observable<OpinionUsuario> {
    return this.http.post<OpinionUsuario>(`${this.apiUrl}/opiniones`, opinion);
  }

  /**
   * Elimina una opinión por su ID.
   * @param id - El ID de la opinión a eliminar.
   * @returns Un Observable que completa una vez eliminado.
   */
  deleteOpinion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/opiniones/${id}`);
  }

  /**
   * Filtra opiniones por ID de centro educativo.
   * @param centroId - El ID del centro a filtrar.
   * @returns Un Observable que emite la lista de opiniones filtradas.
   */
  filterByCentroId(centroId: number): Observable<OpinionUsuario[]> {
    return this.http.get<OpinionUsuario[]>(`${this.apiUrl}/opiniones/filter/centro/${centroId}`);
  }
}
