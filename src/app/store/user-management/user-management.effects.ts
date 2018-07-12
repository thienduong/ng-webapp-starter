import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as userManagementActions from '@store/user-management/user-management.actions';
import {UserManagementService} from '@services/user-management';



@Injectable()
export class UserManagementEffects {
  @Effect()
  $getList: Observable<Action> = this.actions$.pipe(
      ofType(userManagementActions.GET_LIST_USERS),
      mergeMap(action => this.userManagementService.getUsers(null, action['payload']).pipe(
      // If successful, dispatch success action with result
      map((data) => ({type: userManagementActions.GET_LIST_USERS_SUCCESS, payload: data.ProductList })),
      // If request fails, dispatch failed action
      catchError((e) => of({ type: userManagementActions.GET_LIST_USERS_ERROR, payload: e.message }))
    ))
  );
  constructor(
    private userManagementService: UserManagementService,
    private actions$: Actions,
  ) {}
}
