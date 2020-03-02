import types from "./types";
import { loadingType } from ".";

// ______________________________________________________
//

export const startLoading = (loadingType: loadingType) => ({
  type: types.startLoading,
  payload: { loadingType }
});
// ______________________________________________________
//

export const stopLoading = (loadingType: loadingType) => ({
  type: types.endLoading,
  payload: { loadingType }
});
// ______________________________________________________
//

export const failLoading = (
  loadingType: loadingType,
  errMessage: string = "エラーです"
) => ({
  type: types.failLoading,
  payload: { loadingType, errMessage }
});
// ______________________________________________________
//
export const successLoading = (
  loadingType: loadingType,
  errMessage: string = ""
) => ({
  type: types.successLoading,
  payload: { loadingType, errMessage }
});
