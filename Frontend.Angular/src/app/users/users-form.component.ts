import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { User } from './models/user.model';
import { UserService } from './services/user.service';
import { MessageService } from '../shared/services/message-service/message.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {
  modalRef: BsModalRef;
  userform: FormGroup;

  updating: boolean;
  _id: string;
  errors: string;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService) {
  }

  ngOnInit() {
    if (this._id) {
        this.getUser(this._id);
    }
    this.createReactiveFormFields();
  }

  createReactiveFormFields() {
    this.userform = this.fb.group({
      _id: [''],
      name: ['', [Validators.required, Validators.minLength(5)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]],
      email: ['', [Validators.email]],
      role: ['', [Validators.required]]
    });
  }

  getUser(_id: string) {
    this.userService.getUser(_id)
    .subscribe(
      response => {
        this.updateFormData(response);
      },
      err => {
          this.errors = err;
      });
  }

  updateFormData (user: User) {
    const form = this.userform;
    form.get('_id').setValue(user._id);
    form.get('name').setValue(user.name);
    form.get('username').setValue(user.username);
    form.get('password').setValue(user.password);
    form.get('email').setValue(user.email);
    form.get('role').setValue(user.role);
  }


  saveUser(user: User) {
    let result;

    if (this.updating) {  // existing user
        result = this.userService.updateUser(user);
    } else {        // new user
        result = this.userService.addUser(user);
    }
    result.subscribe(res => {
      this.errors = '';
      if (res.message === 'Username already exists') {
        this.errors = res.message;
      } else {
        this.sendMessage('save', user);
      }
    },
    err => this.errors = err);
  }

  sendMessage(message: string, args: any) {
    let msg;
    if (args) {
      msg = `{ "message": "${message}" , "args": ${JSON.stringify(args)}}`;
    } else {
      msg = `{ "message": "${message}" }`;
    }

    this.messageService.sendMessage(msg);
  }

}
