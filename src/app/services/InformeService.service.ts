import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Informe } from '../models/informe';

@Injectable({
  providedIn: 'root',
})
export class InformeService extends ApiService {

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Obtiene todos los informes.
   * @returns Un Observable que emite una lista de informes.
   */
  getAllInformes(): Observable<Informe[]> {
    return this.http.get<Informe[]>(`${this.apiUrl}/informes`);
  }

  /**
   * Obtiene un informe por su ID.
   * @param id - El ID del informe a obtener.
   * @returns Un Observable que emite el informe correspondiente.
   */
  getInformeById(id: number): Observable<Informe> {
    return this.http.get<Informe>(`${this.apiUrl}/informes/${id}`);
  }

  /**
   * Crea un nuevo informe.
   * @param informe - El objeto Informe a crear.
   * @returns Un Observable que emite el informe creado.
   */
  createInforme(informe: Informe): Observable<Informe> {
    return this.http.post<Informe>(`${this.apiUrl}/informes`, informe);
  }

  /**
   * Elimina un informe por su ID.
   * @param id - El ID del informe a eliminar.
   * @returns Un Observable que completa una vez eliminado.
   */
  deleteInforme(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/informes/${id}`);
  }

  /**
   * Filtra informes por ID de centro educativo.
   * @param centroId - El ID del centro a filtrar.
   * @returns Un Observable que emite la lista de informes filtrados.
   */
  filterByCentroId(centroId: number): Observable<Informe[]> {
    return this.http.get<Informe[]>(`${this.apiUrl}/informes/filter/centro/${centroId}`);
  }

  /**
   * Filtra informes por tipo.
   * @param tipo - El tipo de informe a filtrar.
   * @returns Un Observable que emite la lista de informes filtrados.
   */
  filterByTipoInforme(tipo: string): Observable<Informe[]> {
    return this.http.get<Informe[]>(`${this.apiUrl}/informes/filter/tipo?tipo=${tipo}`);
  }
}
