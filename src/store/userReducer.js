import { ACTIONS } from "../actions";

const INITIAL_STATE = {
  user: {
    uid: "",
    email: "",
    displayName: "",
    photoURL: "",
  },
  isAuthenticated: false,
};

export function userReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.SIGN_IN:
      return { ...state, user: payload.user, isAuthenticated: true };
    case ACTIONS.SIGN_OUT:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
}

export const selectCurrentUser = (state) => state.userReducer.user;
export const selectIsAuthenticated = (state) =>
  state.userReducer.isAuthenticated;
