import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SharedUsuarioService } from './services/shared-usuario.service'; 

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private usuarioService: SharedUsuarioService, private router: Router) {}

  canActivate(): boolean {
    if (this.usuarioService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
