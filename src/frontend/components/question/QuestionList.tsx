// ______________________________________________________
// 

import React from "react";
import * as Next from "next";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState, actionCreator } from "~/store";
import { QuestionItem, QuestionForm } from ".";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";

// ______________________________________________________
// 型定義

type Props = {
  className?: string;
};
const selector = (state: RootState) => state.questions.questions;
// ______________________________________________________
// コンポーネント

const Component: Next.NextComponentType<Next.NextPageContext, {}, Props> = (props: Props) => {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const addQuestion = () => {
    dispatch(actionCreator.questions.addQuestion())
  };
  const deleteQuestion = (questionId: number) => {
    dispatch(actionCreator.questions.deleteQuestion(questionId))
  };
  const setQuestionForm = (questionId: number) => {
    dispatch(actionCreator.questions.setQuestionForm(questionId))
  };
  const questions = useSelector(selector);
  return (
    <div className={props.className} >
      <div className={classes.root}>
        {questions.map(question => (
          <QuestionItem key={"question_" + question.id} question={question} deleteAction={deleteQuestion} onClickAction={setQuestionForm} />
        ))}
      </div>
      <QuestionForm />
      <div className="add_button">
        <Fab color="primary" aria-label="add" size="small" className="add_button_button" >
          <Add onClick={addQuestion} />
        </Fab>
      </div>
    </div>
  );
};

// ______________________________________________________
// スタイル

const StyledComponent = styled(Component)`
width: 100%;
& > .add_button{
  padding: .5rem;
  text-align: center;
}
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: "wrap",
      justifyContent: "space-around",
      width: "100%",
      '& > *': {
        margin: theme.spacing(1),
        width: "90%",
        overflow: "scroll",
        paddingRight: 15,
        paddingLeft: 15,
      },
    },
  }),
);


export default StyledComponent;