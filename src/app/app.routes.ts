import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'; 
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { OpinionUsuarioComponent } from './components/opinion-usuario/opinion-usuario.component'; 
import { ListadoCentrosComponent } from './listado-centros/listado-centros.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'principal', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'opinionUsuario', component: OpinionUsuarioComponent, canActivate: [AuthGuard] },
    { path: 'listadosCentros', component: ListadoCentrosComponent, canActivate: [AuthGuard] },

    { path: '**', redirectTo: '/login' }
  ];