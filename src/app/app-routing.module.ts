import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth/auth.guard';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ChamadoListComponent } from './components/chamado/chamado-list/chamado-list.component';
import { ChamadoCreateComponent } from './components/chamado/chamado-create/chamado-create.component';
import { ChamadoUpdateComponent } from './components/chamado/chamado-update/chamado-update.component';
import { ChamadoReadComponent } from './components/chamado/chamado-read/chamado-read.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [authGuard]},
  {path: 'products', component: ProductsComponent, canActivate: [authGuard]},

  {path: 'tecnicos', component: TecnicoListComponent, canActivate: [authGuard]},
  {path: 'tecnicos/create', component: TecnicoCreateComponent, canActivate: [authGuard]},
  {path: 'tecnicos/update/:id', component: TecnicoUpdateComponent, canActivate: [authGuard]},
  {path: 'tecnicos/delete/:id', component: TecnicoDeleteComponent, canActivate: [authGuard]},

  {path: 'clientes', component: ClienteListComponent, canActivate: [authGuard]},
  {path: 'clientes/create', component: ClienteCreateComponent, canActivate: [authGuard]},
  {path: 'clientes/update/:id', component: ClienteUpdateComponent, canActivate: [authGuard]},
  {path: 'clientes/delete/:id', component: ClienteDeleteComponent, canActivate: [authGuard]},

  {path: 'chamados', component: ChamadoListComponent, canActivate: [authGuard]},
  {path: 'chamados/create', component: ChamadoCreateComponent, canActivate: [authGuard]},
  {path: 'chamados/update/:id', component: ChamadoUpdateComponent, canActivate: [authGuard]},
  {path: 'chamados/read/:id', component: ChamadoReadComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
