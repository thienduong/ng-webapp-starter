import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from  '@angular/common/http';
// 3rd modules

import { ToastrService } from 'ngx-toastr';
import { Util } from '../util';
import { Store } from '@ngrx/store';
import * as AuthActions from '@store/auth/auth.actions';
import * as AuthReducer from '@store/auth/auth.reducers';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class UserManagementService {
  API_URL  =  'http://localhost:65385/api';
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

  public getUsers(userData?: any): Observable<any> {
      // return of({ ProductList: [{ Id: '1', Name: 'product1'}, { Id: '2', Name: 'product2' }]});
    return  this.httpClient.get(`${this.API_URL}/products`);
    }

}

