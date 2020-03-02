import { Actions } from "../actions";
import * as actions from "./actions";
import * as thunkActions from "./thunkAction";
// ______________________________________________________
//
interface normal {
  value: string;
  type: "normal" | "newLine" | "area";
}
interface tag {
  value: number;
  type: "tag";
}
export type templateContents = {
  id: number;
} & (normal | tag);

export interface areasType {
  [id: string]: {
    questionId: number;
    branchId: number;
    contents: templateContents[];
  };
}
// ______________________________________________________
//
interface State {
  templateContents: templateContents[];
  areas: areasType;
  title: string;
  editString: string;
  memo: string;
  tags: string[];
  authorID: string | null;
  backAnswer: boolean;
}
// ______________________________________________________
//
export const initialState = (injects?: State): State => ({
  title: "",
  templateContents: [],
  areas: {},
  editString: "",
  memo: "",
  tags: [],
  authorID: null,
  backAnswer: false,
  ...injects
});
// ______________________________________________________
//
export const reducer = (state = initialState(), action: Actions): State => {
  switch (action.type) {
    case "TEMPLATE_INIT":
      return { ...state, ...initialState() };
    case "TEMPLATES_SET_EDIT_STRING":
      return { ...state, editString: action.payload.nextWord };
    case "TEMPLATES_SET_TEMPLATE_MEMO":
      return { ...state, memo: action.payload.nextMemo };
    case "TEMPLATES_SET_TEMPLATE_TITLE":
      return { ...state, title: action.payload.nextTitle };
    case "TEMPLATES_SET_CONTENTS":
      return { ...state, templateContents: action.payload.nextContents };
    case "TEMPLATES_SET_AREA":
      return { ...state, areas: action.payload.nextArea };
    case "TEMPLATES_SET_TAGS":
      return { ...state, tags: action.payload.next };
    case "TEMPLATE_SET_BACK_ANSWER":
      return { ...state, backAnswer: action.payload.next };
    default:
      return state;
  }
};
export const actionCreator = {
  ...actions,
  ...thunkActions
};
