import { createStore, Store, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { initialState, reducer } from "./reducer";
import thunks from "redux-thunk";
import * as Template from "./template";
import * as Questions from "./questions";
import * as Loading from "./loading";
import * as Account from "./account";
import * as Search from "./search";
import * as Window from "./window";

// ______________________________________________________
//
export type RootState = ReturnType<typeof initialState>;
export type ReduxStore = Store<RootState>;
// ______________________________________________________
//
export function initStore(state = initialState()) {
  return createStore(
    reducer,
    state,
    composeWithDevTools(applyMiddleware(thunks))
  );
}
export const actionCreator = {
  template: Template.actionCreator,
  questions: Questions.actionCreator,
  loading: Loading.actionCreator,
  account: Account.actionCreator,
  search: Search.actionCreator,
  window: Window.actionCreator
};
