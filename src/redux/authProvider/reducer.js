import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actionType";

// const initialState = {
//   isAuth: localStorage.getItem("isAuth") || false,
//   token: localStorage.getItem("token") || null,
//   data: localStorage.getItem("user") || null,
// };

export const authReducer = (state = null, { type, payload, token }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: payload,
        token: token,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuth: false,
      };
    default:
      return state;
  }
};
