import ACTIONS from "../actions";

const INITIAL_STATE = {
  error: null,
  data: {
    title: "",
    description: "",
    cover: "",
    likes: 0,
  },
};

export function publicationReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.FETCH_PUBLICATION:
      return { ...state, error: payload.error, data: payload.data };
    default:
      return state;
  }
}

export const selectPublication = (state) => [
  state.publicationReducer.error,
  state.publicationReducer.data,
];
