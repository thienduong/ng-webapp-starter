import { LoginActions, LOGIN_FAILED, START_LOGIN, END_LOGIN } from './login.actions';

export interface LoginState {
  errorMsg: string;
  isLoading: boolean;
}

const initialState: LoginState = {
  errorMsg: null,
  isLoading: false,
};

export function LoginReducer(state: LoginState = initialState, action: LoginActions) {
  switch (action.type) {
    case LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
    case START_LOGIN: 
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
      };
    case END_LOGIN:
      return initialState;
    default:
      return state;
  }
}
