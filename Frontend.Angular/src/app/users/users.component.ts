import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subscription } from 'rxjs/Subscription';

import { User } from './models/user.model';
import { UserService } from './services/user.service';
import { UsersFormComponent } from './users-form.component';
import { MessageService } from '../shared/services/message-service/message.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  modalRef: BsModalRef;
  users: User[] = [];
  errors: string;
  subscription: Subscription;
  _idtodelete: string;
  usernametodelete: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private modalService: BsModalService,
    private messageService: MessageService) {
    }

    ngOnInit() {
      this.subscribeMessages();
      this.getAllUsers();
    }

    subscribeMessages() {
      this.subscription = this.messageService.getMessage().subscribe(response => {
        const objResponse = JSON.parse(response);
         if (objResponse.message === 'closepopup') {
          this.closePopUp();
         } else if (objResponse.message === 'save') {
          this.closePopUp();
          this.getAllUsers();
         }
       });
    }

    getAllUsers() {
      const result = this.userService.getAllUsers();
      result.subscribe(res => this.users = res,
      err => {
          this.errors = err;
        }
      );
    }

    logout() {
      this.modalRef.hide();
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }

    openUserFormModal(_id: string) {
      const initialState = {
        updating: _id ? true : false,
        _id: _id
      };
      this.modalRef = this.modalService.show(UsersFormComponent, {initialState});
    }

    openLogoutModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
    }

    openDeleteModal(template: TemplateRef<any>, _id: string, username: string) {
      this._idtodelete = _id;
      this.usernametodelete = username;
      this.modalRef = this.modalService.show(template);
    }

    deleteUser() {
      const result = this.userService.deleteUser(this._idtodelete);
      result.subscribe(res => {
        this.getAllUsers();
      },
      err => alert('An error occurred.'));
      this.closePopUp();
    }

    closePopUp() {
      this.modalRef.hide();
    }

    ngOnDestroy() {
      this.users = null;
      this.subscription.unsubscribe();
    }

}


