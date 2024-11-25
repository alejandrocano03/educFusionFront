import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CategoriaCentros } from '../models/categoriaCentros';

@Injectable({
  providedIn: 'root',
})
export class CategoriaCentroEducativoService extends ApiService {

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Obtiene todas las categorías de centros educativos.
   * @returns Un Observable que emite una lista de categorías.
   */
  getAllCategorias(): Observable<CategoriaCentros[]> {
    return this.http.get<CategoriaCentros[]>(`${this.apiUrl}/categorias`);
  }

  /**
   * Obtiene una categoría por su ID.
   * @param id - El ID de la categoría a obtener.
   * @returns Un Observable que emite la categoría correspondiente.
   */
  getCategoriaById(id: number): Observable<CategoriaCentros> {
    return this.http.get<CategoriaCentros>(`${this.apiUrl}/categorias/${id}`);
  }

  /**
   * Crea una nueva categoría.
   * @param categoria - El objeto CategoriaCentroEducativo a crear.
   * @returns Un Observable que emite la categoría creada.
   */
  createCategoria(categoria: CategoriaCentros): Observable<CategoriaCentros> {
    return this.http.post<CategoriaCentros>(`${this.apiUrl}/categorias`, categoria);
  }

  /**
   * Elimina una categoría por su ID.
   * @param id - El ID de la categoría a eliminar.
   * @returns Un Observable que completa una vez eliminado.
   */
  deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/categorias/${id}`);
  }
}
