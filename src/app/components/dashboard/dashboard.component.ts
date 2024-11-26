import { Component, OnInit } from '@angular/core';
import { SharedUsuarioService } from '../../services/shared-usuario.service';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/UsuarioService.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  usuario: Usuario | null = null;

  constructor(private sharedUsuarioService: SharedUsuarioService,
              private usuarioService: UsuarioService,
              private router: Router){}

  public ngOnInit(): void {
    this.usuario = this.sharedUsuarioService.getUsuarioIniciado(); 
  }

  /**
   * Método que cierra la sesión del usuario y actualiza la ultima fecha de acceso,
   * Redirige al login.
   */
  public logout(): void {
    const usuarioActual = this.sharedUsuarioService.getUsuarioIniciado();
    if (usuarioActual) {
      // Actualizamos el usuario completo (enviar usuario con la nueva fecha de acceso)
      usuarioActual.ultimaFechaAcceso = new Date();
      
      this.usuarioService.updateUsuario(usuarioActual).subscribe({
        next: () => {
        },
        error: (err) => {
          console.error('Error al actualizar la última fecha de acceso:', err);
        }
      });
      this.sharedUsuarioService.clearUsuarioIniciado();
    }
    this.router.navigate(['/login']);
  }

  /**
   * Método que navega entre paneles.
   * @param panel Panel a navegar
   */
  public navigateTo(panel: string): void {
    this.router.navigate([`/${panel}`]);
  }
  
  
}
