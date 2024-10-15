import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CentroEducativo } from '../models/centroEducativo';

@Injectable({
  providedIn: 'root',
})
export class CentroEducativoService extends ApiService {

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Obtiene todos los centros educativos.
   * @returns Un Observable que emite una lista de centros educativos.
   */
  getAllCentros(): Observable<CentroEducativo[]> {
    return this.http.get<CentroEducativo[]>(`${this.apiUrl}/centros`);
  }

  /**
   * Obtiene un centro educativo por su ID.
   * @param id - El ID del centro a obtener.
   * @returns Un Observable que emite el centro correspondiente.
   */
  getCentroById(id: number): Observable<CentroEducativo> {
    return this.http.get<CentroEducativo>(`${this.apiUrl}/centros/${id}`);
  }

  /**
   * Crea un nuevo centro educativo.
   * @param centroEducativo - El objeto CentroEducativo a crear.
   * @returns Un Observable que emite el centro creado.
   */
  createCentro(centroEducativo: CentroEducativo): Observable<CentroEducativo> {
    return this.http.post<CentroEducativo>(`${this.apiUrl}/centros`, centroEducativo);
  }

  /**
   * Elimina un centro educativo por su ID.
   * @param id - El ID del centro a eliminar.
   * @returns Un Observable que completa una vez eliminado.
   */
  deleteCentro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/centros/${id}`);
  }

  /**
   * Filtra los centros educativos por tipo.
   * @param tipoCentro - El tipo de centro a filtrar.
   * @returns Un Observable que emite la lista de centros filtrados.
   */
  filterByTipoCentro(tipoCentro: string): Observable<CentroEducativo[]> {
    return this.http.get<CentroEducativo[]>(`${this.apiUrl}/centros/filter/tipo?tipo=${tipoCentro}`);
  }

  /**
   * Filtra los centros educativos por nombre.
   * @param nombreCentro - El nombre del centro a filtrar.
   * @returns Un Observable que emite la lista de centros filtrados.
   */
  filterByNombreCentro(nombreCentro: string): Observable<CentroEducativo[]> {
    return this.http.get<CentroEducativo[]>(`${this.apiUrl}/centros/filter/nombre?nombre=${nombreCentro}`);
  }
}
