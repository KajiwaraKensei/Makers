import { combineReducers } from "redux";
import * as Template from "./template";
import * as Questions from "./questions";
import * as Loading from "./loading";
import * as Account from "./account";
import * as Search from "./search";
import * as Window from "./window";
// ______________________________________________________
//

export const initialState = () => ({
  template: Template.initialState(),
  questions: Questions.initialState(),
  loading: Loading.initialState(),
  account: Account.initialState(),
  search: Search.initialState(),
  window: Window.initialState()
});

// ______________________________________________________
//

export const reducer = combineReducers({
  template: Template.reducer,
  questions: Questions.reducer,
  loading: Loading.reducer,
  account: Account.reducer,
  search: Search.reducer,
  window: Window.reducer
});
