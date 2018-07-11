import {UserManagementActions, GET_LIST_USERS_SUCCESS} from './user-management.actions';

export interface ListUserAState {
  ProductList: any[];
  total: number;

}


export interface ListUserState {
  users: Array<Object>;
  total: number;
}

const initialState: ListUserState = {
  total: 0,
  users: [],
}

export function UserManagementReducer(state: ListUserState = initialState, action: UserManagementActions) {
  switch (action.type) {
    case GET_LIST_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
}
