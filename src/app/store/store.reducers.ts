import { ActionReducerMap, ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from '@store/router/router.reducers';
import { storeFreeze } from 'ngrx-store-freeze'; // Prevent mutate the State directly in Development mode
import { MetaReducer } from '@ngrx/store';
import { environment } from 'environments/environment';
import { LoginState, LoginReducer } from './login/login.reducers';
import { AuthState, AuthReducer } from './auth/auth.reducers';
import {ListUserState, UserManagementReducer} from '@store/user-management/user-management.reducers';

export interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  auth: AuthState;
  login: LoginState;
  users: ListUserState;
}

export const AppReducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  auth: AuthReducer,
  login: LoginReducer,
  users: UserManagementReducer
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state: AppState, action: any): AppState => {
    console.log('%c [Ngrx-DEBUG] STATE', 'color: #007fff', state);
    console.log('%c [Ngrx-DEBUG] ACTION', 'color: #007fff', action);
    return reducer(state, action);
  };
}

export function localStorageSyncReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return localStorageSync({
    keys: ['auth'], // allowed keys to be saved to local storage
    rehydrate: true   // allowed init state from local storage
  })(reducer);
}

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze, logger, localStorageSyncReducer]
  : [localStorageSyncReducer];
