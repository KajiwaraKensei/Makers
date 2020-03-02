import { Actions } from "../actions";
import * as actions from "./actions";
import * as thunkActions from "./thunkActions";
// ______________________________________________________
//
export type questionType = "normal" | "branch";
export interface childQuestion {
  id: number;
  asking: string;
}
export type question = {
  type: questionType;
  id: number;
  asking: string;
  ex: string;
  label: string;
  childElements: childQuestion[];
};
interface State {
  questions: question[];
  questionForm: question;
  editFormToggle: boolean;
}

// ______________________________________________________
//

export const initialState = (injects?: State): State => ({
  questions: [],
  questionForm: {
    type: "normal",
    id: 0,
    asking: "",
    ex: "",
    label: "",
    childElements: []
  },
  editFormToggle: false,
  ...injects
});

// ______________________________________________________
//

export const reducer = (state = initialState(), action: Actions): State => {
  const _state: State = Object.assign({}, state);

  switch (action.type) {
    case "TEMPLATE_INIT":
      return { ...state, ...initialState() };
    case "QUESTIONS_SET_TOGGLE_FORM":
      _state.editFormToggle = action.payload.nextToggle;
      return _state;
    case "QUESTIONS_SET_QUESTIONS":
      return { ...state, questions: action.payload.nextQuestions };
    case "QUESTIONS_SET_QUESTION":
      _state.questions = changeQuestion(_state.questions, action.payload);
      return _state;
    case "QUESTIONS_SET_EDIT_QUESTION":
      _state.questionForm = action.payload.next;
      return _state;
    case "QUESTIONS_DELETE_QUESTION":
      _state.questions = deleteQuestion(state.questions, action.payload.id);
      return _state;
    case "QUESTIONS_CHANGE_QUESTION_FROM":
      _state.questionForm = changeQuestionForm(
        state.questionForm,
        action.payload.next
      );
      return _state;
    case "QUESTIONS_ADD_CHILD_ITEM":
      _state.questionForm = {
        ...state.questionForm,
        childElements: [
          ...state.questionForm.childElements,
          createChildQuestion(state.questionForm.childElements)
        ]
      };
      return _state;
    case "QUESTIONS_CHANGE_CHILD_ITEM":
      _state.questionForm = editChildQuestion(
        state.questionForm,
        action.payload
      );
      return _state;
    case "QUESTIONS_DELETE_CHILD_ITEM":
      _state.questionForm = deleteChildQuestion(
        state.questionForm,
        action.payload.id
      );
      return _state;

    default:
      return _state;
  }
};

// ______________________________________________________
//

// changeTemplates
// 引数の next.id と等しい questions.id を置換
export const changeQuestion = (
  questions: question[],
  next: { id: number; value: question }
) => {
  let nextQuestions: question[] = [];
  questions.forEach(question => {
    if (question.id === next.id) {
      nextQuestions = [...nextQuestions, next.value];
    } else {
      nextQuestions = [...nextQuestions, question];
    }
  });
  return nextQuestions;
};

// deleteQuestion
// questions の idと一致するのを削除
const deleteQuestion = (questions: question[], id: number) => {
  const nextQuestions: question[] = [];
  questions.forEach(i => i.id !== id && nextQuestions.push(i));
  return nextQuestions;
};

// ______________________________________________________
//

export type changeQuestionFormProps =
  | { value: questionType; type: "type" }
  | { value: string; type: "asking" | "label" | "ex" };

const changeQuestionForm = (
  editQuestion: question,
  next: changeQuestionFormProps
) => {
  const nextEditQuestions: question = Object.assign({}, editQuestion);
  if (next.type === "type") nextEditQuestions[next.type] = next.value;
  else nextEditQuestions[next.type] = next.value;
  return nextEditQuestions;
};

// ______________________________________________________
//

const deleteChildQuestion = (questionForm: question, id: number) => {
  const nextChildElement: childQuestion[] = [];
  questionForm.childElements.forEach(
    child => child.id !== id && nextChildElement.push(child)
  );
  return { ...questionForm, childElements: nextChildElement };
};

// ______________________________________________________
//

const editChildQuestion = (
  questionForm: question,
  next: { id: number; value: string }
) => {
  const nextChildElement: childQuestion[] = [];
  questionForm.childElements.forEach(child => {
    if (child.id === next.id) {
      nextChildElement.push({
        ...child,
        asking: next.value
      });
    } else nextChildElement.push(child);
  });
  return { ...questionForm, childElements: nextChildElement };
};

// ______________________________________________________
//

const createChildQuestion = (childQuestions: childQuestion[]) => {
  const length = childQuestions.length;
  if (length) {
    const id = childQuestions[length - 1].id + 1;
    const newQuestion: childQuestion = {
      id,
      asking: ""
    };
    return newQuestion;
  }
  const newQuestion: childQuestion = {
    id: 0,
    asking: ""
  };
  return newQuestion;
};

// ______________________________________________________
//

export const searchQuestionById = (
  question: question[],
  questionId: number
): question | null => {
  const index = question.findIndex(({ id }) => id === questionId);
  if (index === -1) return null;
  return question[index];
};

export const actionCreator = {
  ...actions,
  ...thunkActions
};
