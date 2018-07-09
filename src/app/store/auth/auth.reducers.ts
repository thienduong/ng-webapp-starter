import {
  AuthActions,
  SET_CURRENT_USER,
  SET_IS_LOGGED_IN,
  LOG_OUT,
  SET_TOKEN,
  GET_PROFILE_SUCCESS,
} from './auth.actions';

export interface AuthState {
  currentUser: any;
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
}

const initialState: AuthState = {
  currentUser: null,
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
};

export function AuthReducer(state: AuthState = initialState, action: AuthActions) {
  switch (action.type) {
    case LOG_OUT:
      return initialState;
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload, isLoggedIn: true };
    case SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload
      };
    case GET_PROFILE_SUCCESS:
      return { ...state, currentUser: action.payload };
    case SET_TOKEN:
      return {
        ...state,
        refreshToken: action.payload.refresh_token,
        accessToken: action.payload.access_token,
        isLoggedIn: true
      };
    default:
      return state;
  }
}
