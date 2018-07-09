import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// 3rd modules

import { ToastrService } from 'ngx-toastr';
import { Util } from '../util';
import { Store } from '@ngrx/store';
import * as AuthActions from '@store/auth/auth.actions';
import * as AuthReducer from '@store/auth/auth.reducers';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(
    private _router: Router,
    private _util: Util,
    private _toast: ToastrService,
    private _store: Store<AuthReducer.AuthState>,
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
    if (email === 'admin@email.com' && password === '123456') {
      return of({ access_token: 'hello', refresh_token: '123' });
    }
    return throwError(new Error('Invalid email or password'));
  }

  public signup(email: string, password: string, cb: any): void {

  }

}
