import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { LoginService } from './services/login.service';
import { UsersFormComponent } from '../users/users-form.component';
import { MessageService } from '../shared/services/message-service/message.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('username') usernameElement: ElementRef;

  modalRef: BsModalRef;
  loginform: FormGroup;
  errormsg: string;
  subscription: Subscription;

  constructor( private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private messageService: MessageService) {
  }

  ngOnInit() {
    this.loginform = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.route.params.subscribe(params => {
      const username: string = params['username'];
      if (username) {
        this.loginform.get('username').setValue(username);
      }
    });

    this.subscribeMessages();
  }
  
  ngAfterViewInit() {
    this.usernameElement.nativeElement.focus();
  }

  subscribeMessages() {
    this.subscription = this.messageService.getMessage().subscribe(response => {
      const objResponse = JSON.parse(response);
       if (objResponse.message === 'closepopup') {
          this.closePopUp();
       } else if (objResponse.message === 'save') {
          this.loginform.get('username').setValue(objResponse.args.username);
          this.closePopUp();
       }
     });
  }

  async login(formdata: string) {
    const result = this.loginService.login(formdata); // gets the token
    result.subscribe(res => {
      this.errormsg = '';
      const token: string = res.token;
      this.createToken(res.token)
          .then(data => this.router.navigate(['users']));
    },
      error => {
        if (error.status === 404) {
          this.errormsg = 'Invalid user/password';
        } else {
          this.errormsg = 'An error occurred.\nPlease ensure that both MongoDB and Node Web API are running.';
        }
      }
    );
  }

  createToken(token) {
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        localStorage.setItem('token', token);
        resolve('');
      }, 200);
    });
  }

  createNewUser() {
    const initialState = {
      updating: false
    };
    this.modalRef = this.modalService.show(UsersFormComponent, {initialState});
  }

  closePopUp() {
    this.modalRef.hide();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
