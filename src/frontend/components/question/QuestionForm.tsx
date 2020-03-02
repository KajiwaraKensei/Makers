// ______________________________________________________
// 質問の編集

import React from "react";
import * as Next from "next";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState, actionCreator } from "~/store";
import { setFormToggle } from "~/store/questions/actions";
import { question, questionType } from "~/store/questions";
import { QuestionFormChildList } from ".";
import { ButtonGroup, Button, TextField } from '@material-ui/core';
import Dialog from "~/components/Dialog";

// ______________________________________________________
// 型定義

type doChangeType = "asking" | "ex" | "label";

type StateProps = {
  toggle: boolean;
  questionForm: question;
}
type Props = {};

const selector = (state: RootState): StateProps => ({
  toggle: state.questions.editFormToggle,
  questionForm: state.questions.questionForm
});

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props) => {
  const dispatch = useDispatch();
  const state = useSelector(selector);
  const { toggle, questionForm } = state;
  React.useEffect(() => {
    if (toggle) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [toggle]);

  const handleClose = () => {
    dispatch(setFormToggle(false))
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);

  const doChange = (value: string, type: doChangeType) => {
    dispatch(actionCreator.questions.changeQuestionForm({ value, type }))
  };
  const doSubmit = () => {
    dispatch(actionCreator.questions.submitQuestionForm())
  };

  return (
    <Dialog
      toggle={toggle}
      closeForm={handleClose}
      submitAction={doSubmit}
      title="質問編集"
    >
      <StyledComponent choosing={questionForm.type} >
        <div className="question_input">
          <ul>
            <li>
              <FormInput
                {...formInputProps(
                  "質問内容",
                  questionForm.asking,
                  st => { doChange(st, "asking") }
                )}
              />
            </li>
            <li>
              <FormInput {...formInputProps(
                "タグ名",
                questionForm.label,
                st => { doChange(st, "label") },
                false
              )}
              />
            </li>
            <li>
              <FormInput {...formInputProps(
                "補足説明",
                questionForm.ex,
                st => { doChange(st, "ex") }
              )}
              />
            </li>
            <li>
              <div className="question_type_change_button">
                <ButtonGroup fullWidth aria-label="full width outlined button group">
                  <Button
                    className="input-type"
                    onClick={() => {
                      dispatch(actionCreator.questions.changeQuestionForm({ type: "type", value: "normal" }))
                    }}
                  >
                    入力
                  </Button>
                  <Button
                    className="branch-type"
                    onClick={() => {
                      dispatch(actionCreator.questions.changeQuestionForm({ type: "type", value: "branch" }))
                    }}
                  >
                    選択
                  </Button>
                </ButtonGroup>
              </div>
            </li>
            <li>
              {questionForm.type === "branch" &&
                <QuestionFormChildList childQuestion={questionForm.childElements} />}
            </li>
          </ul>
        </div>
      </StyledComponent>
    </Dialog>
  )
}

// ______________________________________________________
// スタイル

interface StyledComponent {
  choosing?: questionType
}
const StyledComponent = styled.div<StyledComponent>`
  .input-type {
    ${props =>
    props.choosing === "normal" && `background-color: #333;color: #fff;`}
  }
  .branch-type {
    ${props =>
    props.choosing === "branch" && `background-color: #333;color: #fff;`}
  }
  .question_input{
    transition: all 0.6s;
    width: 100%;
    max-width: 40rem;
    transition: all 0.6s;
    background-color: white;
    position: relative;
    overflow: hidden;
    & > ul {
      list-style: none;
      padding: 0;
      & > li {
        padding: 0rem 0.3rem 1.2rem;
        &:last-child{
          padding-bottom:0;
        }
      }
    }
  }
`

// ______________________________________________________
// フォームに表示するInput

export const formInputProps = (label: string, value: string, doChange: (st: string) => void, multiline: boolean = true) => ({
  label, value, doChange, multiline
})

interface InputProps {
  label: string;
  value: string;
  doChange: (st: string) => void;
  multiline?: boolean
}
export const FormInput = (props: InputProps) => {
  const { label, value, doChange, multiline } = props
  return (
    <StyledInput>
      <div>
        <TextField
          style={{ width: "100%" }}
          label={label}
          value={value}
          onChange={e => doChange(e.target.value)}
          variant="outlined"
          multiline={multiline}
          rowsMax={4}
        />
      </div>
    </StyledInput>
  )
}
const StyledInput = styled.div`
  font-size: 0.9rem;
`;


export default Component;