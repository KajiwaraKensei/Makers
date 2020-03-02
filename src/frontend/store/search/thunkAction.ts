import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import * as searchActionCreator from "./actions";
import { checkLogin } from "../../Firebase1";
import * as loadingActionCreator from "../loading/actions";
import * as accountActionCreator from "../account/actions";
import { loadingType } from "../loading";
import axios from "~/MyAxios";
import qs from "qs";

// ______________________________________________________
//

const THIS_LOADING_TYPE: loadingType = "search"; // 通信の種類
const THIS_LOADING_TYPE2: loadingType = "comment"; // 通信の種類
const PAGE_RANGE = 5;

// ______________________________________________________
//

export const addDoSearch = (): ThunkAction<
  void,
  RootState,
  undefined,
  any
> => async (dispatch: Dispatch<Action>, getState: () => RootState) => {
  const state = getState();

  if (state.loading.search.state) {
    return;
  }

  const { page, resultLength } = state.search;
  if (page * PAGE_RANGE >= resultLength) {
    return;
  }

  const { order, sort, searchWord } = state.search;
  await axios
    .get(`/template?${getUrl(order, sort, searchWord, page + 1)}`)
    .then(result => {
      if (result.data.success) {
        const _result = state.search.result;
        dispatch(searchActionCreator.setPageLength(result.data.hit));
        dispatch(searchActionCreator.setPage(result.data.page));
        dispatch(
          searchActionCreator.setResult([..._result, ...result.data.result])
        );
        dispatch(loadingActionCreator.successLoading(THIS_LOADING_TYPE));
      } else {
        dispatch(
          loadingActionCreator.failLoading(
            THIS_LOADING_TYPE,
            "取得に失敗しました"
          )
        );
      }
    })
    .catch(error => {
      dispatch(
        loadingActionCreator.failLoading(
          THIS_LOADING_TYPE,
          "取得に失敗しました"
        )
      );
    });

  dispatch(loadingActionCreator.stopLoading(THIS_LOADING_TYPE));
};

// ______________________________________________________
//

export const doSearch = (): ThunkAction<
  void,
  RootState,
  undefined,
  any
> => async (dispatch: Dispatch<Action>, getState: () => RootState) => {
  let state = getState();

  // 通信中かどうか
  if (state.loading.search.state) return;

  // 通信開始
  dispatch(loadingActionCreator.startLoading(THIS_LOADING_TYPE));
  const { order, sort, searchWord } = state.search;
  await axios
    .get(`/template?${getUrl(order, sort, searchWord, 0)}`)
    .then(result => {
      if (result.data.success) {
        dispatch(searchActionCreator.setPageLength(result.data.hit));
        dispatch(searchActionCreator.setPage(result.data.page));
        dispatch(searchActionCreator.changeSelect(-1));
        dispatch(searchActionCreator.setResult(result.data.result));
        dispatch(loadingActionCreator.successLoading(THIS_LOADING_TYPE));
      } else {
        dispatch(
          loadingActionCreator.failLoading(
            THIS_LOADING_TYPE,
            "取得に失敗しました"
          )
        );
      }
    })
    .catch(error => {
      dispatch(
        loadingActionCreator.failLoading(
          THIS_LOADING_TYPE,
          "取得に失敗しました"
        )
      );
    });

  dispatch(loadingActionCreator.stopLoading(THIS_LOADING_TYPE));
};

// ______________________________________________________
//

export const sendComment = (
  value: string
): ThunkAction<void, RootState, undefined, any> => async (
  dispatch: Dispatch<Action>,
  getState: () => RootState
) => {
  const state = getState();
  if (!state.account.login) {
    alert("ログインしてください");
    return;
  }
  // 通信中かどうか
  if (state.loading.comment.state) return;

  // 通信開始
  const selectId = state.search.select;
  const templateId = state.search.result[selectId].id;
  dispatch(loadingActionCreator.startLoading(THIS_LOADING_TYPE2));

  await checkLogin(async user => {
    if (user) {
      const idToken = await user.getIdToken(true);
      await axios
        .post("/comment/add", {
          template_id: templateId,
          value,
          idToken
        })
        .then(result => {
          console.log(result.data);
          if (result.data.success) {
            dispatch(loadingActionCreator.successLoading(THIS_LOADING_TYPE2));
            dispatch(
              searchActionCreator.setCommentLength(
                state.search.commentLength + 1
              )
            );
            dispatch(
              searchActionCreator.setComments([
                result.data.comment,
                ...state.search.comments
              ])
            );
          } else {
            dispatch(
              loadingActionCreator.failLoading(
                THIS_LOADING_TYPE2,
                "送信に失敗しました"
              )
            );
          }
        })
        .catch(error => {
          console.log("error", error);

          dispatch(
            loadingActionCreator.failLoading(
              THIS_LOADING_TYPE2,
              "送信に失敗しました"
            )
          );
        });
    } else {
      alert("ログインしてください");
      dispatch(accountActionCreator.userLogout());
    }
  });
  dispatch(loadingActionCreator.stopLoading(THIS_LOADING_TYPE2));
};

// ______________________________________________________
//
export const getComments = (
  select: number
): ThunkAction<void, RootState, undefined, any> => async (
  dispatch: Dispatch<Action>,
  getState: () => RootState
) => {
  const state = getState();
  // 通信中かどうか
  if (state.loading.comment.state) return;

  // 通信開始
  const templateId = state.search.result[select].id;
  dispatch(loadingActionCreator.startLoading(THIS_LOADING_TYPE2));
  await axios
    .get("/comment/?" + getCommentURL(templateId))
    .then(result => {
      if (result.data.success) {
        dispatch(searchActionCreator.setComments(result.data.result));
        dispatch(
          searchActionCreator.setCommentLength(result.data.commentCount)
        );
        dispatch(loadingActionCreator.successLoading(THIS_LOADING_TYPE2));
      } else {
        dispatch(
          loadingActionCreator.failLoading(
            THIS_LOADING_TYPE2,
            result.data.errorMessage
          )
        );
      }
    })
    .catch(error => {
      dispatch(
        loadingActionCreator.failLoading(
          THIS_LOADING_TYPE2,
          "取得に失敗しました"
        )
      );
    });

  dispatch(loadingActionCreator.stopLoading(THIS_LOADING_TYPE2));
};

// ______________________________________________________
//

const getUrl = (
  order: number,
  sort: number,
  searchWord: string,
  page: number
): string => {
  let separatorString = /\s+/;
  let arrayString = searchWord.split(separatorString);
  let tagsArray = [];
  let keywordArray = [];
  arrayString.forEach(value => {
    if (value.charAt(0) === "#") {
      tagsArray = [...tagsArray, value.slice(1)];
    } else {
      keywordArray = [...keywordArray, value];
    }
  });
  const tags = tagsArray.join("||");
  const keyword = keywordArray.join("||");

  const queryString = { order, sort };
  if (tags.length > 0) {
    queryString["tags"] = tags;
  }
  if (keyword.length > 0) {
    queryString["keywords"] = keyword;
  }
  queryString["range"] = PAGE_RANGE;
  queryString["page"] = page;
  return qs.stringify(queryString);
};

const getCommentURL = (templateID: string) => {
  return qs.stringify({ template_id: templateID });
};
