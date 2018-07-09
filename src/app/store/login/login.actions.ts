import { Action } from '@ngrx/store';
import { AppStoreService } from '@store/store.service';

export const LOGIN = AppStoreService.createActionType('@LOGIN/LOGIN');
export const LOGIN_FAILED = AppStoreService.createActionType('@LOGIN/LOGIN_FAILED');
export const LOGIN_SUCCESS = AppStoreService.createActionType('@LOGIN/LOGIN_SUCCESS');
export const START_LOGIN = AppStoreService.createActionType('@LOGIN/START_LOGIN');
export const END_LOGIN = AppStoreService.createActionType('@LOGIN/END_LOGIN');


export class Login implements Action {
  public readonly type = LOGIN;
  constructor(public payload: any) {
  }
}

export class StartLogin implements Action {
  public readonly type = START_LOGIN;
}

export class EndLogin implements Action {
  public readonly type = END_LOGIN;
}

export class LoginFailed implements Action {
  public readonly type = LOGIN_FAILED;

  constructor(public payload: any) {
  }
}

export class LoginSuccess implements Action {
  public readonly type = LOGIN_SUCCESS;

  constructor(public payload: any) {
  }
}


export type LoginActions =  StartLogin | Login | LoginFailed | LoginSuccess | EndLogin;
