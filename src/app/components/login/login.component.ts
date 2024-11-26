import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/UsuarioService.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { SharedUsuarioService } from '../../services/shared-usuario.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatIconModule, MatMenuModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private sharedUsuarioService: SharedUsuarioService
  ) {
    this.loginForm = this.fb.group({
      correoElectronico: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loginForm.get('correoElectronico')?.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });
  }
  public iniciarSesion(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }
  
    // Obtener los valores del formulario
    const correoElectronico = this.loginForm.get('correoElectronico')?.value;
    const contraseña = this.loginForm.get('contraseña')?.value;
  
    // Usar observer con subscribe
    this.usuarioService.authenticate(correoElectronico, contraseña).subscribe({
      next: (usuario) => {
        const fechaActual = new Date();
        usuario.ultimaFechaAcceso = fechaActual;
  
        // Actualizar el usuario completo (enviar usuario con la nueva fecha de acceso)
        this.usuarioService.updateUsuario(usuario).subscribe({
          next: (updatedUsuario) => {
            this.sharedUsuarioService.setUsuarioIniciado(updatedUsuario);
            this.router.navigate(['/principal']);
          },
          error: (error) => {
            console.error('Error al actualizar la fecha de acceso', error);
            this.errorMessage = 'Hubo un problema al actualizar la fecha de acceso. Intenta nuevamente.';
          }
        });
      },
      error: (error) => {
        this.errorMessage = 'Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.';
        console.error(error);
      },
    });
  }
  
}
