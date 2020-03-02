import { Actions } from "../actions";
import * as actions from "./actions";
interface State {
  width: number;
  breakPoint: number;
}

export const initialState = (injects?: State): State => ({
  width: 0,
  breakPoint: 770,
  ...injects
});

export const reducer = (state = initialState(), action: Actions): State => {
  switch (action.type) {
    case "WINDOW_SET_WINDOW_WIDTH":
      return { ...state, width: action.payload.nextWidth };
    default:
      return state;
  }
};
export const actionCreator = {
  ...actions
};
