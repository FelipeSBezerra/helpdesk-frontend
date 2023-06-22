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

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [authGuard]},
  {path: 'products', component: ProductsComponent, canActivate: [authGuard]},
  {path: 'tecnicos', component: TecnicoListComponent, canActivate: [authGuard]},
  {path: 'tecnicos/create', component: TecnicoCreateComponent, canActivate: [authGuard]},
  {path: 'tecnicos/update/:id', component: TecnicoUpdateComponent, canActivate: [authGuard]},
  {path: 'tecnicos/delete/:id', component: TecnicoDeleteComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
