import ACTIONS from "../actions";

const initialState = {
  error: null,
  publications: null,
};

export function publicationsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;

    case ACTIONS.FETCH_PUBLICATIONS:
      return {
        ...state,
        error: payload.error,
        publications: payload.publications,
      };
  }
}

export const selectPublications = (state) => [
  state.publicationsReducer.error,
  state.publicationsReducer.publications,
];
