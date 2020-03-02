import React from "react";
import * as Next from "next";
import styled from "styled-components";
import { answerType } from "./AnswerPage";
import { question, } from "~/store/questions";
import { Paper, Typography } from "@material-ui/core";
import { AnswerQuickItem } from ".";

// ______________________________________________________
//


type Props = {
  answers: answerType[];
  setAnswer: (answers: answerType[]) => void;
  questions: question[];
  className?: string;
}

// ______________________________________________________
//

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const { answers, questions, setAnswer } = props
  return (
    <div className={props.className} >
      <Paper elevation={3} style={{ position: "relative", padding: "1rem" }}>
        <table>
          <caption><Typography variant="h6">クイック編集</Typography></caption>
          <tbody>
            {questions.map((question, i) => (
              <AnswerQuickItem
                {...{
                  question, answer: answers[i],
                  changeAnswer: (answer) => {
                    const _answers = answers.concat();
                    _answers[answer.id].value = answer.value
                    setAnswer(_answers)
                  }
                }} />
            ))}
          </tbody>
        </table>
      </Paper>
    </div>
  )
}

// ______________________________________________________
//

const StyledComponent = styled(Component)`
  width: 100%;
  & > *  > table{
    border-collapse: collapse;
    width: 100%;
    margin: 0 auto;
    max-width: 400px;
    & > caption{
      letter-spacing: 1.5px;
      padding: 15px;
      font-weight: bold;
      border-radius: 30px;
      max-width: 370px;
    }
  }
`

export default StyledComponent;