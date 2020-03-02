import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import * as accountActionCreator from "../account/actions";
import * as firebase from "../../Firebase1";
import * as loadingActionCreator from "../loading/actions";
import { loadingType } from "../loading";
import axios from "~/MyAxios";
import Router from "next/router";

// ______________________________________________________
//
const THIS_LOADING_TYPE: loadingType = "template"; // 通信の種類
// ______________________________________________________
//

export const doAdd = (): ThunkAction<void, RootState, undefined, any> => async (
  dispatch: Dispatch<Action>,
  getState: () => RootState
) => {
  let state = getState();

  // 通信中かどうか
  if (state.loading.template.state) return;

  // 通信開始
  dispatch(loadingActionCreator.startLoading(THIS_LOADING_TYPE));

  await firebase.checkLogin(async user => {
    if (user) {
      const { editString, memo, tags, title } = state.template;
      const { questions } = state.questions;

      // トークンの取得
      const idToken = await user.getIdToken(true);
      const sendData = {
        title,
        tags,
        memo,
        template: editString,
        questions,
        idToken
      };

      const res = await axios.post("/template/add", sendData);
      if (res.data.success) {
        console.log(res.data);
        // 作ったページに移動
        Router.push({
          pathname: `/template/${res.data.id}`
        });
        alert("保存しました");
      }
      console.log(res.data);
    } else {
      alert("ログインしてください");
      dispatch(accountActionCreator.userLogout());
    }
  });
  dispatch(loadingActionCreator.stopLoading(THIS_LOADING_TYPE));
};
// ______________________________________________________
//
export const doSave = (
  templateId: string
): ThunkAction<void, RootState, undefined, any> => async (
  dispatch: Dispatch<Action>,
  getState: () => RootState
) => {
  let state = getState();

  // 通信中かどうか
  if (state.loading.template.state) return;

  // 通信開始
  dispatch(loadingActionCreator.startLoading(THIS_LOADING_TYPE));

  await firebase.checkLogin(async user => {
    if (user) {
      const { editString, memo, tags, title } = state.template;
      const { questions } = state.questions;
      const idToken = await user.getIdToken(true);
      const sendData = {
        data: {
          title,
          tags,
          memo,
          template: editString,
          questions
        },
        idToken,
        id: templateId
      };

      await axios
        .post("/template/save", sendData)
        .then(res => {
          if (res.data.success) {
            alert("保存に成功しました");
          } else {
            alert("保存しました" + res.data.errMessage);
          }
        })
        .catch(err => {
          alert("保存に失敗しました " + err.data.errMessage);
        });
    } else {
      alert("ログインしてください");
      dispatch(accountActionCreator.userLogout());
    }
  });
  dispatch(loadingActionCreator.stopLoading(THIS_LOADING_TYPE));
};
// ______________________________________________________
//
