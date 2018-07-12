import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from  '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Util } from '../util';
import { Store } from '@ngrx/store';
import * as AuthActions from '@store/auth/auth.actions';
import * as AuthReducer from '@store/auth/auth.reducers';
import { Observable, of, throwError } from 'rxjs';
import { CustomHttpClient } from '@services/http/http.service';
import {ListUserModel, UserModel} from '../../models/UserModel';

@Injectable()
export class UserManagementService {
  constructor(
    private  httpClient:  HttpClient,
    private _router: Router,
    private _util: Util,
    private _toast: ToastrService,
    private _store: Store<AuthReducer.AuthState>,
    private _http: CustomHttpClient
  ) {}

  public logout(): void {
    this._util.clearToken();
    this._store.dispatch(new AuthActions.LogOut());
    this._router.navigate(['sign-in']);
  }

  public getUsers(userData?: any, params?: any): Observable<ListUserModel> {
    return this._http.Get<ListUserModel>(`/products`, {params});
  }
  public getDetail(id): Observable<UserModel> {
    return this._http.Get<UserModel>(`/users/detail/${id}`);
  }

}

