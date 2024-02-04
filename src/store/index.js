import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { blogsReducer } from "./blogsReducer";
import { userReducer } from "./userReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  blogsReducer,
  userReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
