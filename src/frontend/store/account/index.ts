import { Actions } from "../actions";
import { question } from "../questions";
import * as actions from "./actions";
import * as thunkActions from "./thunkAction";

// ______________________________________________________
//
export interface selfMadeTemplate {
  title: string;
  memo: string;
  id: string;
  executionCount: number;
  tags: string[];
  fav: number;
  comments: number;
  date: string;
  template: string;
  questions: question[];
}
interface State {
  login: boolean;
  userName: string;
  selfMadeTemplates: selfMadeTemplate[];
}

// ______________________________________________________
//

export const initialState = (injects?: State): State => ({
  login: false,
  userName: "ゲストさん",
  selfMadeTemplates: [],
  ...injects
});
// ______________________________________________________
//
export const reducer = (state = initialState(), action: Actions): State => {
  switch (action.type) {
    case "ACCOUNT_USER_LOGIN":
      return {
        ...state,
        login: true,
        userName: action.payload.userName
      };
    case "ACCOUNT_USER_LOGOUT":
      return {
        ...state,
        login: false,
        userName: "ゲストさん"
      };
    case "ACCOUNT_SET_SELF_MEDE_TEMPLATES":
      return {
        ...state,
        selfMadeTemplates: action.payload.selfMadeTemplates
      };
    default:
      return state;
  }
};
// ______________________________________________________
//
export const actionCreator = {
  ...actions,
  ...thunkActions
};
