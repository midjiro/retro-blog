import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { publicationsReducer } from "./blogsReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  publicationsReducer: publicationsReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
