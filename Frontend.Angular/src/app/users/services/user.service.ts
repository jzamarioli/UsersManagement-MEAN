import {Injectable} from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import {User} from '../models/user.model';
import * as config from '../../config';


@Injectable()
export class UserService  {
    private url = config.API_URL + '/users';
    private header;
    private headerToken;

    constructor(private http: Http) {
      this.header = new Headers({'Content-Type': 'application/json'});
    }

    getUser(_id: string) {
      this.setHeaderToken();
      return this.http.get(this.getUserUrl(_id), {headers: this.headerToken})
        .map(res => res.json());
    }

    getAllUsers() {
      this.setHeaderToken();
      return this.http.get(this.url, {headers: this.headerToken})
        .map(res => res.json());
    }

    addUser(user: User) {
      return this.http.post(this.url, JSON.stringify(user), {headers: this.header})
        .map(res => res.json())
        .catch((error: any) => Observable.throw(error.message || error));
    }

    updateUser(user: User) {
      this.setHeaderToken();
      return this.http.put(this.getUserUrl(user._id), JSON.stringify(user), {headers: this.headerToken})
        .map(res => res.json())
        .catch((error: any) => Observable.throw(error.message || error));
    }

    deleteUser(_id: string) {
      this.setHeaderToken();
      return this.http.delete(this.getUserUrl(_id), {headers: this.headerToken})
        .map(res => res.json())
        .catch((error: any) => Observable.throw(error.message || error));
    }

    private getUserUrl(_id) {
      return this.url + '/' + _id;
    }

    setHeaderToken() {
      this.headerToken = new Headers({'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('token')});
    }

}
