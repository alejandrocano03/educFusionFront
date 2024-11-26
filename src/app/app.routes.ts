import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'; 
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { OpinionUsuarioComponent } from './components/opinion-usuario/opinion-usuario.component'; 
import { ListadoCentrosComponent } from './components/listado-centros/listado-centros.component';
import { EstadisticasResultadosComponent } from './components/estadisticas-resultados/estadisticas-resultados.component';
import { MapasComponent } from './components/mapas/mapas.component';
import { GenerarInformesComponent } from './components/generar-informes/generar-informes.component';
import { InformeGeneradoComponent } from './components/informe-generado/informe-generado.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'principal', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'opinionUsuario', component: OpinionUsuarioComponent, canActivate: [AuthGuard] },
    { path: 'listadosCentros', component: ListadoCentrosComponent, canActivate: [AuthGuard] },
    { path: 'estadisticasYResultados', component: EstadisticasResultadosComponent, canActivate: [AuthGuard] },
    { path: 'mapas', component: MapasComponent, canActivate: [AuthGuard] },
    { path: 'informes', component: GenerarInformesComponent, canActivate: [AuthGuard] },
    { path: 'informeGenerado', component: InformeGeneradoComponent, canActivate: [AuthGuard] },

    { path: '**', redirectTo: '/login' }
  ];