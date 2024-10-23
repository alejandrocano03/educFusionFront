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

  public logout(): void {
    const usuarioActual = this.sharedUsuarioService.getUsuarioIniciado();
    if (usuarioActual) {
       usuarioActual.ultimaFechaAcceso = new Date();
        this.usuarioService.updateUsuario(usuarioActual).subscribe({
          next: () => {
              console.log('Fecha de última actividad actualizada en la base de datos.');
          },
          error: (err) => {
              console.error('Error al actualizar la última fecha de acceso:', err);
          }
      });
      this.sharedUsuarioService.clearUsuarioIniciado();
    }
    this.router.navigate(['/login']);
  }

  public navigateTo(panel: string): void {
    this.router.navigate([`/${panel}`]);
  }
  
  
}
