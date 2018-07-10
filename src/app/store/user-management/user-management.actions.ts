import { Action } from '@ngrx/store';
import { AppStoreService } from '@store/store.service';

export const GET_LIST_USERS_SUCCESS = AppStoreService.createActionType('@USERS/GET_LIST_USERS_SUCCESS');
export const GET_LIST_USERS_ERROR = AppStoreService.createActionType('@USERS/GET_LIST_USERS_ERROR');
export const GET_LIST_USERS = AppStoreService.createActionType('@USERS/GET_LIST_USERS');

export class GetListUsers implements Action {
  public readonly type = GET_LIST_USERS ;
  constructor(public payload: any) {
  }
}

export class GetListUsersSuccess implements Action {
  public readonly type = GET_LIST_USERS_SUCCESS;
  constructor(public payload: any) {
  }
}

export class GetListUsersError implements Action {
  public readonly type = GET_LIST_USERS_ERROR;
  constructor(public payload: any) {
  }
}

export type UserManagementActions = GetListUsers | GetListUsersSuccess;
