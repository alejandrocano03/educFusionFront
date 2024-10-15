import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class SharedUsuarioService {
  private usuarioIniciado: Usuario | null = null;

  setUsuarioIniciado(usuario: Usuario): void {
    this.usuarioIniciado = usuario;
  }

  getUsuarioIniciado(): Usuario | null {
    return this.usuarioIniciado;
  }

  clearUsuarioIniciado(): void {
    this.usuarioIniciado = null;
  }

  isLoggedIn(): boolean {
    return this.usuarioIniciado !== null;
  }
}
