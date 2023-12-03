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

    case ACTIONS.ADD_PUBLICATION:
      return {
        ...state,
        publications: [...state.publications, payload.publication],
      };
    case ACTIONS.DELETE_PUBLICATION:
      return {
        ...state,
        error: payload.error,
        publications: state.publications.filter(
          (publication) => publication.id !== payload.id
        ),
      };
  }
}

export const selectPublications = (state) => [
  state.publicationsReducer.error,
  state.publicationsReducer.publications,
];
