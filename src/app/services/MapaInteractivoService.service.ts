import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { MapaInteractivo } from '../models/mapaInteractivo';

@Injectable({
  providedIn: 'root',
})
export class MapaInteractivoService extends ApiService {

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Obtiene todos los mapas interactivos.
   * @returns Un Observable que emite una lista de mapas.
   */
  getAllMapas(): Observable<MapaInteractivo[]> {
    return this.http.get<MapaInteractivo[]>(`${this.apiUrl}/mapas`);
  }

  /**
   * Obtiene un mapa interactivo por su ID.
   * @param id - El ID del mapa a obtener.
   * @returns Un Observable que emite el mapa correspondiente.
   */
  getMapaById(id: number): Observable<MapaInteractivo> {
    return this.http.get<MapaInteractivo>(`${this.apiUrl}/mapas/${id}`);
  }

  /**
   * Crea un nuevo mapa interactivo.
   * @param mapa - El objeto MapaInteractivo a crear.
   * @returns Un Observable que emite el mapa creado.
   */
  createMapa(mapa: MapaInteractivo): Observable<MapaInteractivo> {
    return this.http.post<MapaInteractivo>(`${this.apiUrl}/mapas`, mapa);
  }

  /**
   * Elimina un mapa interactivo por su ID.
   * @param id - El ID del mapa a eliminar.
   * @returns Un Observable que completa una vez eliminado.
   */
  deleteMapa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/mapas/${id}`);
  }

  /**
   * Filtra mapas por ID de centro educativo.
   * @param centroId - El ID del centro a filtrar.
   * @returns Un Observable que emite la lista de mapas filtrados.
   */
  filterByCentroId(centroId: number): Observable<MapaInteractivo[]> {
    return this.http.get<MapaInteractivo[]>(`${this.apiUrl}/mapas/filter/centro/${centroId}`);
  }
}
