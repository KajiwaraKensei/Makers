import types from "./types";

export const setWindowWidth = (nextWidth: number) => ({
  type: types.setWindowWidth,
  payload: { nextWidth }
});
