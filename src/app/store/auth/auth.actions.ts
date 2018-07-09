import { Action } from '@ngrx/store';
import { AppStoreService } from '@store/store.service';

export const LOG_OUT = AppStoreService.createActionType('@AUTH/LOG_OUT');
export const SET_CURRENT_USER = AppStoreService.createActionType('@AUTH/SET_CURRENT_USER');
export const SET_IS_LOGGED_IN = AppStoreService.createActionType('@AUTH/SET_IS_LOGGED_IN');
export const SET_TOKEN = AppStoreService.createActionType('@AUTH/SET_TOKEN');
export const GET_PROFILE_SUCCESS = AppStoreService.createActionType('@AUTH/GET_PROFILE_SUCCESS');

export class LogOut implements Action {
  public readonly type = LOG_OUT;
}

export class SetCurrentUser implements Action {
  public readonly type = SET_CURRENT_USER;

  constructor(public payload: any) {
  }
}

export class SetIsLoggedIn implements Action {
  public readonly type = SET_IS_LOGGED_IN;

  constructor(public payload: boolean) {
  }
}

export class SetToken implements Action {
  public readonly type = SET_TOKEN;

  constructor(public payload: any) {
  }
}

export class GetProfileSuccess implements Action {
  public readonly type = GET_PROFILE_SUCCESS;

  constructor(public payload: any) {
  }
}

export type AuthActions =
  SetCurrentUser
  | SetIsLoggedIn
  | LogOut
  | SetToken
  | GetProfileSuccess;
