import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '@common/services';
import * as fromLoginActions from '@store/login/login.actions';
import * as fromAuthActions from '@store/auth/auth.actions';
import { AppState } from '@store/store.reducers';

@Injectable()
export class LoginEffects {
  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(fromLoginActions.LOGIN),
    tap(() => this.store.dispatch(new fromLoginActions.StartLogin())),
    debounceTime(2000),
    mergeMap(action => this.authService.login(action['payload']).pipe(
      // If successful, dispatch success action with result
      map(data => ({ type: fromLoginActions.LOGIN_SUCCESS, payload: data })),
      tap(() => this.store.dispatch(new fromLoginActions.EndLogin())),
      // If request fails, dispatch failed action
      catchError((e) => of({ type: fromLoginActions.LOGIN_FAILED, payload: e.message }))
    ))
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(fromLoginActions.LOGIN_SUCCESS),
    tap((data: any) => this.store.dispatch(new fromAuthActions.SetToken(data.payload))),
    tap(() => this.router.navigate(['/dashboard']))
  );

  @Effect({ dispatch: false })
  loginFailed$ = this.actions$.pipe(
    ofType(fromLoginActions.LOGIN_FAILED),
    // tap(() => this.router.navigate(['/dashboard']))
  );

  constructor(
    private authService: AuthService, 
    private actions$: Actions, 
    private router: Router,
    private store: Store<AppState>
  ) {}
}
