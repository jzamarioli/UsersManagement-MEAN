import {Injectable} from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import * as config from '../../config';

@Injectable()
export class LoginService  {
    private url = config.API_URL + '/authenticate';
    headers = new Headers({ 'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    login(formdata: string) {
        return this.http.post(this.url, formdata)
        .map(res => res.json())
        .catch((error: any) => Observable.throw(error.message || error));
    }

}


