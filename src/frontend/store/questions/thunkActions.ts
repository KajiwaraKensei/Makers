import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { question } from ".";
import * as questionsActionCreator from "./actions";

// ______________________________________________________
//
export const setQuestionForm = (
  questionId: number
): ThunkAction<void, RootState, undefined, any> => async (
  dispatch: Dispatch<Action>,
  getState: () => RootState
) => {
  const questions = getState().questions.questions;
  questions.forEach(question => {
    if (question.id === questionId) {
      dispatch(questionsActionCreator.setQuestionForm(question)); // フォームにセット
      dispatch(questionsActionCreator.setFormToggle(true)); //フォームの表示
      return;
    }
  });
};

// ______________________________________________________
//

export const addQuestion = (): ThunkAction<
  void,
  RootState,
  undefined,
  any
> => async (dispatch: Dispatch<Action>, getState: () => RootState) => {
  const questions = getState().questions.questions;
  const newQuestion = createQuestion(questions);
  dispatch(questionsActionCreator.setQuestionForm(newQuestion)); // フォームにセット
  dispatch(questionsActionCreator.setFormToggle(true)); //フォームの表示
};

// ______________________________________________________
//

export const submitQuestionForm = (): ThunkAction<
  void,
  RootState,
  undefined,
  any
> => async (dispatch: Dispatch<Action>, getState: () => RootState) => {
  const stateQuestions = getState().questions;
  const questions = stateQuestions.questions;
  const questionForm = stateQuestions.questionForm;
  const index = questions.findIndex(({ id }) => id === questionForm.id);
  let nextQuestions: question[] = [];
  console.log("ok");

  questions.forEach(question => {
    if (question.id === questionForm.id) {
      nextQuestions = [...nextQuestions, questionForm];
    } else nextQuestions = [...nextQuestions, question];
  });
  if (index === -1) {
    nextQuestions = [...nextQuestions, questionForm];
  }
  dispatch(questionsActionCreator.setQuestions(nextQuestions));
  dispatch(questionsActionCreator.setFormToggle(false)); //フォームの表示
};

// ______________________________________________________
//

const createQuestion = (questions: question[]) => {
  const length = questions.length;
  if (length) {
    const id = questions[length - 1].id + 1;
    const newQuestion: question = {
      id,
      asking: "",
      ex: "",
      label: `tag${id}`,
      childElements: [],
      type: "normal"
    };
    return newQuestion;
  }
  const newQuestion: question = {
    id: 0,
    asking: "",
    ex: "",
    label: `tag0`,
    childElements: [],
    type: "normal"
  };
  return newQuestion;
};
