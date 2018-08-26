import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { UsersComponent } from './users.component';
import { UsersFormComponent } from './users-form.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    UsersComponent,
    UsersFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule
  ],
  exports: [
    ReactiveFormsModule
  ],
  providers: [
    UserService
  ],
  entryComponents: [
    UsersFormComponent
  ],
})
export class UsersModule { }
