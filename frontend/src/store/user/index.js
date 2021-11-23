import { requestActions } from "../calls";
export const USER_AUTH = requestActions("USER_AUTH");
export const USER_REGISTER = requestActions("USER_REGISTER");
export const USER_LOGIN = requestActions("USER_LOGIN");
export const USER_LOGOUT = requestActions("USER_LOGOUT");

export const USER_LOGIN_AUTH0 = requestActions("USER_LOGIN_AUTH0");

const defaultState = {
  data: null,
  isLoading: true,
  error: null,

  // Register
  userRegisterLoading: false,
  userRegisterError: null,

  // Login
  userLoginLoading: false,
  userLoginError: null,

  // Logout
  userLogoutLoading: false,
  userLogoutError: null
};

export default function reducer(state = defaultState, { type, ...payload }) {
  switch (type) {
    case USER_AUTH.START:
      return { ...state, isLoading: true, error: null, data: null };
    case USER_AUTH.SUCCESS:
      return { ...state, isLoading: false, data: payload.data };
    case USER_AUTH.FAILURE:
      return { ...state, isLoading: false, error: payload.error };

    // Login Auth0
    case USER_LOGIN_AUTH0.START:
      return { ...state, isLoading: true, error: null, data: null };
    case USER_LOGIN_AUTH0.SUCCESS:
      return { ...state, isLoading: false, data: payload.data };
    case USER_LOGIN_AUTH0.FAILURE:
      return { ...state, isLoading: false, error: payload.error };

    // Register
    case USER_REGISTER.START:
      return { ...state, userRegisterLoading: true, userRegisterError: null };
    case USER_REGISTER.SUCCESS:
      return { ...state, userRegisterLoading: false, data: payload.data };
    case USER_REGISTER.FAILURE:
      return {
        ...state,
        userRegisterLoading: false,
        userRegisterError: payload.error
      };

    // Login
    case USER_LOGIN.START:
      return { ...state, userLoginLoading: true, userLoginError: null };
    case USER_LOGIN.SUCCESS:
      return { ...state, userLoginLoading: false, data: payload.data };
    case USER_LOGIN.FAILURE:
      return {
        ...state,
        userLoginLoading: false,
        userLoginError: payload.error
      };

    // Logout
    case USER_LOGOUT.START:
      return { ...state, userLogoutLoading: true, userLogoutError: null };
    case USER_LOGOUT.SUCCESS:
      return { ...state, userLogoutLoading: false, data: payload.data };
    case USER_LOGOUT.FAILURE:
      return {
        ...state,
        userLogoutLoading: false,
        userLogoutError: payload.error
      };

    default:
      return state;
  }
}

export function loginAuth0(data) {
  return {
    type: USER_LOGIN_AUTH0.MAIN,
    data
  };
}

export function checkSession() {
  return {
    type: USER_AUTH.MAIN
  };
}

export function registerUser(userData) {
  return {
    type: USER_REGISTER.MAIN,
    userData
  };
}
export function loginUser(userData) {
  return {
    type: USER_LOGIN.MAIN,
    userData
  };
}
export function logoutUser() {
  return {
    type: USER_LOGOUT.MAIN
  };
}
