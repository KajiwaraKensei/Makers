import types from "./types";
import { searchItem, comment } from ".";

// ______________________________________________________
//

export const setResult = (nextResult: searchItem[]) => ({
  type: types.setResult,
  payload: { nextResult }
});
export const setPage = (nextPage: number) => ({
  type: types.setPage,
  payload: { nextPage }
});
export const setPageLength = (nextLength: number) => ({
  type: types.setPageLength,
  payload: { nextLength }
});
export const changeSort = (nextSort: 0 | 1 | 2) => ({
  type: types.changeSort,
  payload: { nextSort }
});
export const changeOrder = (nextOrder: 1 | -1) => ({
  type: types.changeOrder,
  payload: { nextOrder }
});
export const changeSearchWord = (nextWord: string) => ({
  type: types.changeSearchWord,
  payload: { nextWord }
});
export const changeSelect = (nextSelect: number) => ({
  type: types.changeSelect,
  payload: { nextSelect }
});
export const setComments = (nextComments: comment[]) => ({
  type: types.setComments,
  payload: { nextComments }
});
export const setCommentLength = (nextCommentLength: number) => ({
  type: types.setCommentLength,
  payload: { nextCommentLength }
});
