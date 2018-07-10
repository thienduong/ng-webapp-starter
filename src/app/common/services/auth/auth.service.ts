import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// 3rd modules

import { ToastrService } from 'ngx-toastr';
import { Util } from '../util';
import { Store } from '@ngrx/store';
import * as AuthActions from '@store/auth/auth.actions';
import * as AuthReducer from '@store/auth/auth.reducers';
import { Observable, of, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AuthService {
  API_URL  =  'http://localhost:65385';
  constructor(
    private  httpClient:  HttpClient,
    private _router: Router,
    private _util: Util,
    private _toast: ToastrService,
    private _store: Store<AuthReducer.AuthState>
  ) {
  }

  /**
   * clearInfo
   */
  public logout(): void {
    this._util.clearToken();
    this._store.dispatch(new AuthActions.LogOut());
    this._router.navigate(['sign-in']);
  }

  public login(userData: any): Observable<any> {
    const { email, password } = userData;
    // var a =  this.httpClient.post('${this.API_URL}/token', 'userName=' + encodeURIComponent(userData.username) +
    //   '&password=' + encodeURIComponent(userData.password) +
    //   { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    });

    const shareRequest = this.httpClient.post(`${this.API_URL}/token`, 'userName=' + encodeURIComponent(email) +
      '&password=' + encodeURIComponent(password) +
      '&grant_type=password', {
      headers
    });

    shareRequest.subscribe((resp: any) => {
      }, (err) => {
      throwError(new Error(err.message));
      }
    );
    return shareRequest;

    // return throwError(new Error('Invalid email or password'));
  }

  public signup(email: string, password: string, cb: any): void {

  }

}
