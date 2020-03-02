import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../.";
import axios from "~/MyAxios";
import * as accountActionCreator from "./actions";
import { selfMadeTemplate } from ".";
import * as firebase from "../../Firebase1";
import * as loadingActionCreator from "../loading/actions";
import { useDispatch, useSelector } from "react-redux";
// ______________________________________________________
//
const THIS_LOADING_TYPE = "account";
const THIS_LOADING_TYPE1 = "search";

interface doLogin {
  email: string;
  password: string;
}

// ______________________________________________________
//

export const doLogin = (
  payload: doLogin
): ThunkAction<void, RootState, undefined, any> => async (
  dispatch: Dispatch<Action>,
  getState: () => RootState
) => {
  const loading = getState().loading.account;
  if (loading.state) return;
  dispatch(loadingActionCreator.startLoading(THIS_LOADING_TYPE));
  const { email, password } = payload;
  const result = await firebase.login(email, password);
  console.log(result);
  if (result.success) {
    dispatch(
      accountActionCreator.userLogin(
        result.userName ? result.userName : "名無しさん"
      )
    );
    dispatch(loadingActionCreator.successLoading(THIS_LOADING_TYPE));
  } else {
    alert("ログインに失敗しました\n" + result.errorMessage);
    dispatch(
      loadingActionCreator.failLoading(THIS_LOADING_TYPE, result.errorMessage)
    );
  }
  dispatch(loadingActionCreator.stopLoading(THIS_LOADING_TYPE));
};

// ______________________________________________________
//

export const doLogout = (): ThunkAction<
  void,
  RootState,
  undefined,
  any
> => async (dispatch: Dispatch<Action>, getState: () => RootState) => {
  const loading = getState().loading.account;
  if (loading.state) return;
  dispatch(loadingActionCreator.startLoading(THIS_LOADING_TYPE));

  const result = await firebase.logout();
  if (result) {
    dispatch(accountActionCreator.userLogout());
    dispatch(loadingActionCreator.successLoading(THIS_LOADING_TYPE));
  } else {
    dispatch(
      loadingActionCreator.failLoading(
        THIS_LOADING_TYPE,
        "ログアウトに失敗しました"
      )
    );
  }
  dispatch(loadingActionCreator.stopLoading(THIS_LOADING_TYPE));
};

// ______________________________________________________
//

interface doSignIn {
  userName: string;
  email: string;
  password: string;
}

export const doSignIn = (
  payload: doSignIn
): ThunkAction<void, RootState, undefined, any> => async (
  dispatch: Dispatch<Action>,
  getState: () => RootState
) => {
  const loading = getState().loading.account;
  if (loading.state) return;
  dispatch(loadingActionCreator.startLoading(THIS_LOADING_TYPE));
  const { userName, email, password } = payload;
  const result = await firebase.signIn(email, userName, password);
  if (result.success) {
    const idToken = await firebase.getIdToken();
    if (idToken === false) {
      return;
    }
    const result1 = await axios.post("/account/add", {
      idToken,
      name: result.userName
    });
    console.log(result1);

    dispatch(accountActionCreator.userLogin(result.userName));
    dispatch(loadingActionCreator.successLoading(THIS_LOADING_TYPE));
  } else {
    alert("アカウントの作成に失敗しました\n" + result.errorMessage);
    dispatch(
      loadingActionCreator.failLoading(THIS_LOADING_TYPE, result.errorMessage)
    );
  }
  dispatch(loadingActionCreator.stopLoading(THIS_LOADING_TYPE));
};

// ______________________________________________________
//

export const getUserInfo = (): ThunkAction<
  void,
  RootState,
  undefined,
  any
> => async (dispatch: Dispatch<Action>, getState: () => RootState) => {
  const state = getState();
  try {
    if (state.loading.search.state) return;

    // 通信開始
    dispatch(loadingActionCreator.startLoading(THIS_LOADING_TYPE1));
    await firebase.checkLogin(async user => {
      if (user) {
        const idToken = await user.getIdToken(true);

        const res = await axios.post("/account", { idToken });
        if (res.data.success) {
          console.log(res.data);
          dispatch(
            accountActionCreator.setSelfMadeTemplates(res.data.template)
          );
          dispatch(loadingActionCreator.successLoading(THIS_LOADING_TYPE1));
        } else {
          dispatch(loadingActionCreator.failLoading(THIS_LOADING_TYPE1));
        }
      }
    });
    dispatch(loadingActionCreator.stopLoading(THIS_LOADING_TYPE1));
  } catch {
    error => {
      console.log(error);
      dispatch(loadingActionCreator.failLoading(THIS_LOADING_TYPE1));
      dispatch(loadingActionCreator.stopLoading(THIS_LOADING_TYPE1));
    };
  }
};
