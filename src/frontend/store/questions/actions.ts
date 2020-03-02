import types from "./types";
import { question, changeQuestionFormProps } from ".";

// ______________________________________________________
//

// setFormToggle
export const setFormToggle = (nextToggle: boolean) => {
  return {
    type: types.setFormToggle,
    payload: { nextToggle }
  };
};

// ______________________________________________________
//

export const setQuestions = (nextQuestions: question[]) => {
  return {
    type: types.setQuestions,
    payload: { nextQuestions }
  };
};
// ______________________________________________________
//

export const setQuestion = (payload: { value: question; id: number }) => {
  return {
    type: types.setQuestion,
    payload
  };
};

// ______________________________________________________
//

export const deleteQuestion = (id: number) => {
  return {
    type: types.deleteQuestion,
    payload: { id }
  };
};

// ______________________________________________________
//

export const setQuestionForm = (next: question) => {
  return {
    type: types.setEditQuestion,
    payload: { next }
  };
};

// ______________________________________________________
//

export const changeQuestionForm = (next: changeQuestionFormProps) => ({
  type: types.changeQuestionForm,
  payload: { next }
});

// ______________________________________________________
//

export const deleteChildQuestion = (id: number) => ({
  type: types.deleteChildItem,
  payload: { id }
});

// ______________________________________________________
//

export const addChildQuestion = () => ({
  type: types.addChildItem
});

// ______________________________________________________
//

export const editChildItem = (id: number, value: string) => ({
  type: types.changeChildItem,
  payload: { id, value }
});
