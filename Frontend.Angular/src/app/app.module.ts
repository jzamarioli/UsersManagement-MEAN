import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { Routing } from './app.routing';
import { LoginRoutingModule } from './login/login-routing.module';
import { UsersRoutingModule } from './users/users-routing.module';
import { LoginModule } from './login/login.module';
import { UsersModule } from './users/users.module';
import { MessageService } from './shared/services/message-service/message.service';
import { DirectAccessGuard } from './shared/services/router-security-service/router-security.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    UsersModule,
    LoginModule,
    Routing,
    LoginRoutingModule,
    UsersRoutingModule,
    ModalModule.forRoot()
  ],
  providers: [
    MessageService,
    DirectAccessGuard
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
