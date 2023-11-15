import ACTIONS from "../actions";

const initialState = { error: null, data: null };

export function publicationReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;

    case ACTIONS.FETCH_PUBLICATION:
      return { ...state, error: payload.error, data: payload.data };
    case ACTIONS.LIKE_PUBLICATION:
      return {
        ...state,
        error: payload.error,
        data: { ...state.data, likes: state.data.likes + 1 },
      };
    case ACTIONS.DELETE_PUBLICATION:
      return { ...state, error: payload.error };
  }
}

export const selectPublication = (state) => [
  state.publicationReducer.error,
  state.publicationReducer.data,
];
