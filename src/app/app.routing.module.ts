import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from './utils/CustomPaginator';
import { AuthGuard } from './auth.guard';
import { OpinionUsuarioComponent } from './components/opinion-usuario/opinion-usuario.component';
import { ListadoCentrosComponent } from './listado-centros/listado-centros.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'principal', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'opinionUsuario', component: OpinionUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'listadosCentros', component: ListadoCentrosComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClient, HttpClientJsonpModule, HttpClientModule],
  exports: [RouterModule],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginator }],
})
export class AppRoutingModule {}
