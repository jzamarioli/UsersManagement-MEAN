import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { LoginRoutingModule } from './login/login-routing.module';
import { UsersRoutingModule } from './users/users-routing.module';
import { DirectAccessGuard } from './shared/services/router-security-service/router-security.service';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full', canActivate: [DirectAccessGuard]},
  {path: 'not-found', component: NotFoundComponent },
  {path: '**', component: NotFoundComponent, pathMatch: 'full', canActivate: [DirectAccessGuard] }

];

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    LoginRoutingModule,
    UsersRoutingModule,
    RouterModule.forRoot(routes)]
})
export class Routing { }
