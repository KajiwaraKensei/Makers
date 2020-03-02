// ______________________________________________________
// 質問の表示

import React from "react";
import * as Next from "next";
import styled from "styled-components";
import { answerType } from "./AnswerPage";
import { question } from "~/store/questions";
import { TextField } from "@material-ui/core";

// ______________________________________________________
// 型定義


type Props = {
  className?: string;
  index: number;
  answer: answerType;
  editAction: (value: string | number) => void;
  question: question;
}

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const { question, answer, editAction } = props;

  const displayChoice = question.childElements.map((item, i) => (
    <AnswerSelectButton
      className="answer-content-select"
      key={"dr_" + i}
      emphasis={i === answer.value}
      onClick={() => editAction(i !== answer.value ? i : -1)}
    >
      {item.asking}
    </AnswerSelectButton>
  ))

  return (
    <div className={props.className} >
      {question &&
        <AnswerContent>
          {question.type === "normal" ?
            <TextField value={answer.value} onChange={e => editAction(e.target.value)} style={{ width: " 100%" }} multiline rowsMax={4} />
            : question.type === "branch" && <>{displayChoice}</>
          }
          <p className="answer-content-ex">回答例・補足説明 : {question.ex}</p>
        </AnswerContent>
      }
    </div>
  )
}

// ______________________________________________________
// スタイル

const StyledComponent = styled(Component)`
`
export const AnswerContent = styled.div`
  text-align: center;
  height: 100%;
  & > h2 {
    text-align: center;
    color: #444;
  }
  & > input[type="text"] {
    border: none;
    width: 90%;
    max-width: 40rem;
    padding: 1rem;
    border-bottom: 1px solid #aaa;
    font-size: 1rem;
    &:focus {
      outline: none;
    }
  }
  & .answer-content-ex {
    color: #888;
  }
`;
type answerButtonProps = {
  emphasis?: boolean;
};
export const AnswerSelectButton = styled.div`
  border: 1px solid #555;
  width: 90%;
  max-width: 40rem;
  margin: 2rem auto;
  padding: 1rem;
  transition: 0.5s;
  border-radius: 0.6rem;
  color: #222;
  ${(props: answerButtonProps) =>
    props.emphasis &&
    `
    border: 2px outset #0b2f8c;
    color: #ff4728;
    background-color: #f0f3f9;
  `}
  &:hover {
    cursor: pointer;
    color: #fff;
    background-color: #124;
  }
`;

AnswerSelectButton.defaultProps = {
  emphasis: true
};

export default StyledComponent;