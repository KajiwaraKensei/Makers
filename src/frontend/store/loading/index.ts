import { Actions } from "../actions";
import * as actions from "./actions";

// ______________________________________________________
//
export interface loading {
  state: boolean | null;
  err: boolean;
  errorMessage: string;
}
interface State {
  account: loading;
  template: loading;
  search: loading;
  comment: loading;
}

export type loadingType = keyof State;

// ______________________________________________________
//

export const initialState = (injects?: State): State => ({
  account: {
    state: null,
    err: false,
    errorMessage: ""
  },
  template: {
    state: null,
    err: false,
    errorMessage: ""
  },
  search: {
    state: null,
    err: false,
    errorMessage: ""
  },

  comment: {
    state: null,
    err: false,
    errorMessage: ""
  },
  ...injects
});

// ______________________________________________________
//
export const reducer = (state = initialState(), action: Actions): State => {
  switch (action.type) {
    case "LOADING_START_LOADING":
      return {
        ...state,
        ...returnLoading(state, action.payload.loadingType, {
          state: true
        })
      };
    case "LOADING_END_LOADING":
      return {
        ...state,
        ...returnLoading(state, action.payload.loadingType, {
          state: false
        })
      };
    case "LOADING_FAIL_LOADING":
      return {
        ...state,
        ...returnLoading(state, action.payload.loadingType, {
          err: true,
          errorMessage: action.payload.errMessage
        })
      };
    case "LOADING_SUCCESS_LOADING":
      return {
        ...state,
        ...returnLoading(state, action.payload.loadingType, {
          err: false,
          errorMessage: action.payload.errMessage
        })
      };
    default:
      return state;
  }
};
// ______________________________________________________
//
const returnLoading = (
  state: State,
  type: loadingType,
  value: Partial<loading>
) => {
  let _state: State = Object.assign({}, state);
  _state[type] = { ..._state[type], ...value };
  return _state;
};

export const actionCreator = {
  ...actions
};
