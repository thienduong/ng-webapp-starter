import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as userManagementActions from '@store/user-management/user-management.actions';
import { AppState } from '@store/store.reducers';
import {UserManagementService} from '@services/user-management';

@Injectable()
export class UserManagementEffects {
  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(userManagementActions.GET_LIST_USERS),
    // tap(() => this.store.dispatch(new userManagementActions.GetListUsers())),
    // debounceTime(2000),
    mergeMap(action => this.userManagementService.getUsers(action['payload']).pipe(
      // If successful, dispatch success action with result
      map(data => ({ type: userManagementActions.GET_LIST_USERS_SUCCESS, payload: data.ProductList })),
      // tap(() => this.store.dispatch(new fromLoginActions.EndLogin())),
      // If request fails, dispatch failed action
      catchError((e) => of({ type: userManagementActions.GET_LIST_USERS_ERROR, payload: e.message }))
    ))
  );

  // @Effect({ dispatch: false })
  // loginSuccess$ = this.actions$.pipe(
  //   ofType(fromLoginActions.LOGIN_SUCCESS),
  //   tap((data: any) => this.store.dispatch(new fromAuthActions.SetToken(data.payload))),
  //   tap(() => this.router.navigate(['/dashboard']))
  // );

  // @Effect({ dispatch: false })
  // loginFailed$ = this.actions$.pipe(
  //   ofType(fromLoginActions.LOGIN_FAILED),
  //   // tap(() => this.router.navigate(['/dashboard']))
  // );

  constructor(
    private userManagementService: UserManagementService,
    private actions$: Actions,
    private router: Router,
    private store: Store<AppState>
  ) {}
}
