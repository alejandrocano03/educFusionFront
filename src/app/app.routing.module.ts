import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './assets/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClient, HttpClientJsonpModule, HttpClientModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
