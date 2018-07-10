import {UserManagementActions, GET_LIST_USERS_SUCCESS} from './user-management.actions';

export interface ListUserState {
  users: Array<Object>;
}

const initialState: ListUserState = {
  users: null
};

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
