import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { DirectAccessGuard } from '../shared/services/router-security-service/router-security.service';

const routes: Routes = [
  {path: 'users', component: UsersComponent, canActivate: [DirectAccessGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
