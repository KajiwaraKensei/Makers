import { Actions } from "../actions";
import { question } from "../questions";
import * as actions from "./actions";
import * as thunkActions from "./thunkAction";

// ______________________________________________________
//
export interface searchItem {
  title: string;
  fav: number;
  tags: string[];
  author: { name: string; id: string };
  date: string;
  comments: number;
  executionCount: number;
  memo: string;
  id: string;
  questions: question[];
  template: string;
}

export interface comment {
  id: string;
  contributor: {
    name: string;
    id: string;
  };
  value: string;
  date: string;
  replay: comment[];
}
// ______________________________________________________
//
interface State {
  result: searchItem[]; // 検索結果
  resultLength: number; // 総数
  page: number; //
  sort: 0 | 1 | 2; // ソートのタイプ 0: 日付, 1: いいね数, 2: 実行数
  order: 1 | -1; // 降順 | 昇順
  searchWord: string; // 検索ワード
  select: number; // 検索結果の選択を表す
  comments: comment[]; // コメント
  commentLength: number; // 総コメント数
}
// ______________________________________________________
//
export const initialState = (injects?: State): State => ({
  sort: 0,
  order: -1,
  searchWord: "",
  select: 0,
  page: 1,
  result: [],
  resultLength: 0,
  comments: [],
  commentLength: 0
});
// ______________________________________________________
//
export const reducer = (state = initialState(), action: Actions): State => {
  const _state: State = Object.assign({}, state);

  switch (action.type) {
    case "SEARCH_SET_PAGE":
      return { ...state, page: action.payload.nextPage };
    case "SEARCH_SET_PAGE_LENGTH":
      return { ...state, resultLength: action.payload.nextLength };
    case "SEARCH_CHANGE_ORDER":
      return {
        ...state,
        order: action.payload.nextOrder
      };
    case "SEARCH_CHANGE_SEARCH_WORD":
      return {
        ...state,
        searchWord: action.payload.nextWord
      };
    case "SEARCH_CHANGE_SELECT":
      return {
        ...state,
        select: action.payload.nextSelect
      };
    case "SEARCH_CHANGE_SORT":
      return {
        ...state,
        sort: action.payload.nextSort
      };
    case "SEARCH_SET_COMMENTS":
      return {
        ...state,
        comments: action.payload.nextComments
      };
    case "SEARCH_SET_COMMENT_LENGTH":
      return {
        ...state,
        commentLength: action.payload.nextCommentLength
      };
    case "SEARCH_SET_RESULT":
      return {
        ...state,
        result: action.payload.nextResult
      };
    default:
      return _state;
  }
};
export const actionCreator = {
  ...actions,
  ...thunkActions
};
