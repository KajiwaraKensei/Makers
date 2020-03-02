import types from "./types";
import { templateContents, areasType } from ".";
// ______________________________________________________
//

// setEditString
export const setEditString = (nextWord: string) => ({
  type: types.setEditString,
  payload: { nextWord }
});

export const templateInit = () => ({
  type: types.templateInit,
  payload: {}
});

export const setTemplateTitle = (nextTitle: string) => ({
  type: types.setTitle,
  payload: { nextTitle }
});
export const setTemplateMemo = (nextMemo: string) => ({
  type: types.setMemo,
  payload: { nextMemo }
});
export const setTemplateContents = (nextContents: templateContents[]) => ({
  type: types.setContents,
  payload: { nextContents }
});
export const setArea = (nextArea: areasType) => ({
  type: types.setArea,
  payload: { nextArea }
});
export const setTags = (next: string[]) => ({
  type: types.setTags,
  payload: { next }
});

export const setBackAnswer = (next: boolean) => ({
  type: types.setBackAnswer,
  payload: { next }
});
