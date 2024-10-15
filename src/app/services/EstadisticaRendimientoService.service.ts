import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { EstadisticaRendimiento } from '../models/EstadisticaRendimiento';

@Injectable({
  providedIn: 'root',
})
export class EstadisticaRendimientoEducativoService extends ApiService {

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Obtiene todas las estadísticas de rendimiento educativo.
   * @returns Un Observable que emite una lista de estadísticas.
   */
  getAllEstadisticas(): Observable<EstadisticaRendimiento[]> {
    return this.http.get<EstadisticaRendimiento[]>(`${this.apiUrl}/estadisticas`);
  }

  /**
   * Obtiene una estadística por su ID.
   * @param id - El ID de la estadística a obtener.
   * @returns Un Observable que emite la estadística correspondiente.
   */
  getEstadisticaById(id: number): Observable<EstadisticaRendimiento> {
    return this.http.get<EstadisticaRendimiento>(`${this.apiUrl}/estadisticas/${id}`);
  }

  /**
   * Crea una nueva estadística de rendimiento educativo.
   * @param estadistica - El objeto EstadisticaRendimientoEducativo a crear.
   * @returns Un Observable que emite la estadística creada.
   */
  createEstadistica(estadistica: EstadisticaRendimiento): Observable<EstadisticaRendimiento> {
    return this.http.post<EstadisticaRendimiento>(`${this.apiUrl}/estadisticas`, estadistica);
  }

  /**
   * Elimina una estadística por su ID.
   * @param id - El ID de la estadística a eliminar.
   * @returns Un Observable que completa una vez eliminado.
   */
  deleteEstadistica(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/estadisticas/${id}`);
  }

  /**
   * Filtra las estadísticas por ID de centro educativo.
   * @param centroId - El ID del centro a filtrar.
   * @returns Un Observable que emite la lista de estadísticas filtradas.
   */
  filterByCentroId(centroId: number): Observable<EstadisticaRendimiento[]> {
    return this.http.get<EstadisticaRendimiento[]>(`${this.apiUrl}/estadisticas/filter/centro/${centroId}`);
  }

  /**
   * Filtra las estadísticas por año académico.
   * @param añoAcademico - El año académico a filtrar.
   * @returns Un Observable que emite la lista de estadísticas filtradas.
   */
  filterByAñoAcademico(añoAcademico: number): Observable<EstadisticaRendimiento[]> {
    return this.http.get<EstadisticaRendimiento[]>(`${this.apiUrl}/estadisticas/filter/año?año=${añoAcademico}`);
  }

  /**
   * Filtra las estadísticas por nivel educativo.
   * @param nivelEducativo - El nivel educativo a filtrar.
   * @returns Un Observable que emite la lista de estadísticas filtradas.
   */
  filterByNivelEducativo(nivelEducativo: string): Observable<EstadisticaRendimiento[]> {
    return this.http.get<EstadisticaRendimiento[]>(`${this.apiUrl}/estadisticas/filter/nivel?nivel=${nivelEducativo}`);
  }
}
