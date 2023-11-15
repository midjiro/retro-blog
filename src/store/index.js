import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { publicationsReducer } from "./publicationsReducer";
import { publicationReducer } from "./publicationReducer";

const rootReducer = combineReducers({
  publicationsReducer: publicationsReducer,
  publicationReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
