import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDataGridModule, DxFormModule, DxPopupModule, DxSelectBoxModule, DxTemplateModule } from 'devextreme-angular';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';

import { ClienteComponent } from './pages/cliente/cliente.component';
import { CompraComponent } from './pages/compra/compra.component';
import { ProductoComponent } from './pages/producto/producto.component';

import { AgregarClienteComponent, AgregarClienteModule } from './shared/components/crear-persona/crear-persona.component';
import { AgregarProductoComponent, AgregarProductoModule } from './shared/components/crear-producto/crear-producto.component';
import { AgregarCompraComponent, AgregarCompraModule } from './shared/components/crear-compra/crear-compra.component';
import { AgregarCompraProductoComponent, AgregarCompraProductoModule } from './shared/components/crear-compra-producto/crear-compra-producto.component';
import { AgregarfacturaComponent, AgregarfacturaModule } from './shared/components/crear-factura/crear-factura.component';

const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'cliente',
    component: ClienteComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'compra',
    component: CompraComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'producto',
    component: ProductoComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

const vistas = [AgregarClienteModule, AgregarProductoModule, AgregarCompraModule, AgregarCompraProductoModule, AgregarfacturaModule]

@NgModule({
  imports: [...vistas, RouterModule.forRoot(routes), DxDataGridModule, DxFormModule,
    DxButtonModule,
    DxPopupModule,
    DxTemplateModule,
    DxSelectBoxModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [HomeComponent, ProfileComponent, TasksComponent, ClienteComponent, CompraComponent, ProductoComponent]
})
export class AppRoutingModule { }
