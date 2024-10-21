import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'; 
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { OpinionUsuarioComponent } from './opinion-usuario/opinion-usuario.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'principal', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'opinionUsuario', component: OpinionUsuarioComponent, canActivate: [AuthGuard] },

    { path: '**', redirectTo: '/login' }
  ];