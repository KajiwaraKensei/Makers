// ______________________________________________________
// 質問に回答するページ

import React from "react";
import * as Next from "next";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "~/store";
import { question } from "~/store/questions";
import { templateContents, areasType } from "~/store/template";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel, StepContent, Button } from '@material-ui/core';
import { Typography, Paper } from '@material-ui/core';
import AnswerInput from "./AnswerInput";
import AnswerResult from "./AnswerResult";
import Router from 'next/router';

import { AnswerQuickList } from ".";
// ______________________________________________________
// 型定義


type Props = {
  className?: string;
};

const selector = (state: RootState) => ({
  questions: state.questions.questions,
  areas: state.template.areas,
  templateContents: state.template.templateContents,
  windowWidth: state.window.width,
  breakPoint: state.window.breakPoint,
  loading: state.loading.template
});
// ______________________________________________________
//

export type answerType = { id: number, value: string | number };

// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props) => {
  const state = useSelector(selector);
  const { questions, templateContents, areas, } = state
  const classes = useStyles({});
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useDispatch();

  // 進む処理
  const handleNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };
  const handleFinish = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    setActiveStep(questions.length);
  };

  // 戻る処理
  const handleBack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  const backAction = () => {
    Router.back()
  }
  const [answers, setAnswer] = React.useState<answerType[]>(() => {
    const answer: answerType[] = [];
    questions.forEach((question, i) => {
      answer.push({
        id: question.id,
        value: question.type === "normal" ? "" : -1
      })
    })
    return answer;
  })

  const resultString = React.useMemo(() => contentsToString(templateContents, areas, questions, answers), [answers])

  const AnswerContent = questions.map((question, index) => (
    <Step completed={false} key={index} onClick={() => setActiveStep(index)}>
      <StepLabel>{question.label}</StepLabel>
      <StepContent>
        <Typography>{question.asking}</Typography>
        <AnswerInput
          index={index}
          answer={answers[index]}
          question={question}
          editAction={value => {
            const _answers = answers.concat();
            _answers[index].value = value
            setAnswer(_answers)
          }}
        />
        <div className={classes.actionsContainer}>
          <div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
            >
              Back
          </Button>

            {activeStep !== questions.length - 1 &&
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Next
            </Button>
            }
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleFinish}
              className={classes.button}
            >
              Finish
            </Button>
          </div>
        </div>
      </StepContent>
    </Step>
  ))

  return (
    <div className={props.className} >

      <div>
        <div className={classes.root}>
          <Paper elevation={3}>
            {questions.length > 0 &&
              <Stepper activeStep={activeStep} orientation="vertical">
                {AnswerContent}
              </Stepper>}
            {activeStep === questions.length && (
              <Paper square elevation={0} className={classes.resetContainer}>
                <AnswerResult result={resultString} />
              </Paper>
            )}
          </Paper>
        </div>
        <div className="answer_quick">
          <AnswerQuickList {...{ answers, questions, setAnswer }} />
        </div>
      </div>

    </div>
  )
}

// ______________________________________________________
// contentsToString 回答を元に文字の生成

export const contentsToString = (contents: templateContents[], areas: areasType, questions: question[], answers: answerType[]) => {
  let resultString: string = ""
  contents.forEach(content => {
    if (content.type === "normal") {
      resultString += content.value
    } else if (content.type === "tag") {

      let i = -1;
      while (++i < answers.length) {
        if (answers[i].id === content.value) {
          resultString += answers[i].value;
          break;
        }
      }
    } else if (content.type === "newLine") {
      resultString += "\n"
    } else if (content.type === "area") {
      let i = -1;
      const area = areas[content.value]
      while (++i < answers.length) {
        if (answers[i].id === area.questionId) {
          if (answers[i].value === area.branchId) {
            resultString += contentsToString(area.contents, areas, questions, answers)
          }
          break;
        }
      }
    }
  })
  return resultString
}

// ______________________________________________________
// スタイル

interface styledType {
  type: boolean;
}
const StyledComponent = styled(Component) <styledType>`
  & .MuiButton-outlinedSizeLarge{
    background-color: #fff;
  }
  height: 100%;
  & > div{
    transition: 0.5s;
    height: 100%;
    & > * {
      height: 100%;
      overflow: scroll;
    }
    ${props => props.type ? `
      display: flex;
      & .answer_quick{
        width: 50%;
      }    
    ` : `
    & .answer_quick{
      width: 100%;
    }    
  `}
  }
  padding: .5rem;
  width: 100%;
  & .answer_quick{
    padding: 1rem;
  }    

`
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: "1rem",
      transition: "0.5s"

    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  }),
);

export default StyledComponent