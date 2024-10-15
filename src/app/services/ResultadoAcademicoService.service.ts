import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ResultadoAcademico } from '../models/ResultadoAcademico';

@Injectable({
  providedIn: 'root',
})
export class ResultadoAcademicoService extends ApiService {

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Obtiene todos los resultados académicos.
   * @returns Un Observable que emite una lista de resultados académicos.
   */
  getAllResultados(): Observable<ResultadoAcademico[]> {
    return this.http.get<ResultadoAcademico[]>(`${this.apiUrl}/resultados`);
  }

  /**
   * Obtiene un resultado académico por su ID.
   * @param id - El ID del resultado a obtener.
   * @returns Un Observable que emite el resultado correspondiente.
   */
  getResultadoById(id: number): Observable<ResultadoAcademico> {
    return this.http.get<ResultadoAcademico>(`${this.apiUrl}/resultados/${id}`);
  }

  /**
   * Crea un nuevo resultado académico.
   * @param resultado - El objeto ResultadoAcademico a crear.
   * @returns Un Observable que emite el resultado creado.
   */
  createResultado(resultado: ResultadoAcademico): Observable<ResultadoAcademico> {
    return this.http.post<ResultadoAcademico>(`${this.apiUrl}/resultados`, resultado);
  }

  /**
   * Elimina un resultado académico por su ID.
   * @param id - El ID del resultado a eliminar.
   * @returns Un Observable que completa una vez eliminado.
   */
  deleteResultado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/resultados/${id}`);
  }

  /**
   * Filtra resultados académicos por ID de centro educativo.
   * @param centroId - El ID del centro a filtrar.
   * @returns Un Observable que emite la lista de resultados filtrados.
   */
  filterByCentroId(centroId: number): Observable<ResultadoAcademico[]> {
    return this.http.get<ResultadoAcademico[]>(`${this.apiUrl}/resultados/filter/centro/${centroId}`);
  }

  /**
   * Filtra resultados académicos por año académico.
   * @param añoAcademico - El año académico a filtrar.
   * @returns Un Observable que emite la lista de resultados filtrados.
   */
  filterByAñoAcademico(añoAcademico: number): Observable<ResultadoAcademico[]> {
    return this.http.get<ResultadoAcademico[]>(`${this.apiUrl}/resultados/filter/año/${añoAcademico}`);
  }

  /**
   * Filtra resultados académicos por nivel educativo.
   * @param nivelEducativo - El nivel educativo a filtrar.
   * @returns Un Observable que emite la lista de resultados filtrados.
   */
  filterByNivelEducativo(nivelEducativo: string): Observable<ResultadoAcademico[]> {
    return this.http.get<ResultadoAcademico[]>(`${this.apiUrl}/resultados/filter/nivel/${nivelEducativo}`);
  }
}
