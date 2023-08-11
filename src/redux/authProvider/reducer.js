import { LOGIN_SUCCESS, LOGOUT } from "./actionType";

export const authReducer = (state = null, { type, payload, token }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: payload,
        token: token,
      };
    case LOGOUT:
      return payload;
    default:
      return state;
  }
};
